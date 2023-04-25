import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { state_arr, city_arr } from "@/utils/options";
import { getUserAd, updateAd, clearErrors } from '@/actions/adActions';
import MapCaller from '@/components/Map'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getSession } from "next-auth/react";



const UpdateHouses = ({ session }) => {
    
    const dispatch = useDispatch();
    const router = useRouter();
    // const session = useSession({
    //         required: true,
    //         onUnauthenticated: () => {
    //             console.log("Hello")
    //         },
    //         onLoading: () => {
    //             console.log("Loading")
    //         }
    // })

    // if(session.loading){
    //     return <h1>Loading...</h1>
    // }

    // console.log(session)

    const { id } = router.query

    const { data, error } = useSWR("fd", () => dispatch(getUserAd(id)))

    const { ads } = useSelector(state => state.getads)
    const { isUpdated } = useSelector(state => state.updateads)
    const ad = ads[0];
    
    const [ad_title, setAd_title] = useState();
    const [description, setDescription] = useState("");
    const [living_rooms, setLiving_rooms] = useState(0);
    const [bed_rooms, setBed_rooms] = useState(0);
    const [bath_rooms, setBath_rooms] = useState(0);
    const [kitchens, setKitchens] = useState(0);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [addressL1, setAddressL1] = useState("");
    const [addressL2, setAddressL2] = useState("");
    const [pincode, setPincode] = useState(0);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [price, setPrice] = useState(0);
    const [contact, setContact] = useState(0);

    const location = (coords) => { 
        setLatitude(coords.lat);
        setLongitude(coords.lng);
    }

    // console.log(id)

    
    useEffect(() =>{
        if(ad !== undefined){
            setAd_title(ad.ad_title)
            setDescription(ad.description)
            setLiving_rooms(ad.living_rooms)
            setBed_rooms(ad.bed_rooms)
            setBath_rooms(ad.bath_rooms)
            setKitchens(ad.kitchens)
            setCountry(ad.country)
            setState(ad.state)
            setCity(ad.city)
            setAddressL1(ad.addressL1)
            setAddressL2(ad.addressL2)
            setPincode(ad.pincode)
            setLatitude(ad.latitude)
            setLongitude(ad.longitude)
            setPrice(ad.price)
            setContact(ad.contact)
        }
        // else{
        //     dispatch(getUserAd(id))
        // }
        if(isUpdated){
            dispatch({ type: "UPDATE_ADS_RESET" })
            router.push('/profile')
        }
        if(error){
            alert(error)
            dispatch(clearErrors())
        }

    }, 
    [dispatch, router, id, ad, isUpdated, error]
    )


    const submitHandler = (e) => {
        e.preventDefault();
        const data = { id: ad.id, ad_title, description, living_rooms, bed_rooms, bath_rooms, kitchens, country, state, city, addressL1, addressL2, pincode, latitude, longitude, price, contact};
        dispatch(updateAd(data));
    }


  return (
    <>
      <div className="new-ad">
          <form className="form" onSubmit={submitHandler}>
            <h3>Update Advertisement</h3>

            <label>Ad Title</label>
            <input type="text" value={ad_title} onChange={(e) => setAd_title(e.target.value)}/>

            <label>Description</label>
            <textarea rows="40" value={description} onChange={(e) => setDescription(e.target.value)}/>
            
            <div className="container">
                <div className="section">
                    <label>Living rooms</label>
                    <input type="number" value={living_rooms} onChange={(e) => setLiving_rooms(parseInt(e.target.value))}/>
                </div>
                <div className="section">
                    <label>Bedrooms</label>
                    <input type="number" value={bed_rooms} onChange={(e) => setBed_rooms(parseInt(e.target.value))}/>
                </div>
                <div className="section">
                    <label>Bathrooms</label>
                    <input type="number" value={bath_rooms} onChange={(e) => setBath_rooms(parseInt(e.target.value))}/>
                </div>
                <div className="section">
                    <label>Kitchens</label>
                    <input type="number" value={kitchens} onChange={(e) => setKitchens(parseInt(e.target.value))}/>
                </div>
            </div>

            <label>Location</label>
            <div className="container">
                <select className="select-country" value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="" disabled selected hidden> Country </option>
                    <option value="India">India</option>
                </select>

                <select className="select-country" value={state} disabled={country=="" ? true : false} onChange={(e) => setState(e.target.value)}>
                    <option value="" disabled selected hidden> State </option>
                    {state_arr.map((state, i) => <option key={i} value={state}>{state}</option>)}
                </select>

                <select className="select-country" value={city} disabled={state=="" ? true : false} onChange={(e) => setCity(e.target.value)}>
                    <option value="" disabled selected hidden> City </option>
                    {city_arr[state].split('|').map((city, i) => <option key={i} value={city}>{city}</option>)}
                </select>
            </div>

            <label>Address Line 1</label>
            <input type="text" value={addressL1} onChange={(e) => setAddressL1(e.target.value)}/>
            <label>Address Line 2</label>
            <input type="text" value={addressL2} onChange={(e) => setAddressL2(e.target.value)}/>
            <label>Pin Code</label>
            <input type="number" value={pincode} onChange={(e) => setPincode(parseInt(e.target.value))}/>
    
            <label>Select Location (optional)</label>
            <div className="map">
                <MapCaller ad={[]} location={location} width={100} height={88}/>
            </div>

            <div className="container">
                <div className="section">
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/>
                </div>
                <div className="section">
                    <label>Phone number</label>
                    <input type="number" value={contact} onChange={(e) => setContact(parseInt(e.target.value))}/>
                </div>
            </div>

            <label>Email</label>
            <input type="email" value={session.user.email} disabled/>

            <button>Post Ad</button>
          </form>
      </div>
    </>
  )
}

export default UpdateHouses

export async function getServerSideProps(context) {


    const session = await getSession(context)
    console.log(session)
    

    return {
      props: {
        session
      }, // will be passed to the page component as props
    }
  }