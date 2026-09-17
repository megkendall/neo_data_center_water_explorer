"use client";

// Real interactive basemap, loaded client-only (see scenario-explorer.jsx's
// dynamic import with ssr: false) since Leaflet needs direct DOM access.
// Facility markers plot straight from lat/lon -- no manual projection
// needed now that Leaflet handles pan/zoom itself. See mapped_facilities.json
// _notes for the two known caveats (Mantua geocoding, Akron-area cluster).

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./facility-map.module.css";

const FIT_BOUNDS_OPTIONS = { padding: [30, 30] };

// MapContainer's `bounds` prop only fits once, at the exact moment Leaflet
// measures the container -- which can still be the wrong size right then
// (the dynamic-import loading-placeholder swap, responsive breakpoints,
// web font loading reflow). That's what was cutting facilities off on
// mobile: an early, stale fit that never got redone. This refits once
// after the container has genuinely settled, and again on any later
// resize (viewport resize, orientation change).
function FitBoundsOnSettle({ bounds }) {
  const map = useMap();

  useEffect(() => {
    const refit = () => {
      map.invalidateSize();
      map.fitBounds(bounds, FIT_BOUNDS_OPTIONS);
    };
    const raf = requestAnimationFrame(refit);
    window.addEventListener("resize", refit);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", refit);
    };
  }, [map, bounds]);

  return null;
}

export default function FacilityMap({ facilities, selectedFacilityId, onSelectFacility }) {
  // Memoized so this array's identity is stable across re-renders (e.g.
  // selecting a facility) -- otherwise FitBoundsOnSettle's effect would
  // re-run and snap the map back to the full-bounds view every time.
  const bounds = useMemo(() => {
    const lats = facilities.map((f) => f.lat);
    const lons = facilities.map((f) => f.lon);
    return [
      [Math.min(...lats), Math.min(...lons)],
      [Math.max(...lats), Math.max(...lons)],
    ];
  }, [facilities]);

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={FIT_BOUNDS_OPTIONS}
      scrollWheelZoom={false}
      className={styles.map}
    >
      <FitBoundsOnSettle bounds={bounds} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {facilities.map((f) => {
        const isSelected = f.id === selectedFacilityId;
        return (
          <CircleMarker
            key={f.id}
            center={[f.lat, f.lon]}
            radius={isSelected ? 9 : 6}
            pathOptions={{
              color: isSelected ? "#c0392b" : "#4a4a4a",
              fillColor: isSelected ? "#c0392b" : "#4a4a4a",
              fillOpacity: 1,
              weight: 2,
            }}
            eventHandlers={{
              click: () => onSelectFacility(f),
              mouseover: () => onSelectFacility(f),
            }}
          />
        );
      })}
    </MapContainer>
  );
}
