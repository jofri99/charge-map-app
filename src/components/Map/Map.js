import React, {useState} from 'react'
import ReactMapGL,{GeolocateControl} from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9mcmkiLCJhIjoiY2p0NGM4a2R5MWlwNzN5bGtxZ2F4cXN3ZiJ9.5ARJ7m-clBq5yo5QM0lg7g'

const geolocateControlStyle= {
  right: 10,
  top: 10
};

const Map = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 51.050407,
        longitude: 13.737262,
        zoom: 14,
        bearing: 0,
        pitch: 0
      });
    const [isInititalized, setIsInitialized] = useState(false)
    
    const viewportChanged = () => {
      props.setCenterFunc([viewport.latitude, viewport.longitude])
    }

    const onGeolocate = (evt) => {
      if(!isInititalized) {
        const c = {
          latitude: evt.coords.latitude,
          longitude: evt.coords.longitude,
          zoom:14,
          bearing:0,
          pitch:0
        }
        props.setCenterFunc([c.latitude, c.longitude])
        setIsInitialized(true)
      }
    }
    
    return(
        <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onMouseUp={viewportChanged}
      >
        <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        onGeolocate={onGeolocate}
        auto
      />
        {props.children}
      </ReactMapGL>
    )
}

export default Map