import React, { useState } from "react";
import { Map, Marker, InfoWindow} from "@vis.gl/react-google-maps";
import ContactForm from "./ContactForm";
const ReactGoogleMap = () => {
  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 39.995639,
    lng: 32.752335
  });
  return (
    <div className="google-map-style-1">
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        
        <Marker position={markerLocation} title="COVISART"/>
      </Map>
    </div>
  );
}
/*

<InfoWindow  position={markerLocation}>
           <h3 color="black">COVISART</h3> 
        </InfoWindow>
*/
export default ReactGoogleMap;