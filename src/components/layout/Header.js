import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux"


const Header = () => {
  const router = useRouter();
  const session = useSession();
  
  const { isAuthenticated, user } = useSelector(state => state.auth)

  return (
    <>
      <div className="header">
        <div
          className="logo"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src="/home.png" width={50} height={50}></Image>
          <span className="logo-name">Home-Easy</span>
        </div>
        <div className="nav">
          <ul>
            <li className="nav-items">
              <Link href="/ads">Houses</Link>
            </li>
            <li className="nav-items">
              <Link href="/maps">Map</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-items">
                  <Link href="/profile">{user?.firstName}</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-items">
                  <Link href="/auth/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
