import { useDispatch, useSelector } from "react-redux";
import { GrLocation } from 'react-icons/gr';
import { getUserAd } from '../../src/actions/adActions';
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { Loader, CardLoader } from '@/src/components/layout/Loader';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import useSWR from 'swr'
import MapCaller from '@/src/components/Map';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import { logout } from "@/src/actions/userActions";

const Profile = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const session = useSession()

    const { isAuthenticated, user, loading, errors } = useSelector(state => state.auth)

    // useEffect(() => {
    //     console.log(isAuthenticated)
    //     if (!isAuthenticated) {
    //         router.push('/')
    //     }
    //     dispatch(getUserAd(session))
    // }, [isAuthenticated])

    const { loading: adloading, ads } = useSelector((state) => state.getads);

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logout())
        router.push({ pathname: "/"});
        toast.success('Logged out Successfully !')
    }

    console.log(user?.houses?.length);
    
    return (
        <div className="profile-section">
            <div className="profile">
                <div className="left">
                    <Image src="/home.png" alt="" width="500" height="500"/>
                </div>
                <div className="right">
                    {loading ? (<Loader/>) : (
                        <form className="form">
                        <h3 className="heading">Profile</h3>
                        {user !== undefined ? (
                            <>
                                <div><FaUserAlt style={{color: 'black', fontSize: '25px', marginRight: '13px'}}/>{user?.firstName} {user?.lastName}</div>
                                <div><MdOutlineAlternateEmail style={{color: 'black', fontSize: '25px', marginRight: '13px'}}/>{user?.email}</div>
                                <div><FiPhoneCall style={{color: 'black', fontSize: '25px', marginRight: '13px'}}/>+91 {user?.mobileNumber}</div>
                            </>
                            ) : (
                            <h3>Please Sign in first</h3>
                        )}
                        <button onClick={(e) => {e.preventDefault();router.push("/profile/update")}}>Update</button>
                        <button onClick={handleLogout} className="logout-btn">Log out</button>
                    </form>
                    )} 
                </div>
            </div>
            <div className="post-ad-section">
                <h3 className="heading">Your Advertisements</h3>
                <button onClick={() => router.push('/postad')} type="submit">Post New Advertisement</button>
            </div>
            <div>
            {loading ? (<CardLoader/>) : (
            user?.houses?.length > 0 ? (
                user.houses.map((ad, index) => 
                    <div className="cards" key={index}>
                        <div className="card">
                            <div className="top">
                                <Image width={1000} height={160} alt="House snaps" className="image" src="/house.jpg" />
                                <div className="data">
                                    <div className="head">
                                        <div className="head-data">
                                            <span className="title">{ad.ad_title}</span>
                                            <div className="section">
                                                <span className="city">{ad.city} - </span>
                                                <span className="pincode">{ad.pincode} | </span>
                                                {/* <span className="createdAt">{ad.createdAt.substring(0,10)} |</span> */}
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
                                                        {/* <MapCaller ad={[ad]} /> */}
                                                        </div>			          		
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a className="edit-btn" href={`/ads/update/${ad.id}`}>Edit</a>
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
        </div>
        // <h1>H</h1>
    )
}

// export async function getServerSideProps({req}) {

//     const session = await getSession({req})

//     console.log(session, "Server side")

        
//     return {
//       props: {
//         session
//       }, // will be passed to the page component as props
//     }
// }

export default Profile