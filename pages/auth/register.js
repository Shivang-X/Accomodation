import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Link from 'next/link'
import Image from 'next/image'
import { toast } from "react-toastify";
import { clearErrors, register } from '../../actions/userActions'
import { useSession } from 'next-auth/react'
import { router } from 'next/router'
import { signIn } from 'next-auth/react'

const Register = () => {

  const session = useSession()

    const dispatch = useDispatch();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState(0);
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const { isAuthenticated, error } = useSelector(state => state.auth)

    useEffect(() => {
      if (session.status === 'authenticated') {
        router.push('/')
      }
  
      if(error){
        toast.error(error);
        if(error === 'Email already registered !') document.getElementById('email').classList.add('red-border');
        else document.getElementById('form').classList.add('red-border');
        dispatch(clearErrors())
      } 
    }, [dispatch, session.status , error]);

    const submitHandler = async (e) => {
      e.preventDefault();
      document.getElementById('password').classList.remove('red-border');
      document.getElementById('cpassword').classList.remove('red-border');
      document.getElementById('form').classList.remove('red-border');
      document.getElementById('email').classList.remove('red-border');
      if(password === confirmpassword && password !== '') {
          const user = {username, email, contact, password}
          dispatch(register(user))
      }else{
          document.getElementById('password').classList.add('red-border');
          document.getElementById('cpassword').classList.add('red-border');
          toast.error("Passwords do not match")
      }
    }

  return (
    <>
      <div className="login">
        <div className="left">
          <Image src="/home.png" alt="" width="500" height="500"/>
        </div>
        <div className="right">
          <form className="form" id='form' onSubmit = {submitHandler}>
            <h3>Register Here</h3>
            <div className="container">
              <div className="section">
                <label for="username">Username</label>
                <input type="text" id="username" onChange = {(e) => setUsername(e.target.value)}/>
              </div>
              <div className="section">
                <label for="username">Contact</label>
                <input type="number" id="contact" onChange = {(e) => setContact(parseInt(e.target.value))}/>
                {/* <input type="number" id="contact" onChange = {(e) => console.log(typeof e.target.value)}/> */}
              </div>
            </div>

            <label for="Email">Email</label>
            <input type="email" id="email" onChange = {(e) => setEmail(e.target.value)}/>

            <div className="container">
              <div className="section">
                <label for="password">Password</label>
                <input type="password" id="password" onChange = {(e) => setPassword(e.target.value)}/>
              </div>
              <div className="section">
                <label for="password">Confirm Password</label>
                <input type="password" id="cpassword" onChange = {(e) => setConfirmpassword(e.target.value)}/>
              </div>
            </div>
            <button type="submit">Register</button>
            <div class="social">
              <div class="google">
                <i class="fab fa-google"></i> Google
              </div>
              <div class="signup">
                <i class="fab fa-facebook"></i> <Link href="/auth/login">Sign In</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
