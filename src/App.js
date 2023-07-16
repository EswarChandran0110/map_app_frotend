// App.js
import React, { useState } from 'react';
import axios from 'axios';
import { MapDisplay } from './MapDisplay';
import './App.css';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleMapClick = (lat, lng) => {
    setSelectedLocation({ lat, lng });
  };

  const handleCaptureImage = () => {
    const mapContainer = document.getElementById('map-container');

    if (mapContainer) {
      const { offsetWidth, offsetHeight } = mapContainer;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
      context.drawImage(mapContainer, 0, 0, offsetWidth, offsetHeight);

      const image = canvas.toDataURL('image/png');

      axios
        .post('/api/images', { image })
        .then(() => {
          setCapturedImage(image);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="app">
      <MapDisplay onMapClick={handleMapClick} />

      {selectedLocation && (
        <div className="selected-location">
          <p>Selected Location:</p>
          <p>Latitude: {selectedLocation.lat.toFixed(4)}</p>
          <p>Longitude: {selectedLocation.lng.toFixed(4)}</p>
          <button onClick={handleCaptureImage}>Capture Image</button>
        </div>
      )}

      {capturedImage && (
        <div className="captured-image">
          <p>Image captured:</p>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default App;
