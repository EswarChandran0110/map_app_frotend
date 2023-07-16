// MapDisplay.js
import React, { useEffect, useRef, useCallback } from 'react';

export const MapDisplay = ({ onMapClick }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const initializeMap = useCallback(() => {
    const TOMTOM_API_KEY = 'D5w3VS7gW5szyT9muxqLc0cf2pqqmJGb';

    const loadTomTomSDK = () => {
      const script = document.createElement('script');
      script.src = `https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.75.0/maps/maps-web.min.js?key=${TOMTOM_API_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const center = [0, 0];
        const zoom = 2;

        if (window.tomtom && mapContainerRef.current) {
          mapInstanceRef.current = window.tomtom.L.map(mapContainerRef.current, {
            key: 'D5w3VS7gW5szyT9muxqLc0cf2pqqmJGb',
            basePath: 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.75.0/sdk',
            center,
            zoom,
          });

          mapInstanceRef.current.on('click', (e) => {
            const { lat, lng } = e.latlng;
            onMapClick(lat, lng);
          });
        }
      };
    };

    loadTomTomSDK();

    return () => {
      const script = document.getElementById('tomtom-maps-sdk');
      if (script) {
        script.remove();
      }
    };
  }, [onMapClick]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  return <div ref={mapContainerRef} id="map-container" className="map-container" />;
};



