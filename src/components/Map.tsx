"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  markerLabel?: string;
}

const MAPBOX_TOKEN_URL = "https://axdeumsywjgknrjurgds.functions.supabase.co/mapbox-token";

const Map: React.FC<MapProps> = ({ lat, lng, zoom = 14, markerLabel }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let destroyed = false;

    async function init() {
      try {
        const res = await fetch(MAPBOX_TOKEN_URL, { method: "GET" });
        const data = await res.json();
        if (!res.ok || !data?.token) {
          throw new Error(data?.error || "Mapbox token not available");
        }

        mapboxgl.accessToken = data.token;
        if (!mapContainer.current) return;

        mapRef.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [lng, lat],
          zoom,
        });

        mapRef.current.addControl(
          new mapboxgl.NavigationControl({ visualizePitch: true }),
          "top-right"
        );

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);

        if (markerLabel) {
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(markerLabel);
          new mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(mapRef.current);
        }
      } catch (e) {
        if (!destroyed) setError("Map unavailable. Please try again later.");
        console.error("Map init error", e);
      }
    }

    init();

    return () => {
      destroyed = true;
      mapRef.current?.remove();
    };
  }, [lat, lng, zoom, markerLabel]);

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default Map;
