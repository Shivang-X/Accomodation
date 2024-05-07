import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadUser, updateProfile } from '@/src/actions/userActions'
import { clearErrors } from '@/src/actions/adActions';
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { useRouter } from 'next/router'; 
import { getSession } from "next-auth/react";
import Image from 'next/image';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    // const { user } = session;
    const [mobileNumber, setMobileNumber] = useState(0);
    const { isUpdated, error } = useSelector((state) => state.user);
    const { isAuthenticated, user, loading, errors } = useSelector(state => state.auth);
    
    useEffect(() => {
        if(!isAuthenticated) router.push({ pathname: "/"});
    }, [router, isAuthenticated])

    useEffect(() => {
        if (user) {
          setFirstname(user.firstName);
          setLastname(user.lastName);
          setMobileNumber(user.mobileNumber);
          setEmail(user.email);
        }
    
        if (isUpdated) {
          toast('User updated successfully');
          dispatch(loadUser());

        
        dispatch({
          type: "UPDATE_PROFILE_RESET",
        });
        router.push('/profile')
        }

        if(error){
            toast(error)
            dispatch(clearErrors())
        }
    }, [dispatch, router, user, isUpdated, user, error]);

    const handleClick = () => {
        router.push('/profile')
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const data = { firstName, lastName, email, mobileNumber };
        console.log(data);
        dispatch(updateProfile(data))
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
                        <div className="fields"><div>First name :<input type="text" id="username" value={firstName} onChange = {(e) => setFirstname(e.target.value)}/></div><div>Last name :<input type="text" id="username" value={lastName} onChange = {(e) => setLastname(e.target.value)}/></div> </div>
                        <div className="fields"><div>Email :<input value={user.email} disabled/></div></div>
                        <div className="fields"><div>Mobile number :<input type="number" value={mobileNumber} onChange = {(e) => setMobileNumber(parseInt(e.target.value))}/></div></div>
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

export default UpdateProfile