import { useState } from 'react'
import { useDispatch } from "react-redux"
import { state_arr, city_arr } from "./../utils/options";
import { postAd } from '../actions/adActions';
import MapCaller from '../components/Map'
import { getSession } from 'next-auth/react';
import { toast } from "react-toastify";
import { useRouter } from 'next/router'; 


const NewAd = ({ session }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [ad_title, setAd_title] = useState("");
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

    const submitHandler = (e) => {
        e.preventDefault();
        const data = { ad_title, description, living_rooms, bed_rooms, bath_rooms, kitchens, country, state, city, addressL1, addressL2, pincode, latitude, longitude, price, contact};
        dispatch(postAd(data, session.user.id));
        router.push('/profile')
        toast("Advert posted Successfully !")
        
    }

  return (
    <>
      <div className="new-ad">
          <form className="form" onSubmit={submitHandler}>
            <h3>Post Advertisement</h3>

            <label>Ad Title</label>
            <input type="text" id="email" onChange={(e) => setAd_title(e.target.value)}/>

            <label>Description</label>
            <textarea rows="40" onChange={(e) => setDescription(e.target.value)}/>
            
            <div className="container">
                <div className="section">
                    <label>Living rooms</label>
                    <input type="number" onChange={(e) => setLiving_rooms(parseInt(e.target.value))}/>
                </div>
                <div className="section">
                    <label>Bedrooms</label>
                    <input type="number" onChange={(e) => setBed_rooms(parseInt(e.target.value))}/>
                </div>
                <div className="section">
                    <label>Bathrooms</label>
                    <input type="number" onChange={(e) => setBath_rooms(parseInt(e.target.value))}/>
                </div>
                <div className="section">
                    <label>Kitchens</label>
                    <input type="number" onChange={(e) => setKitchens(parseInt(e.target.value))}/>
                </div>
            </div>

            <label>Location</label>
            <div className="container">
                <select className="select-country" onChange={(e) => setCountry(e.target.value)}>
                    <option value="" disabled selected hidden> Country </option>
                    <option value="India">India</option>
                </select>

                <select className="select-country" disabled={country=="" ? true : false} onChange={(e) => setState(e.target.value)}>
                    <option value="" disabled selected hidden> State </option>
                    {state_arr.map(state => <option value={state}>{state}</option>)}
                </select>

                <select className="select-country" disabled={state=="" ? true : false} onChange={(e) => setCity(e.target.value)}>
                    <option value="" disabled selected hidden> City </option>
                    {city_arr[state].split('|').map(city => <option value={city}>{city}</option>)}
                </select>
            </div>

            <label>Address Line 1</label>
            <input type="text" onChange={(e) => setAddressL1(e.target.value)}/>
            <label>Address Line 2</label>
            <input type="text" onChange={(e) => setAddressL2(e.target.value)}/>
            <label>Pin Code</label>
            <input type="number" onChange={(e) => setPincode(parseInt(e.target.value))}/>
    
            <label>Select Location (optional)</label>
            <div className="map">
                <MapCaller ad={[]} location={location} width={100} height={88}/>
            </div>

            <div className="container">
                <div className="section">
                    <label>Price</label>
                    <input type="number" onChange={(e) => setPrice(parseInt(e.target.value))}/>
                </div>
                <div className="section">
                    <label>Phone number</label>
                    <input type="number" onChange={(e) => setContact(parseInt(e.target.value))}/>
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
export async function getServerSideProps(context) {


    const session = await getSession(context)
    console.log(session)
    

    return {
      props: {
        session
      }, // will be passed to the page component as props
    }
}

export default NewAd