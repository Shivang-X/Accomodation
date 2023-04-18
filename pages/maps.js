import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import 'leaflet/dist/leaflet.css'
import { getAd } from '../actions/adActions';
import MapCaller from '../components/Map'
import { useRouter } from 'next/navigation';

const Maps = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, ads } = useSelector((state) => state.getads);

    useEffect(() =>{
      dispatch(getAd())
    }, [])


  return (
        <MapCaller ad={ads}/>
  )
}



export default Maps