import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  LayersControl,
  ImageOverlay,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";


function App() {
  const mapRef = useRef();
  const [image, setImage] = useState(null);
  const mapOptions = {
    zoomControl: false,
    doubleClickZoom: false,
    dragging: false,
    zoomDelta: false,
    trackResize: false,
    touchZoom: false,
    scrollWheelZoom: false,
  };

  const _handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/svg")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      // mapRef.current.fitBounds([[0, 0], [50, 50]]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={_handleFileUpload} />
      <MapContainer
        center={[45.421532, -75.697189]}
        zoom={13}
        style={{ height: "calc(100vh - 30px)", width: "100%" }}
        ref={mapRef}
        {...mapOptions}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
        </LayersControl>
        <FeatureGroup>
          <EditControl position="topright" />
          {image && (
            <ImageOverlay
              url={image}
              transform={90}
              bounds={[
                [45.37, -75.65],
                [45.48, -75.74],
              ]}
            />
          )}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}

export default App;
