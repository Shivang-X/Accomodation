import "@/src/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "../src/store";
import { loadUser } from "@/src/actions/userActions";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { SessionProvider } from "next-auth/react";
// import { Auth } from "@/components/Auth.js"

export default function App({ Component, pageProps }) {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Header/>
      {/* <Auth> */}
      <Component {...pageProps} />
      {/* </Auth> */}
      <Footer/>
      <ToastContainer />
    </Provider>
    </SessionProvider>
  );
}
