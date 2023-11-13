import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { loginRequest } from "./auth";
import { Link } from "react-router-dom";
import {
  BiChevronRight,
  BiFilter,
  BiErrorAlt,
  BiSolidGroup,
} from "react-icons/bi";
import { isVisible } from "@testing-library/user-event/dist/utils";

export default function Login({
  msalinstance,
  openLogin,
  setOpenLogin,
  setUser,
  setUserAzure,
}) {
  const [userData, setUserData] = useState()

  useEffect(() => {
    async function run() {
      const { data: admin } = await supabase.from("admin").select();
      setUserData(admin) 
    } run()
  }, [openLogin]);

  async function authen(user) {
    console.log(userData);
    if (userData) {
      for (let index = 0; index < userData.length; index++) {
        if (userData[index].adminEmail = user.username) {
          setUser(userData);
          setUserAzure(loginResponse);
          if (userData[index].adminName === null) {
            alert(loginResponse.name) 
            const { data, error } = await supabase
              .from("admin")
              .update({ adminName: user.name })
              .eq("adminEmail", userData[index].adminEmail)
              
              console.log(data)
          }
          
        }
      }
    }
  }

  var loginResponse;
  const loginAZURE = async () => {
    try {
      loginResponse = await msalinstance.loginPopup(loginRequest);
      authen(loginResponse.account);
    } catch (error) {
      console.error("Authentication error", error);
    }
  };

  if (!openLogin) return null;
  return (
    <div
      id="main"
      className="fixed inset-0 items-center justify-center place-content-center 
        bg-black bg-opacity-10 backdrop-blur-md flex font-lato w-full z-100"
    >
      <div className=" bg-white h-56 w-80 rounded-md shadow-[#0000009f] shadow-md ">
        <button onClick={() => loginAZURE()}>login with loginAZURE</button>
        <button onClick={() => setOpenLogin(!openLogin)}>x</button>
      </div>
    </div>
  );
}
