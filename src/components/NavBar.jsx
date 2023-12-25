import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/newsti_logo.png";
import { Login } from "./Login";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import moment from "moment/moment";
export default function NavBar({
  setOpenMenu,
  openMenu,
  msalinstance,
  setUser,
  userAzure,
  setUserAzure,
  user,
  setAdminRole,
  setGuidanceRole,
  setTeacherRole,
  adminRole,
  setLoggedIn,
  loggedIn,
  uuidv4,
  UserName,
  userName,
}) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openprofile, setOpenProfile] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
    setLogoVisible(!openMenu); // Hide logo when menu is clicked
  };

  const handleLoginClick = () => {
    setOpenLogin(!openLogin);
    setLogoVisible(false); // Hide logo after login
  };

  return (
    <div
      id="Nav"
      className="overflow-y-hidden h-[75px] w-full bg-[#3C91E6] flex items-center justify-between font-lato absolute top-0 left-0 z-0"
    >
      <div
        id="brand"
        className="font-bold flex items-center text-black sticky top-0 left-0 bg-[#3C91E6] box-content "
      >
        {(adminRole || user) && (
          <button
            className="ml-4 p-2 text-black"
            onClick={() => {
              setOpenMenu(!openMenu);
              handleMenuClick();
            }}
          >
            <AiOutlineMenu
              id="icon iconmenu"
              className={`text-[40px] hover:text-[#F9F9F9]`}
            />
          </button>
        )}
      </div>
      <div className="flex items-center">
        <img style={{ width: "80px", height: "50px" }} src={logo} alt="" />
        <h1 className="text-center ml-4">ACADEMIC DELINQUENCY STATUS REPORT</h1>
      </div>

      <div className="flex items-center gap-2 cursor-pointer mr-4">
        <div className="flex items-center gap-1 opacity-90 md:text-base text-[11px]">
          <h1>{UserName} </h1>
        </div>

        {!loggedIn && (
          <div
            onClick={() => {
              handleLoginClick();
            }}
            className=" h-8 w-14 rounded-full text-center pt-1 border-solid border-black text-sm hover:ring-2 hover:ring-white bg-green-400"
          >
            Login
          </div>
        )}
        <Login
          msalinstance={msalinstance}
          setOpenLogin={setOpenLogin}
          openLogin={openLogin}
          setUser={setUser}
          setUserAzure={setUserAzure}
          setAdminRole={setAdminRole}
          setGuidanceRole={setGuidanceRole}
          setTeacherRole={setTeacherRole}
          setLoggedIn={setLoggedIn}
          uuidv4={uuidv4}
          userName={userName}
        />
      </div>
    </div>
  );
}
