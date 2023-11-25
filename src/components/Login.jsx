import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { loginRequest } from "./auth";
import { SiMicrosoftoffice } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import AdminLogin from "./AdminPages/AdminLogin";

export default function Login({
  msalinstance,
  openLogin,
  setOpenLogin,
  setUser,
  setUserAzure,
  setAdminRole,
  uuidv4,
}) {
  const [userData, setUserData] = useState();
  const [isAdmin, setAdmin] = useState(false);

  var loginResponse;

  // Login Checker
  async function Auth(userAccount) {
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
        const { data: insertAccounts } = await supabase
          .from("accounts")
          .update({ name: info.name })
          .eq("email", info.username)
          .single();
      }
    }
    return;
  }

  const loginAZURE = async () => {
    try {
      loginResponse = await msalinstance.loginPopup(loginRequest);
      Auth(loginResponse.account);
      alert("logged in")
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
            <AdminLogin
              setOpenLogin={setOpenLogin}
              openLogin={openLogin}
              setAdminRole={setAdminRole}
              setUser={setUser}
            />
          ) : (
            <button
              className="bg-[#ED4627] rounded-full w-60 items-center flex p-5 gap-2 justify-center "
              onClick={() => loginAZURE()}
            >
              <SiMicrosoftoffice className="text-[20px] text-white" />
              <label className="font-semibold text-[15px] text-white">
                {" "}
                Office 365 Login
              </label>
            </button>
          )}
        </div>
        <div
          id="footer"
          className=" hover:underline hover:text-black relative rounded-b-md select-none px-3 overflow-hidden flex justify-between items-center bg-[#3C91E6] "
        >
          <a onClick={() => setAdmin(!isAdmin)} className=" p-2">
            Login as admin
          </a>
        </div>
      </div>
    </div>
  );
}
