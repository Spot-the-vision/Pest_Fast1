import React, { useEffect, useRef } from 'react';

/**
 * Universal Leaflet GPS Radar Map Component
 * Renders real-time GPS tracking between customer home pin and moving technician marker.
 */
export function RadarMap({
  customerCoords,
  workerCoords,
  height = '320px',
  workerName = 'Field Technician (Arjun Sharma)',
  destinationTitle = 'Customer Destination',
  showPolyline = true,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const workerMarkerRef = useRef(null);
  const lineRef = useRef(null);

  const cLat = customerCoords?.lat || 12.925;
  const cLng = customerCoords?.lng || 77.5938;
  const wLat = workerCoords?.lat || 12.972;
  const wLng = workerCoords?.lng || 77.594;

  useEffect(() => {
    if (!mapContainerRef.current || typeof window === 'undefined' || !window.L) return;

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

      // Customer Destination Marker
      const homeIcon = window.L.divIcon({
        className: 'custom-map-icon',
        html: `<div style="background:#E8A317; color:#1D2B1A; border:2px solid #FFFFFF; border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.3); font-weight:800; font-size:16px;">🏠</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      window.L.marker([cLat, cLng], { icon: homeIcon })
        .addTo(map)
        .bindPopup(`<b>${destinationTitle}</b><br>Service location pinned here`);

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
      wMarker.bindPopup(`<b>${workerName}</b><br>Live GPS route en route`);
      workerMarkerRef.current = wMarker;

      if (showPolyline) {
        const routeLine = window.L.polyline([[wLat, wLng], [cLat, cLng]], {
          color: '#1F5B3A',
          weight: 4,
          dashArray: '8, 8',
          opacity: 0.8,
        }).addTo(map);
        lineRef.current = routeLine;
      }

      mapInstanceRef.current = map;
    } else {
      if (workerMarkerRef.current) {
        workerMarkerRef.current.setLatLng([wLat, wLng]);
      }
      if (lineRef.current && showPolyline) {
        lineRef.current.setLatLngs([[wLat, wLng], [cLat, cLng]]);
      }
    }
  }, [cLat, cLng, wLat, wLng, showPolyline, workerName, destinationTitle]);

  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1.5px solid #ebe8e3',
        position: 'relative',
      }}
    >
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export const RealLeafletMap = RadarMap;
export const WorkerMiniMap = RadarMap;
