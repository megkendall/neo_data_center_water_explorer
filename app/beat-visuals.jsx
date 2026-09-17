import styles from "./beat-visuals.module.css";

// Source: /data/water_systems_master.csv (water_system, source_type columns)
// All 7 rows. source_type is the raw coded value, mechanically reformatted
// (underscores -> spaces, title case) for display — not reworded per-row.
const WATER_SYSTEMS = [
  { id: "CLE_WATER", name: "Cleveland Division of Water / Cleveland Water", sourceType: "great_lake" },
  { id: "AKR_WATER", name: "City of Akron Water Supply", sourceType: "river_reservoir" },
  { id: "MVSD", name: "Mahoning Valley Sanitary District (MVSD)", sourceType: "reservoir" },
  { id: "ERIE_PERKINS", name: "Erie County Water Division — Perkins District (OH2200603)", sourceType: "purchased_great_lake" },
  { id: "LAKE_BACON", name: "Lake County Department of Utilities — East Sub-District / Bacon Road WTP", sourceType: "great_lake" },
  { id: "PORT_SHALERSVILLE", name: "Portage County Water Resources — Shalersville system", sourceType: "groundwater" },
  { id: "CANTON_WATER", name: "City of Canton Water Department", sourceType: "groundwater" },
];

function formatSourceType(raw) {
  return raw
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function WaterSystemsVisual() {
  return (
    <div className={styles.inner}>
      <h3 className={styles.title}>Seven Northeast Ohio water systems</h3>
      <ul className={styles.systemList} aria-label="Seven Northeast Ohio water systems">
        {WATER_SYSTEMS.map((s) => (
          <li key={s.id} className={styles.systemRow}>
            <span className={styles.systemName}>{s.name}</span>
            <span className={styles.systemType}>{formatSourceType(s.sourceType)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Source: /data/facilities_master_v1_FINAL.csv, rows where
// inventory_role === "analytical_case" (7 of the 21 facilities).
// avgAnnualAvailability is the raw avg_annual_water_availability value.
const ANALYTICAL_FACILITIES = [
  { id: "FAC001", name: "H5 Cleveland", avgAnnualAvailability: "not publicly found" },
  { id: "FAC004", name: "Aligned NEO-01", avgAnnualAvailability: "not publicly found" },
  { id: "FAC005", name: "Perry Technology Park / Champion Farm", avgAnnualAvailability: "not publicly found" },
  { id: "FAC006", name: "Bitdeer Shalersville", avgAnnualAvailability: "reported_scope_limited" },
  { id: "FAC009", name: "Viking Data Centers Akron", avgAnnualAvailability: "not publicly found" },
  { id: "FAC020", name: "Bitdeer Weathersfield / Niles", avgAnnualAvailability: "not publicly found" },
  { id: "FAC021", name: "Bitdeer Massillon", avgAnnualAvailability: "not publicly found" },
];

export function FacilitiesVisual() {
  return (
    <div className={styles.inner}>
      <h3 className={styles.title}>
        Seven analytical facilities — average/annual water use
      </h3>
      <table className={styles.table} aria-label="Seven analytical facilities — average/annual water use">
        <thead>
          <tr>
            <th scope="col" className={styles.tableName}>
              Facility
            </th>
            <th scope="col" className={styles.tableStatus}>
              Average/annual water use
            </th>
          </tr>
        </thead>
        <tbody>
          {ANALYTICAL_FACILITIES.map((f) => (
            <tr key={f.id}>
              <td className={styles.tableName}>{f.name}</td>
              <td className={styles.tableStatus}>
                {f.avgAnnualAvailability === "not publicly found" ? (
                  "Not publicly found"
                ) : (
                  <>
                    Reported — partial only
                    <sup>†</sup>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.footnote}>
        † Bitdeer Shalersville: 350 gpd reported, but explicitly limited to
        its first group of buildings — not a complete facility figure.
      </p>
    </div>
  );
}

// Source: /content/story-spine.md, "Because of that" (benchmarks) beat.
const TIERS = [0.05, 0.2, 0.4, 1.5]; // L/kWh — standardized scenario tiers
const AWS_WUE = 0.06; // L/kWh — AWS, Ohio region, 2025
const EQUINIX_WUE_RANGE = [1.55, 1.63]; // L/kWh — Equinix, evaporative-cooled sites

const CHART_MAX = 1.7;
const PLOT_X = 130;
const PLOT_WIDTH = 240;
const scaleX = (v) => PLOT_X + (v / CHART_MAX) * PLOT_WIDTH;

export function BenchmarkVisual() {
  const rowHeight = 46;
  const chartTop = 16;
  const chartHeight = TIERS.length * rowHeight;

  return (
    <div className={styles.inner}>
      <h3 className={styles.title}>Standardized water-intensity tiers</h3>
      <svg
        viewBox={`0 0 400 ${chartTop + chartHeight + 40}`}
        className={styles.chart}
        role="img"
        aria-label="Bar chart of four standardized water-intensity tiers (0.05, 0.20, 0.40, and 1.50 liters per kilowatt-hour), with AWS's reported 0.06 L/kWh and Equinix's reported 1.55-1.63 L/kWh marked as external reference points."
      >
        {/* Equinix reference band */}
        <rect
          x={scaleX(EQUINIX_WUE_RANGE[0])}
          y={chartTop - 6}
          width={scaleX(EQUINIX_WUE_RANGE[1]) - scaleX(EQUINIX_WUE_RANGE[0])}
          height={chartHeight + 12}
          className={styles.equinixBand}
        />

        {/* AWS reference line */}
        <line
          x1={scaleX(AWS_WUE)}
          x2={scaleX(AWS_WUE)}
          y1={chartTop - 6}
          y2={chartTop + chartHeight + 6}
          className={styles.awsLine}
        />

        {/* tier bars */}
        {TIERS.map((v, i) => {
          const y = chartTop + i * rowHeight;
          const barH = 22;
          return (
            <g key={v}>
              <text x={PLOT_X - 12} y={y + barH / 2 + 4} textAnchor="end" className={styles.tierLabel}>
                {v.toFixed(2)}
              </text>
              <rect
                x={PLOT_X}
                y={y}
                width={scaleX(v) - PLOT_X}
                height={barH}
                className={styles.tierBar}
              />
            </g>
          );
        })}

        {/* legend row below the bars */}
        <g transform={`translate(0, ${chartTop + chartHeight + 20})`}>
          <line x1={PLOT_X} x2={PLOT_X + 14} y1={0} y2={0} className={styles.awsLine} />
          <text x={PLOT_X + 20} y={4} className={styles.legendLabel}>
            AWS reported, Ohio 2025: 0.06 L/kWh
          </text>
        </g>
        <g transform={`translate(0, ${chartTop + chartHeight + 36})`}>
          <rect x={PLOT_X} y={-8} width={14} height={10} className={styles.equinixBand} />
          <text x={PLOT_X + 20} y={0} className={styles.legendLabel}>
            Equinix reported, evaporative-cooled: 1.55–1.63 L/kWh
          </text>
        </g>
      </svg>
      <p className={styles.footnote}>
        Bars are the standardized scenario model&rsquo;s own tiers (L/kWh),
        not estimates of any specific facility. AWS and Equinix figures are
        external, independently reported benchmarks shown for scale.
      </p>
    </div>
  );
}

// Source: /content/story-spine.md, "Because of that" (Shalersville) beat.
// Cross-checked: PORT_SHALERSVILLE peak_treatment_capacity_mgd = 4.0 in
// /data/water_systems_master.csv.
const MODELED_DEMAND_MGD = 1.9; // 750 MW x 0.40 L/kWh standardized scenario
const PEAK_TREATMENT_CAPACITY_MGD = 4.0; // documented, Shalersville system

const COMPARE_MAX = 4.5;
const COMPARE_PLOT_WIDTH = 240;
const scaleCompare = (v) => (v / COMPARE_MAX) * COMPARE_PLOT_WIDTH;

// Computed directly from the two canonical figures above (both stated in
// story-spine.md) rather than repeating its rounded "about 48%" phrasing.
const CAPACITY_PERCENT = (MODELED_DEMAND_MGD / PEAK_TREATMENT_CAPACITY_MGD) * 100;

export function ShalersvilleVisual() {
  return (
    <div className={styles.inner}>
      <h3 className={styles.title}>Shalersville: one standardized scenario</h3>
      <svg
        viewBox="0 0 400 140"
        className={styles.chart}
        role="img"
        aria-label="Bar chart comparing 1.90 million gallons per day of modeled water demand, from a hypothetical 750 megawatt load at 0.40 liters per kilowatt-hour, against the Shalersville system's documented 4 million gallon per day peak treatment capacity."
      >
        <g transform="translate(20, 20)">
          <text x="0" y="0" className={styles.compareLabel}>
            Modeled water demand (750 MW × 0.40 L/kWh)
          </text>
          <rect x="0" y="10" width={scaleCompare(MODELED_DEMAND_MGD)} height="26" className={styles.modeledBar} />
          <text x={scaleCompare(MODELED_DEMAND_MGD) + 8} y="28" className={styles.compareValue}>
            {MODELED_DEMAND_MGD.toFixed(2)} MGD
          </text>
        </g>
        <g transform="translate(20, 80)">
          <text x="0" y="0" className={styles.compareLabel}>
            Documented peak treatment capacity (Shalersville system)
          </text>
          <rect x="0" y="10" width={scaleCompare(PEAK_TREATMENT_CAPACITY_MGD)} height="26" className={styles.capacityBar} />
          <text x={scaleCompare(PEAK_TREATMENT_CAPACITY_MGD) + 8} y="28" className={styles.compareValue}>
            {PEAK_TREATMENT_CAPACITY_MGD.toFixed(2)} MGD
          </text>
        </g>
      </svg>
      <p className={styles.footnote}>
        The modeled figure is {CAPACITY_PERCENT.toFixed(1)}% of documented
        peak treatment capacity —
        not a measure of available capacity, headroom, or feasibility. This
        is a hypothetical standardized scenario, not an estimate of the
        proposed facility&rsquo;s actual water use.
      </p>
    </div>
  );
}
