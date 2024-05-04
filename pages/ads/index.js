import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { GrLocation } from 'react-icons/gr';
import { FiPhoneCall } from 'react-icons/fi';
import { state_arr, city_arr } from "../../src/utils/options";
import { getAd, getAdbyId } from '../../src/actions/adActions';
import { CardLoader } from '../../components/layout/Loader';
import { useRouter } from 'next/router';
import Image from 'next/image'
import useSWR from 'swr'
import MapCaller from '@/components/Map';


const Houses = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { loading, ads } = useSelector((state) => state.getads);

    const { _country, _state, _city, id} = router.query
    const { data, error } = useSWR("Get ads", () => dispatch(getAd(_country, _state, _city)))

    // document.documentElement.scrollTop = 0;
    

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    // const [country, setCountry] = useState(_country ? _country : "");
    // const [state, setState] = useState(_state ? _state : "");
    // const [city, setCity] = useState(_city ? _city : "");


    
    useEffect(() =>{
        if(id) dispatch(getAdbyId(id))
        // else dispatch(getAd(_country, _state, _city))
    }, [dispatch, _country, _state, _city, id])


    const submitHandler = (e) => {
        e.preventDefault();
        // router.push(`/ads/search/${country}/${state}/${city}`)
        router.push({ pathname: '/ads', query: { _country: country, _state: state, _city: city } })
        dispatch(getAd(country, state, city));
    };

  return (
    <>
      {/* {loading ? (<h1>Loading...</h1>) : ( */}
        <div>
            
        <form className="search-form" onSubmit={submitHandler}>
            <div className="search-select">
                <select className="select-country" onChange={(e) => setCountry(e.target.value)}>
                {_country ? (
                    <option value="" disabled selected hidden>
                    {_country}
                    </option>
                ) : (
                    <option value="" disabled selected hidden>
                    Country
                    </option>
                )}
                <option value="India">India</option>
                </select>
                <select className="select-state" disabled={country=="" && _country==undefined ? true : false} onChange={(e) => setState(e.target.value)}>
                {_state ? (
                    <option value="" disabled selected hidden>
                    {_state}
                    </option>
                ) : (
                    <option value="" disabled selected hidden>
                    State
                    </option>
                )}
                {state_arr.map((state, i) => (
                    <option key={i} value={state}>{state}</option>
                ))}
                </select>
                <select className="select-city" disabled={state=="" && _state==undefined ? true : false} onChange={(e) => setCity(e.target.value)}>
                {_city ? (
                    <option value="" disabled selected hidden>
                    {_city}
                    </option>
                ) : (
                    <option value="" disabled selected hidden>
                    City
                    </option>
                )}
                {city_arr[state].split("|").map((city, i) => <option key={i}>{city}</option>)}
                </select>
                <button disabled={city=="" && _city==undefined ? true : false} type="submit"> Search </button>
            </div>
        </form>

        {loading ? (<CardLoader/>) : (
            ads.length > 0 ? (
                ads.map((ad, index) => 
                    <div key={index} className="cards">
                        <div className="card">
                            <div className="top">
                                <Image width={1000} height={160} alt="House snaps" className="image" src="/house.jpg" />
                                <div className="data">
                                    <div className="head">
                                        <div className="head-data">
                                            <span className="title">{ad.ad_title}</span>
                                            <div class="section">
                                                <span className="city">{ad.city} - </span>
                                                <span className="pincode">{ad.pincode} | </span>
                                                <span className="createdAt">{ad.createdAt.substring(0,10)} |</span>
                                                <div>
                                                    
                                                    <input type="checkbox" className="modal-btn" id="modal-btn" name="modal-btn"/>
                                                    <label for="modal-btn"  onClick={() => {
                                                        document.querySelector(`.modal${index}`).classList.add('y');
                                                        document.querySelector(`.modal-wrap${index}`).classList.add('s');

                                                    }}>Show in maps</label> 		
                                                    <div className={`modal modal${index}`} >
                                                        <div className="modal-close-btn">
                                                            <button className="modal-close" onClick={() => {
                                                            document.querySelector(`.modal${index}`).classList.remove('y');
                                                            document.querySelector(`.modal-wrap${index}`).classList.remove('s')}}>X</button>
                                                        </div>
                                                        <div className={`modal-wrap modal-wrap${index}`}>	
                                                        <MapCaller ad={[ad]} width={100} height={80}/>
                                                        </div>			          		
                                                    </div>
                                                    		
                                                </div>
                                            </div>
                                        </div>
                                        <span className="price">$ {ad.price}</span>
                                    </div>
                                    <div className="room-info">
                                        <div className="room-data"><Image className="room-icon" alt="House living_room" src="/room-icon.png" width="1600" height="1600"/><span className="living_room">{ad.living_rooms}</span></div>
                                        <div className="room-data"><Image className="room-icon" alt="House bath_room" src="/bathroom-icon.png" width="1600" height="1600"/><span className="bath_room">{ad.bath_rooms}</span></div>
                                        <div className="room-data"><Image className="room-icon" alt="House bed_room" src="/bedroom-icon.png" width="1600" height="1600"/><span className="bed_room">{ad.bed_rooms}</span></div>
                                        <div className="room-data"><Image className="room-icon" alt="House kitchens" src="/kitchen-icon.png" width="1600" height="1600"/><span className="kitchens">{ad.kitchens}</span></div>
                                    </div>
                                    <p className="description">{ad.description}</p>
                                </div>
                            </div>
                            <div className="bottom">
                                <span><GrLocation style={{color: 'black', fontSize: '25px', marginRight: '13px'}}/>
                                {ad.addressL1}, {ad.addressL2}, {ad.city}, {ad.state}, {ad.country}</span>
                                <span><FiPhoneCall style={{color: 'black', fontSize: '25px', marginRight: '13px'}}/>{ad.contact}</span>
                            </div>
                        </div>
                    </div>
              )) 
              : (<h1>No data</h1>)
        )}

      </div>
    {/* )}   */}
    </>
  );
};

export default Houses;
