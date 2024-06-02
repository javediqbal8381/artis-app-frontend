import React, { useEffect, useRef } from 'react';

const Maps = ({ apiKey, lat, lng, zoom }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!apiKey) {
      console.error("Google Maps API key is required.");
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: zoom
    });

    new window.google.maps.Marker({
      position: { lat, lng },
      map: map
    });
  };

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
    />
  );
};

export default Maps;
