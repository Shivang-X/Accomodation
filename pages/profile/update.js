import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, loadUser } from '@/actions/userActions'
import { clearErrors } from '@/actions/adActions';
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { useRouter } from 'next/router'; 

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState(0);
    const { user } = useSelector((state) => state.auth);
    const { isUpdated, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
          setUsername(user.username);
          setContact(user.contact);
        }
    
        if (isUpdated) {
          toast('User updated successfully');
          dispatch(loadUser());

          router.push('/profile')
    
          dispatch({
            type: "UPDATE_PROFILE_RESET",
          });
        }

        if(error){
            toast(error)
            dispatch(clearErrors())
        }
    }, [dispatch, isUpdated, user, error]);

    const handleClick = () => {
        router.push('/profile')
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {username, contact}
        dispatch(updateProfile(data))
    }
    
    return (
        <>
            <div className="update-profile">
            <div className="left">
            <img src="/home.png" />
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

export default UpdateProfile