import React, { useEffect, useRef } from 'react';
import { View } from '@pest-free/ui-kit';

export function WorkerMiniMap({ customerCoords, workerCoords, height = '220px' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const cLat = customerCoords?.lat || 12.9250;
  const cLng = customerCoords?.lng || 77.5938;
  const wLat = workerCoords?.lat || 12.9352;
  const wLng = workerCoords?.lng || 77.6245;

  useEffect(() => {
    if (!mapContainerRef.current || !window.L) return;

    if (!mapInstanceRef.current) {
      const map = window.L.map(mapContainerRef.current, {
        center: [cLat, cLng],
        zoom: 14,
        zoomControl: false,
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
      }).addTo(map);

      // Customer Destination Pin
      const custIcon = window.L.divIcon({
        className: 'custom-pin-icon',
        html: `<div style="background:#E8A317; color:#1D2B1A; border:2px solid #FFFFFF; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.3); font-weight:800; font-size:15px;">🏠</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      window.L.marker([cLat, cLng], { icon: custIcon })
        .addTo(map)
        .bindPopup('<b>Customer Destination Pinned</b>');

      // Worker Live Scooter Pin
      const techIcon = window.L.divIcon({
        className: 'custom-pin-icon',
        html: `<div style="position:relative; width:36px; height:36px; display:flex; align-items:center; justify-content:center;">
          <div style="position:absolute; width:100%; height:100%; border-radius:50%; background:rgba(31,91,58,0.35); animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
          <div style="background:#1F5B3A; color:#FFFFFF; border:2px solid #FFFFFF; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.3); font-size:13px;">🛵</div>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
      const m = window.L.marker([wLat, wLng], { icon: techIcon }).addTo(map);
      markerRef.current = m;

      window.L.polyline([[wLat, wLng], [cLat, cLng]], {
        color: '#1F5B3A',
        weight: 3,
        dashArray: '6, 6',
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      if (markerRef.current) markerRef.current.setLatLng([wLat, wLng]);
    }
  }, [cLat, cLng, wLat, wLng]);

  return (
    <View
      style={{
        width: '100%',
        height,
        borderRadius: 14,
        overflow: 'hidden',
        border: '1.5px solid var(--border-strong)',
        marginTop: 12,
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

export default WorkerMiniMap;
