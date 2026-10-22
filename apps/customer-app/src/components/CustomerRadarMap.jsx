import React, { useEffect, useRef } from 'react';
import { View } from '@pest-free/ui-kit';

/**
 * Real Leaflet Map Component with Live Moving Technician Marker
 */
export function CustomerRadarMap({ customerCoords, workerCoords, isLiveMove, height = '320px' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const workerMarkerRef = useRef(null);
  const lineRef = useRef(null);

  const cLat = customerCoords?.lat || 12.9250;
  const cLng = customerCoords?.lng || 77.5938;
  const wLat = workerCoords?.lat || 12.9720;
  const wLng = workerCoords?.lng || 77.5940;

  useEffect(() => {
    if (!mapContainerRef.current || !window.L) return;

    if (!mapInstanceRef.current) {
      const map = window.L.map(mapContainerRef.current, {
        center: [(cLat + wLat) / 2, (cLng + wLng) / 2],
        zoom: 13,
        zoomControl: false,
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Customer Home Marker
      const homeIcon = window.L.divIcon({
        className: 'custom-map-icon',
        html: `<div style="background:#E8A317; color:#1D2B1A; border:2px solid #FFFFFF; border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.3); font-weight:800; font-size:16px;">🏠</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      window.L.marker([cLat, cLng], { icon: homeIcon })
        .addTo(map)
        .bindPopup('<b>Customer Destination</b><br>Service location pinned here')
        .openPopup();

      // Worker Moving Marker with Pulse Effect
      const techIcon = window.L.divIcon({
        className: 'custom-map-icon',
        html: `<div style="position:relative; width:40px; height:40px; display:flex; align-items:center; justify-content:center;">
          <div style="position:absolute; width:100%; height:100%; border-radius:50%; background:rgba(31,91,58,0.35); animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
          <div style="background:#1F5B3A; color:#FFFFFF; border:2px solid #FFFFFF; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(31,91,58,0.5); font-size:14px;">🛵</div>
        </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      const wMarker = window.L.marker([wLat, wLng], { icon: techIcon }).addTo(map);
      wMarker.bindPopup('<b>Field Technician (Arjun Sharma)</b><br>Live GPS route en route');
      workerMarkerRef.current = wMarker;

      // Connecting Route Line
      const routeLine = window.L.polyline([[wLat, wLng], [cLat, cLng]], {
        color: '#1F5B3A',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.8,
      }).addTo(map);
      lineRef.current = routeLine;

      mapInstanceRef.current = map;
    } else {
      if (workerMarkerRef.current) {
        workerMarkerRef.current.setLatLng([wLat, wLng]);
      }
      if (lineRef.current) {
        lineRef.current.setLatLngs([[wLat, wLng], [cLat, cLng]]);
      }
    }
  }, [cLat, cLng, wLat, wLng]);

  return (
    <View
      style={{
        width: '100%',
        height,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1.5px solid var(--border-strong)',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative',
      }}
    >
      <View ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </View>
  );
}

export default CustomerRadarMap;
