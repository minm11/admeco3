
import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { loginRequest } from "./auth";
import { SiMicrosoftoffice } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import AdminLogin from "./AdminPages/AdminLogin";
import bg from "../assets/bg.png";


export default function Login({
    msalinstance,
    loginResponse,
    openLogin,
    setOpenLogin,
    setUser,
    setUserAzure,
    setLoggedIn,
    setAdminRole,
    uuidv4,
    userName
  }) {

   
    const fullScreenStyle = {
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1,
    };

  return (
    
     <img src={bg} alt="" style={fullScreenStyle} />
  )
};


