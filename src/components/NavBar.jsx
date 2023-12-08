import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/sti_logo.png";
import { Login } from "./Login";
import { Link } from "react-router-dom";
export default function NavBar({
  setOpenMenu,
  openMenu,
  msalinstance,
  setUser,
  userAzure,
  setUserAzure,
  user,
  setAdminRole,
  adminRole,
  setLoggedIn,
  loggedIn,
  uuidv4,
  UserName,
  userName,
}) {
  const [openLogin, setOpenLogin] = useState(false);
  

  return (
    <div
      id="Nav"
      className="overflow-y-hidden h-[75px] w-full bg-[#3C91E6] flex items-center justify-between font-lato absolute top-0 left-0 z-0"
    >
      <div
        id="brand"
        className="font-bold flex items-center text-black sticky top-0 left-0 bg-[#3C91E6] box-content"
      >
        <Link to="/" className="flex items-center">
          <img className="h-20" src={logo} alt="" />
          <h1 className="text-[24px] mr-6">ADMECO</h1>
        </Link>

        {(adminRole || user) && (
          <button
            className="ml-4 p-2 text-black"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <AiOutlineMenu
              id="icon iconmenu"
              className={`text-[20px] hover:text-[#F9F9F9]`}
            />
          </button>
        )}
      </div>

      
      

      <div className="flex items-center gap-2 cursor-pointer mr-4">
        <div className="flex items-center gap-1 opacity-90 md:text-base text-[11px]">
          <h1>{UserName} </h1>
        </div>

        {!loggedIn && (
          <div
            onClick={() => {
              setOpenLogin(!openLogin);
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
          setLoggedIn={setLoggedIn}
          uuidv4={uuidv4}
          userName={userName}
        />
      </div>
    </div>
  );
}
