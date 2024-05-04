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

    const [firstName, setFirstname] = useState();
    const [lastName, setLastname] = useState();
    const [email, setEmail] = useState();
    const [mobileNumber, setMobileNumber] = useState(0);
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const { isAuthenticated, error } = useSelector(state => state.auth)

    useEffect(() => {
      if (session.status === 'authenticated') {
        router.push('/')
      }
  
      if(error){
        console.log(error);
        toast.error(error);
        if(error === 'User already exists !!') document.getElementById('email').classList.add('red-border');
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
      document.getElementById('firstName').classList.remove('red-border');
      document.getElementById('lastName').classList.remove('red-border');
      document.getElementById('mobileNumber').classList.remove('red-border');

      if(firstName == ''){
        document.getElementById('firstName').classList.add('red-border');
        toast.error('Please enter First name !!');
      }else if(lastName == ''){
        document.getElementById('lastName').classList.add('red-border');
        toast.error('Please enter Last name !!');
      }else if(email == ''){
        document.getElementById('email').classList.add('red-border');
        toast.error('Please enter email !!');
      }else if(isNaN(mobileNumber)){
        document.getElementById('mobileNumber').classList.add('red-border');
        toast.error('Please enter mobile number !!');
      }else if(password == ''){
        document.getElementById('password').classList.add('red-border');
        toast.error('Please enter password !!')
      }else if(password !== confirmpassword){
          document.getElementById('password').classList.add('red-border');
          document.getElementById('cpassword').classList.add('red-border');
          toast.error("Passwords do not match !!")
      }
      else{
        const user = {firstName, lastName, email, mobileNumber, password};
        console.log(user);
        dispatch(register(user))
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
                <label for="username">Firstname</label>
                <input type="text" id="firstName" onChange = {(e) => setFirstname(e.target.value)}/>
              </div>
              <div className="section">
                <label for="username">Lastname</label>
                <input type="text" id="lastName" onChange = {(e) => setLastname(e.target.value)}/>
              </div>
            </div>

            <label for="Email">Email</label>
            <input type="email" id="email" onChange = {(e) => setEmail(e.target.value)}/>

            <label for="username">Contact</label>
            <input type="number" id="mobileNumber" onChange = {(e) => setMobileNumber(parseInt(e.target.value))}/>

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
