import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { loginRequest } from "./auth";
import { SiMicrosoftoffice } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import AdminLogin from "./AdminPages/AdminLogin"

export default function Login({
  msalinstance,
  openLogin,
  setOpenLogin,
  setUser,
  setUserAzure,setAdminRole
}) {
  const [userData, setUserData] = useState();
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    async function run() {
      const { data: accounts } = await supabase.from("accounts").select();
      setUserData(accounts);
    }
    run();
  }, [openLogin]);

  var loginResponse;
  const loginAZURE = async () => {
    try {
      loginResponse = await msalinstance.loginPopup(loginRequest);
      await setUserAzure(loginResponse.account);
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
          <h1 className="font-bold text-[20px]">Login</h1>
          <button onClick={() => setOpenLogin(!openLogin)}>
            <IoClose />
          </button>
        </div>
        <div
          id="body"
          className=" bg-white h-[190px] w-[270px] flex items-center justify-center"
        >
          {isAdmin ? (
       <AdminLogin setOpenLogin={setOpenLogin} openLogin={openLogin} setAdminRole={setAdminRole} setUser={setUser}/>
          ) : (
            <button
              className="bg-[#ED4627] rounded-full w-60 items-center flex p-5 gap-2 justify-center "
              onClick={() => loginAZURE()}
            >
              <SiMicrosoftoffice className="text-[20px] text-white"/>
             <label className="font-semibold text-[15px] text-white"> Office 365 Login</label>
            </button>
          )}
        </div>
        <div
      
          id="footer"
          className=" hover:underline hover:text-black relative rounded-b-md select-none px-3 overflow-hidden flex justify-between items-center bg-[#3C91E6] "
        ><a   onClick={() => setAdmin(!isAdmin) } className=" p-2">Login as admin</a></div>
      </div>
    </div>
  );
}
