import { Link } from "react-router-dom";
import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiClipboardTextBold, PiReadCvLogoFill } from "react-icons/pi";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaBarsProgress, FaFileImport } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";

export default function SideBar({
  user,
  loginResponse,
  msalinstance,
  adminRole,
}) {
  console.log(user + "ilibin");
  const [isOpen, setIsOpen] = useState(false);

  const logoutAzure = async () => {
    try {
      window.location.reload();
      window.localStorage.clear();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      id="sidebar"
      className="top-0 left-0S bg-[#EEEEEE] -z-10 h-full mt-16 pt-1 font-lato"
    >
      <div className="side">
        <ul id="sideMenuTop" className="w-100% mt-[51px]">
          <Link to="/" className="">
            <li
              id="active"
              className="h-9 bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] flex rounded-full mb-3 hover:text-[#3C91E6]"
            >
              <LuLayoutDashboard id="icon dashboard" className="" />
              <h1 className="ml-4"> Dashboard</h1>
            </li>
          </Link>

          {(user === "guidance" || user === "admin" || adminRole) && (
            <Link to="/Progress" className="">
              <li
                id="active"
                className="h-9 bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] rounded-full  mb-3 flex hover:text-[#3C91E6]"
              >
                <FaBarsProgress id="icon Progress" className="" />
                <h1 className="ml-4"> Progress</h1>
              </li>
            </Link>
          )}

          <Link to="/Import" className=" ">
            <li
              id="active"
              className="h-9 bg-[#F9F9F9]  items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6]"
            >
              <FaFileImport id="icon Import" className="" />
              <h1 className="ml-4"> import</h1>
            </li>
          </Link>

          {(adminRole || user === "admin") && (
            <button
              id="active"
              className="h-9 bg-[#F9F9F9] items-center  rounded-full w-[97%] mx-2 mb-3 flex hover:text-[#3C91E6]"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <PiReadCvLogoFill id="icon Logs" className="ml-4" />
              <h1 className="ml-4">Logs</h1>
              {!isOpen ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </button>
          )}

          {isOpen && (
            <>
              {/* role ng ni admin */}
              <Link to="/activity" className="">
                <li
                  id="active"
                  className="h-9 bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6]"
                >
                  <PiClipboardTextBold id="icon Activity" className="" />
                  <h1 className="ml-4"> Activity</h1>
                </li>
              </Link>
              <Link to="/userrole" className="">
                <li
                  id="userrole"
                  className="h-9 bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6]"
                >
                  <PiClipboardTextBold id="icon userrole" className="" />
                  <h1 className="ml-4"> user role creation</h1>
                </li>
              </Link>
            </>
          )}

          {/* logout */}
          <li
            onClick={() => logoutAzure()}
            id="logout"
            className="h-9 bg-[#ff3e3e] items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6]"
          >
            <CgLogOut id="icon logout" className="" />
            <h1 className="ml-4"> logout</h1>
          </li>
        </ul>
      </div>
    </div>
  );
}
