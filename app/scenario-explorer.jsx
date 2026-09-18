"use client";

// Real, styled port of /components/ScenarioExplorer.jsx (reference
// implementation). Logic ported faithfully; see that file's header
// comment for the guardrails this component must keep:
//   1. "Modeled water demand" language only, never "water use."
//   2. Selecting a facility loads the NEAREST STANDARDIZED TIER, and
//      says so explicitly -- never implies the facility's real capacity
//      or real water use.
//   3. The water-system dropdown only auto-selects for facilities with
//      an evidenced provider relationship (currently just Shalersville).
//      Every other facility explicitly states the system picker is
//      exploratory, not a match.
//   4. Missing data (null capacity, null avg-use, null treatment
//      capacity) renders as "Not applicable" / "Not publicly
//      disclosed" -- never as 0 or a blank that could read as 0.

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import mapped from "../data/mapped_facilities.json";
import styles from "./scenario-explorer.module.css";

// Leaflet needs direct browser/DOM access, so the map is loaded client-only.
const FacilityMap = dynamic(() => import("./facility-map"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading map…</div>,
});

// Keep in sync with /data/water_systems_master.csv
const WATER_SYSTEMS = {
  CLE: { name: "Cleveland Water", avgUseMgd: 236, treatmentCapMgd: 540 },
  AKR: { name: "Akron Water", avgUseMgd: 30.44, treatmentCapMgd: 67 },
  MVSD: { name: "MVSD", avgUseMgd: 25.22, treatmentCapMgd: 60 },
  ERIE: { name: "Erie County, Perkins", avgUseMgd: null, treatmentCapMgd: null },
  LAKE: { name: "Lake County, Bacon Road", avgUseMgd: 3, treatmentCapMgd: 9 },
  PORT_SHALERSVILLE: { name: "Portage County, Shalersville", avgUseMgd: null, treatmentCapMgd: 4 },
  CAN: { name: "Canton Water", avgUseMgd: 17.59, treatmentCapMgd: 44 },
};

const CAPACITY_TIERS = [50, 150, 300, 750];
const INTENSITY_TIERS = [
  { value: 0.05, label: "Very low (0.05 L/kWh)" },
  { value: 0.2, label: "Low (0.20 L/kWh)" },
  { value: 0.4, label: "Moderate (0.40 L/kWh)" },
  { value: 1.5, label: "Water-intensive (1.50 L/kWh)" },
];

function modeledMgd(mw, lPerKwh) {
  return mw * lPerKwh * 0.00634013;
}

