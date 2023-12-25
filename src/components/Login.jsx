import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { loginRequest } from "./auth";
import { SiMicrosoftoffice } from "react-icons/si";
import AdminLogin from "./AdminPages/AdminLogin";
import { useNavigate } from "react-router-dom";

export function Login({
  msalinstance,
  loginResponse,
  openLogin,
  setOpenLogin,
  setUser,
  setUserAzure,
  setLoggedIn,
  setAdminRole,
  setTeacherRole,
  setGuidanceRole,
  uuidv4,
  userName
}) {
  const [userData, setUserData] = useState();
  const [isOtherUser, setOtherUser] = useState(false);
  const nav = useNavigate()
  // Login Checker
  async function Auth(userAccount) {
    window.localStorage.setItem("accountID", await userAccount.homeAccountId  );
    const { data: fetchAccount } = await supabase.from("accounts").select();
    for (let index = 0; index < fetchAccount.length; index++) {
      if (fetchAccount[index].email === userAccount.username) {
        await supabase
          .from("accounts")
          .update({ accessToken: uuidv4 })
          .eq("email", userAccount.username)
          .single();
        window.localStorage.setItem("susi", uuidv4);
        setUserAzure(loginResponse.account);
        setUser(fetchAccount[index].role);
        nameChecker(loginResponse.account);
        setLoggedIn(true) 
        userName();
        setOpenLogin(false);
        return;
      }
    }
    alert("Not Registered");
  }

  // Check if user has already set the name in database
  async function nameChecker(info) {
    const { data: accounts } = await supabase.from("accounts").select();
    for (let index = 0; index < accounts.length; index++) {
      if (accounts[index].email === info.username) {
        const { data: insertaccounts } = await supabase
          .from("accounts")
          .update({ name: info.name })
          .eq("email", info.username)
          .single();
      }
    }
    return;
  }

  //read username

  const loginAZURE = async () => {
    try {
      loginResponse = await msalinstance.loginPopup(loginRequest);
      Auth(loginResponse.account);
      nav('dashboardblanks')
      alert("logged in");
      
    } catch (error) {
     
      alert("Authentication failed. Please try again.");
    }
  };
  
  if (!openLogin) return null;

  return (
    <div
      id="main"
      className="fixed inset-0 items-center justify-center place-content-center 
         bg-opacity-10 backdrop-blur-md flex font-lato w-full z-100 "
    >
      <div
        id="main2"
        className="shadow-[#0000009f] shadow-md  rounded-md bg-white w [300px] "
      >
        <div
          id="header"
          className=" text-white font-bold text-2x1  relative rounded-t-lg  px-3 h-8 overflow-hidden flex justify-between items-center bg-[#3C91E6]"
        >
          
          <h1 className="font-bold text-[20px]">Login</h1>
          <button onClick={() => setOpenLogin(!openLogin)}>
         
          </button>
        </div>

        <div
          id="body"
          className=" bg-white h-[190px] w-[270px] flex items-center justify-center "
        >
          {isOtherUser ? (
            <AdminLogin
              setOpenLogin={setOpenLogin}
              openLogin={openLogin}
              setAdminRole={setAdminRole}
              setTeacherRole={setTeacherRole}
              setGuidanceRole={setGuidanceRole}
              setUser={setUser}
              setLoggedIn={setLoggedIn}
            />
          ) : (
            <button
              className="bg-[#ED4627] rounded-full w-60 items-center flex p-2 gap-2 justify-center "
              onClick={() => loginAZURE()}
            >
              <SiMicrosoftoffice className="text-[25px] text-white" />
              <label className="font-semibold text-[25px] text-white">
                <span className="font-semibold text-lg text-white hover:text-black ">
                  365 Login
                </span>
              </label>
            </button>
          )}
        </div>
        <div
          id="footer"
          className=" hover:text-black  text-white relative rounded-b-md select-none px-3 overflow-hidden flex justify-center items-center bg-[#3C91E6] "
        >
          <a onClick={() => setOtherUser(!isOtherUser)} className=" p-2 cursor-pointer">
            {isOtherUser ? "Login with Office 365" : "Login as User"}
          </a>
        </div>
      </div>
    </div>
  );
}
