import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import L from "leaflet"
import Link from 'next/link'
import SetLocation from './SetLocation'
// import locationIcon from './location-icon1.png'
// import locationIcon from './location-icon1.png'
import Image from 'next/image'

const Map = ({ ad, location, width, height }) => {

  // console.log(ad)
    // const dispatch = useDispatch();
    // const { loading, ads } = useSelector((state) => state.getads);
    // console.log(locationIcon)

    // useEffect(() =>{
    //   dispatch(getAd())
    // }, [dispatch])

    // const markerIcon = new L.Icon({
    //   iconUrl: locationIcon,
    //   // iconSize: [30, 40],
    //   // iconAnchor: [12, 20]
    //   iconSize: [38, 65],
    //   iconAnchor: [22, 64],
    //   popupAnchor: [-2, -65]
    // })

  return (
    <div>
        {/* <Image src={locationIcon} width="100" height="100"/> */}
        {/* <img src={locationIcon} alt='gfd'/> */}
        <div className="maps">
            <MapContainer
                id='map'
                center={{ lat: 20.5937, lng: 78.9629 }}
                zoom={5}
                style={{width: `${width}%`, height: `${height}vh`}}
                >
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <SetLocation location={location}/>
                {ad.map((ad, i) => <Marker key={i} position={[ad.latitude, ad.longitude]}><Popup className='popup'><Link herf={`/ads/search/${ad.id}`}>Go to Ad</Link></Popup></Marker>)}
            </MapContainer>
        </div>
    </div>
  )
}


export default Map