export default function ScenarioExplorer() {
  const [capacityMw, setCapacityMw] = useState(750);
  const [intensity, setIntensity] = useState(0.4);
  const [systemId, setSystemId] = useState("PORT_SHALERSVILLE");
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);

  const facility = mapped.facilities.find((f) => f.id === selectedFacilityId) ?? null;
  const system = WATER_SYSTEMS[systemId];

  const results = useMemo(() => {
    const mgd = modeledMgd(capacityMw, intensity);
    return {
      mgd,
      annualMg: mgd * 365,
      pctOfUse: system.avgUseMgd ? (mgd / system.avgUseMgd) * 100 : null,
      pctOfCap: system.treatmentCapMgd ? (mgd / system.treatmentCapMgd) * 100 : null,
    };
  }, [capacityMw, intensity, systemId]); // eslint-disable-line react-hooks/exhaustive-deps

  function selectFacility(f) {
    setSelectedFacilityId(f.id);
    if (f.nearest_standardized_tier_mw) {
      setCapacityMw(f.nearest_standardized_tier_mw);
    }
    if (f.water_provider_status === "reported_site_provider" && f.water_system_id) {
      setSystemId(f.water_system_id);
    }
    // Deliberately do NOT auto-select a system otherwise -- see guardrail 3 above.
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.mapPane}>
        {/* The map is a pointer/touch-oriented visual: pan, zoom, hover, and
            tap all select a facility exactly like the button list below,
            which is the fully equivalent, keyboard- and screen-reader-
            accessible way to do the same thing. Hidden from assistive tech
            so it doesn't present as a second, less-navigable version of the
            same control. */}
        <div aria-hidden="true">
          <FacilityMap
            facilities={mapped.facilities}
            selectedFacilityId={selectedFacilityId}
            onSelectFacility={selectFacility}
          />
        </div>

        <div className={styles.facilityList} role="list" aria-label="Select a facility (same markers shown on the map above)">
          {mapped.facilities.map((f) => (
            <button
              key={f.id}
              type="button"
              role="listitem"
              className={
                f.id === selectedFacilityId ? styles.facilityButtonActive : styles.facilityButton
              }
              onClick={() => selectFacility(f)}
            >
              {f.name}
            </button>
          ))}
        </div>

        <p className={styles.mapCaption}>
          Showing the 8 of 21 facilities with a documented street address.
          Select a facility above to locate it on the map; pan or zoom to
          explore nearby sites. Use the controls on the right to explore
          standardized water-demand scenarios across different
          water-system contexts.
        </p>
      </div>

      <div className={styles.controlPane}>
        {facility && (
          <div role="status" className={styles.facilityStatus}>
            <strong>{facility.name}</strong> — {facility.status}.{" "}
            {facility.capacity_mw ? (
              <>
                Disclosed capacity {facility.capacity_mw} MW — nearest
                standardized tier used: {facility.nearest_standardized_tier_mw} MW
                (not this facility&rsquo;s real capacity or water use).
                {facility.disclosed_full_buildout_mw && (
                  <>
                    {" "}
                    A disclosed full buildout of up to{" "}
                    {facility.disclosed_full_buildout_mw} MW is independently
                    available as its own scenario tier.
                  </>
                )}
              </>
            ) : (
              "Capacity not publicly disclosed — capacity selector left as-is."
            )}{" "}
            {facility.water_provider_status === "reported_site_provider"
              ? "Water provider is evidenced for this facility — system selector updated to match."
              : "Water provider not publicly established for this facility — system selector below is exploratory only, not a match."}
          </div>
        )}

        <div className={styles.controls}>
          <label className={styles.controlLabel}>
            Standardized IT capacity
            <select
              value={capacityMw}
              onChange={(e) => setCapacityMw(Number(e.target.value))}
              className={styles.select}
            >
              {CAPACITY_TIERS.map((mw) => (
                <option key={mw} value={mw}>
                  {mw} MW
                </option>
              ))}
            </select>
          </label>

          <label className={styles.controlLabel}>
            Water-intensity scenario
            <select
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className={styles.select}
            >
              {INTENSITY_TIERS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.controlLabel}>
            Water-system case
            <select
              value={systemId}
              onChange={(e) => setSystemId(e.target.value)}
              className={styles.select}
            >
              {Object.entries(WATER_SYSTEMS).map(([id, s]) => (
                <option key={id} value={id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.results}>
          <div className={styles.resultRow}>
            <span>Modeled water demand</span>
            <strong>{results.mgd.toFixed(2)} MGD</strong>
          </div>
          <div className={styles.resultRow}>
            <span>Modeled annual demand</span>
            <strong>{results.annualMg.toFixed(0)} MG/yr</strong>
          </div>
          <div className={styles.resultRow}>
            <span>Vs. documented daily use</span>
            <strong>
              {results.pctOfUse !== null ? `${results.pctOfUse.toFixed(2)}%` : "Not applicable"}
            </strong>
          </div>
          <div className={styles.resultRow}>
            <span>Vs. documented treatment capacity</span>
            <strong>
              {results.pctOfCap !== null ? `${results.pctOfCap.toFixed(2)}%` : "Not applicable"}
            </strong>
          </div>
        </div>

        <p className={styles.disclaimer}>
          Modeled water demand is a hypothetical standardized scenario, never
          an estimate of a specific facility&rsquo;s actual water use.
        </p>
      </div>
    </div>
  );
}
