import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Router } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import { client } from '../client';
import logo from '../assets/logo.png';
import Pins from './Pins';
import { userQuery } from '../utils/data';


const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, []);


  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
        <Link to="/">
          <img src={logo} alt="logo" className="w-40" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className="w-28" />
        </Link>
        {toggleSidebar && (
          <div className="fixed bg-white w-4/5 h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className=''></div>
          </div>

        )}
          </div>
    </div>
      )
}

export default Home