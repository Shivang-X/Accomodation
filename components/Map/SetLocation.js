import { useState, useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents, Popup } from 'react-leaflet';
// import L from "leaflet"


const SetLocation = ({ location }) => {
    
    // const markerIcon = new L.Icon({
    //     iconUrl: require('./location-icon.png'),
    //     iconSize: [35, 45]
    // })

    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(e) {
            console.log(e.latlng.lat, e.latlng.lng)
            setPosition(e.latlng)
            location(e.latlng)
        },
    })
    // alert("Called")

    return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )
};

export default SetLocation