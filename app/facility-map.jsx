"use client";

// Real interactive basemap, loaded client-only (see scenario-explorer.jsx's
// dynamic import with ssr: false) since Leaflet needs direct DOM access.
// Facility markers plot straight from lat/lon -- no manual projection
// needed now that Leaflet handles pan/zoom itself. See mapped_facilities.json
// _notes for the two known caveats (Mantua geocoding, Akron-area cluster).

import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./facility-map.module.css";

export default function FacilityMap({ facilities, selectedFacilityId, onSelectFacility }) {
  const lats = facilities.map((f) => f.lat);
  const lons = facilities.map((f) => f.lon);
  const bounds = [
    [Math.min(...lats), Math.min(...lons)],
    [Math.max(...lats), Math.max(...lons)],
  ];

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [30, 30] }}
      scrollWheelZoom={false}
      className={styles.map}
    >
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
