import React, { useState, useEffect } from "react";
import { state_arr, city_arr } from "./../utils/options";
import { useNavigate } from "react-router-dom";
import { FiPhoneCall } from 'react-icons/fi';


const Home = () => {

  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(country, state, city);
  };

  return (
    <>
      <div className="home">
        <div className="landing-poster">
          <div className="text">
            <p className="title-1" id="a">
              Get rid of brokers now
            </p>
            <br />
            <p className="title-2">The solution for those of you who </p>
            <p className="title-2"> are looking for a comfortable </p>
            <p className="title-2"> place to live</p>
          </div>
          <div className="poster">
            <img src="images/landing-home.png"/>
          </div>
        </div>
        <div className="hiw">
          <h3>How it works</h3>
            <div className="section">
              <div className="line">
                <p className="line-head">Simple Listing Process</p>
                <p className="line-desc">As an owner you can list your property in a few minutes. Just fill out our super simple form. Your property will go live.</p>
              </div>
              <img src="images/search.jpg"/>
            </div>
            <div className="section">
              <img src="images/phonecall.jpg"/>
              <div className="line">
                <p className="line-head">Tenant Selects Property and Schedules an Appointment</p>
                <p className="line-desc">If a tenant likes your property they will request on your contact details. Both parties will receive contact information and then arrange for a visit.</p>
              </div>
            </div>
            <div className="section">
              <div className="line">
                <p className="line-head">Deal Closure</p>
                <p className="line-desc">Owner and tenant meet to close the deal directly. HomeEasy can help create a rental agreement and deliver it to your doorstep.</p>
              </div>
              <img src="images/shakeHands.jpg"/>
            </div>
        </div>
        <div className="find-post">
          <div className="find">
            <p className="l1">Find Property</p>
            <p classNmae="l2">Select from thousands of options, without brokerage</p>
            <a onClick={() => navigate('/ads')}>Find Now</a>
          </div>
          <div className="post">
            <p className="l1">List Your Property</p>
            <p className="l2">For Free Without any brokerage</p>
            <a onClick={() => navigate('/postad')}>Free Posting</a>
          </div>
        </div>
        <div className="call">
          <FiPhoneCall style={{color: 'black', fontSize: '20px', marginRight: '7px'}}/>
          <span>Give a missed call to XXX-XXX-XXXX to get help with your property listing</span>
        </div>
      </div>

    </>
  );
};

export default Home;
