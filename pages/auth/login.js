import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { clearErrors, login } from '../../actions/userActions'
import { useSession } from "next-auth/react";
import { signIn, signOut } from 'next-auth/react'

const Login = () => {
    // const session = useSession();
    // console.log(session)
  
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { isAuthenticated, error, user } = useSelector(state => state.auth)

    useEffect(() => {
      if(isAuthenticated){
        // toast(`Hello ${user} !`)
        console.log(user)
        router.push("/");
      }
      if(error){
        toast.error(error);
        document.getElementById('email').classList.add('red-border');
        document.getElementById('password').classList.add('red-border');
        dispatch(clearErrors())
      } 
    }, [dispatch, isAuthenticated, error, router, user])

    const submitHandler = async (e) => {
        e.preventDefault();
        const user = {email, password}
        dispatch(login(user));
        router.push({ pathname: '/' })
    }

  return (
    <>
      <div className="login">
        <div className="left">
          <Image src="/home.png" alt="" width={500} height={500} />
        </div>
        <div className="right">
          <form className="form" onSubmit={submitHandler}>
            <h3>Login Here</h3>

            <label for="email">Email Id</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>

            <label for="password">Password</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>

            <button type="submit">Log In</button>
            <div className="social">
              <div className="google">
                <i className="fab fa-google"></i> Google
              </div>
              <div className="signup">
                <i className="fab fa-facebook"></i> <Link href="/auth/register">Sign Up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
