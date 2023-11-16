import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { loginRequest } from "./auth";
import { SiMicrosoftoffice } from "react-icons/si";
import { IoClose } from "react-icons/io5";

export default function Login({
  msalinstance,
  openLogin,
  setOpenLogin,
  setUser,
  setUserAzure,
}) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function run() {
      const { data: admin } = await supabase.from("admin").select();
      setUserData(admin);
    }
    run();
  }, [openLogin]);

  async function authen(user) {
    if (userData) {
      for (let index = 0; index < userData.length; index++) {
        if ((userData[index].adminEmail = user.username)) {
          setUser(userData);
          setUserAzure(loginResponse);
          // if (userData[index].adminName = null) {
          //   alert(loginResponse.name)
          //
          const { data, error } = await supabase
            .from("admin")
            .update({ adminName: loginResponse.account.name })
            .eq("id", 1)
            .select();
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
         bg-opacity-10 backdrop-blur-md flex font-lato w-full z-100 "
    >
      <div id="main2" className="shadow-[#0000009f] shadow-md  rounded-md  ">
        <div
          id="header"
          className=" relative rounded-t-lg  px-3 h-8 overflow-hidden flex justify-between items-center bg-[#3C91E6]"
        >
          <h1>Login</h1>
          <button onClick={() => setOpenLogin(!openLogin)}><IoClose /></button>
        </div>
        <div id="body"className=" bg-white h-32 ">
          
          <button className="bg-[#ED4627] rounded-full w-60 items-center flex" onClick={() => loginAZURE()}><SiMicrosoftoffice />Office 365 Login</button>
        </div>
        <div
          id="footer"
          className="  relative rounded-b-lg  px-3 pt- pb-3  overflow-hidden flex justify-between items-center bg-[#3C91E6] "
        ></div>
      </div>
    </div>
  );
}
