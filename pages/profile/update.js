import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from '@/actions/userActions'
import { clearErrors } from '@/actions/adActions';
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { useRouter } from 'next/router'; 
import { getSession } from "next-auth/react";
import Image from 'next/image';

const UpdateProfile = ({ session }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const { user } = session;
    console.log(session)
    const [contact, setContact] = useState(0);
    const { isUpdated, error } = useSelector((state) => state.user);
    
    useEffect(() => {
        if(session.status === 'unauthenticated') router.push({ pathname: "/"});
    }, [router, session.status])

    useEffect(() => {
        if (session.user) {
          setUsername(user.username);
          setContact(user.contact);
        }
    
        if (isUpdated) {
          // toast('User updated successfully');
        //   dispatch(loadUser());

        
        dispatch({
          type: "UPDATE_PROFILE_RESET",
        });
        router.push('/profile')
        }

        if(error){
            toast(error)
            dispatch(clearErrors())
        }
    }, [dispatch, router, session.user, isUpdated, user, error]);

    const handleClick = () => {
        router.push('/profile')
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {username, contact}
        dispatch(updateProfile(data, user.id))
    }
    
    return (
        <>
            <div className="update-profile">
            <div className="left">
            <Image src="/home.png" alt="" width="500" height="500"/>
            </div>
            <div className="right">
            <form className="form" onSubmit={submitHandler}>
                <h3 className="heading">Update Profile</h3>
             
                {user ? (
                    <>
                        <div className="fields"><FaUserAlt style={{color: 'black', fontSize: '25px', marginRight: '13px'}}/><input type="text" id="username" value={username} onChange = {(e) => setUsername(e.target.value)}/></div>
                        <div className="fields"><MdOutlineAlternateEmail style={{color: 'black', fontSize: '25px', marginRight: '13px'}}/><input value={user.email} disabled/></div>
                        <div className="fields"><FiPhoneCall style={{color: 'black', fontSize: '25px', marginRight: '13px'}}/><input type="number" value={contact} onChange = {(e) => setContact(parseInt(e.target.value))}/></div>
                    </>
                    ) : (
                    <h3>Please Sign in first</h3>
                )}

                <button type="submit">Submit</button>
                <button className="cancel-btn" onClick={handleClick}>Cancel</button>
            </form>
            </div>
            </div>  
        </>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession(context)

    return {
      props: {
        session
      }, // will be passed to the page component as props
    }
}

export default UpdateProfile