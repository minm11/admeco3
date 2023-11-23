import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/sti_logo.png";
import Login from "./Login";  

export default function NavBar({
  setOpenMenu,
  openMenu,
  msalinstance,
  setUser,
  userAzure,
  setUserAzure,
  user,
}) {
  const [openLogin, setOpenLogin] = useState(false);
  console.log(user);
  return (
    <div
      id="Nav"
      className="overflow-y-hidden h-[75px] w-full bg-[#3C91E6] flex items-center justify-between font-lato absolute top-0 left-0 z-0"
    >
      <div
        id="brand"
        className="font-bold flex items-center text-black sticky top-0 left-0 bg-[#3C91E6] box-content"
      >
        <img className="h-20 " src={logo} alt="" />
        <h1 className="text-[24px] mr-6">ADMECO</h1>

        
        <button onClick={() => setOpenMenu(!openMenu)}>
          <AiOutlineMenu
            id="icon iconmenu"
            className={`text-[20px] hover:text-[#F9F9F9] ${(userAzure) != null ? '': 'hidden'}`}
          />
        </button>
      </div>

      {/* <div className="flex">
        <div
          id="searchbarcontainer"
          className="bg-white rounded-l-full flex justify-between h-9"
        >
          <input
            id="searchbar"
            className="rounded-l-full border-0 text-sm outline-none w-96 mx-5"
            placeholder="Search..."
            type="text"
          />
        </div>
        <div className="bg-yellow-400  rounded-r-full text-sm flex items-center p-2 h-9">
          <AiOutlineSearch id="icon" className="text-[20px]" />
        </div>
      </div> */}

      
      <div className="flex items-center gap-2 cursor-pointer mr-4">
        <div className="flex items-center gap-1 opacity-90 md:text-base text-[11px]">
          <h1>ex name</h1>
        </div>
        <div
          onClick={() => setOpenLogin(!openLogin)}
          className="md:h-10 md:w-10 h-8 w-8 rounded-full text-sm hover:ring-2 hover:ring-white "
          
        >
          <Login
            msalinstance={msalinstance}
            setOpenLogin={setOpenLogin}
            openLogin={openLogin}
            setUser={setUser}
            setUserAzure={setUserAzure}
          />
        </div>
      </div>
    </div>
  );
}
