import { Link } from "react-router-dom";
import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiClipboardTextBold, PiReadCvLogoFill } from "react-icons/pi";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaBarsProgress, FaFileImport } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import { LuDatabaseBackup } from "react-icons/lu";
import { MdOutlineAnnouncement } from "react-icons/md";
import { FaRegListAlt ,FaHistory } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";

import supabase from "../supabaseClient";
import moment from "moment/moment";

export default function SideBar({ user, UserName, adminRole, teacherRole, guidanceRole }) {
  console.log(user);

  const isAdmin = user === "admin";
  const isTeacher = user === "teacher";
  const isGuidance = user === "guidance";

  const logoutAzure = async () => {
    try {
      window.location.reload();
      window.localStorage.clear();
      alert("logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      id="sidebar"
      className="top-0 left-0S -z-10 h-full mt-16 pt-1 font-lato sidebar-container"
      style={{
        position: "fixed", // Fix the position
        top: 11, // Position it at the top
        left: 0, // Position it at the left
        width: "12%", // Make it full width
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <div className="side">
        <ul id="sideMenuTop" className="w-100% mt-[30px] side-menu">
          {(adminRole || user === "admin") && (
            <>
              <Link to="/" className="">
                <li
                  id="active"
                  className="h-9  bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] flex rounded-full mb-3 hover:text-[#3C91E6] hover:bg-black
              -700"
                >
                  <LuLayoutDashboard id="icon dashboard" className="" />
                  <h1 className="ml-4"> Dashboard</h1>
                </li>
              </Link>

              
            </>
          )}

          {(isTeacher || teacherRole) && (
            <>
              <Link to="/dashboardteacher" className="">
                <li
                  id="active"
                  className="h-9  bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] flex rounded-full mb-3 hover:text-[#3C91E6] hover:bg-black
              -700"
                >
                  <LuLayoutDashboard id="icon dashboard" className="" />
                  <h1 className="ml-4"> Dashboard</h1>
                </li>
              </Link>
            </>
          )}

          { (isGuidance || guidanceRole) && (
            <>
              <Link to="/" className="">
                <li
                  id="active"
                  className="h-9  bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] flex rounded-full mb-3 hover:text-[#3C91E6] hover:bg-black
              -700"
                >
                  <LuLayoutDashboard id="icon dashboard" className="" />
                  <h1 className="ml-4"> Dashboard</h1>
                </li>
              </Link>
            </>
          )}

          {(isGuidance || guidanceRole) && (
            <>
              <Link to="/Progress" className="">
                <li
                  id="active"
                  className="h-9 bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] rounded-full  mb-3 flex hover:text-[#3C91E6] hover:bg-black"
                >
                  <FaBarsProgress id="icon Progress" className="" />
                  <h1 className="ml-4"> Progress</h1>
                </li>
              </Link>
              <Link to="/ReportStatus" className="">
                <li
                  id="active"
                  className="h-9  bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] flex rounded-full mb-3 hover:text-[#3C91E6] hover:bg-black
              -700"
                >
                  <PiClipboardTextBold id="icon Report Status" className="" />
                  <h1 className="ml-4"> Report Status</h1>
                </li>
              </Link>
              </>
          )}

          

          {(isTeacher || teacherRole) && (
            <>
              <Link to="/createreport" className=" ">
                <li
                  id="active"
                  className="h-9 bg-[#F9F9F9]  items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6] hover:bg-black"
                >
                  <SiMicrosoftexcel id="icon createreport" className="" />
                  <h1 className="ml-4"> Create Report </h1>
                </li>
              </Link>
            </>
          )}
             {(isTeacher || teacherRole) && (
            <>
              <Link to="/importhistory" className="">
                <li
                  id="active"
                  className="h-9  bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] flex rounded-full mb-3 hover:text-[#3C91E6] hover:bg-black
              -700"
                >
                  <FaHistory  id="icon dashboard" className="" />
                  <h1 className="ml-4">Recent Report</h1>
                </li>
              </Link>

         
            </>
          )}

          {(isGuidance || guidanceRole) && (
            <>
              <Link to="/searchstudent" className=" ">
                <li
                  id="active"
                  className="h-9 bg-[#F9F9F9]  items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6] hover:bg-black"
                >
                  <FaSearch id="icon Search Student" className="" />
                  <h1 className="ml-4"> Search Student </h1>
                </li>
              </Link>
              <Link to="/setdeadline" className=" ">
                <li
                  id="active"
                  className="h-9 bg-[#F9F9F9]  items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6] hover:bg-black"
                >
                  <MdOutlineAnnouncement id="icon deadline" className="" />
                  <h1 className="ml-4">Create Announcement</h1>
                </li>
              </Link>
              <Link to="/listimportfile" className=" ">
                <li
                  id="active"
                  className="h-9 bg-[#F9F9F9]  items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6] hover:bg-black"
                >
                  <FaRegListAlt id="icon deadline" className="" />
                  <h1 className="ml-4"> View Report</h1>
                </li>
              </Link>
            </>
          )}

          {(isTeacher || teacherRole) && (
            <Link to="/Restore" className=" ">
              <li
                id="active"
                className="h-9 bg-[#F9F9F9]  items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6] hover:bg-black"
              >
                <LuDatabaseBackup id="icon Import" className="" />
                <h1 className="ml-4"> Restore</h1>
              </li>
            </Link>
          )}

          {(adminRole || isAdmin) && (
            <>
              {/* role ng ni admin */}

              <Link to="/activity" className="">
                <li
                  id="active"
                  className="h-9 bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6] hover:bg-black"
                >
                  <PiClipboardTextBold id="icon Activity" className="" />
                  <h1 className="ml-4"> Activity</h1>
                </li>
              </Link>
              <Link to="/userrole" className="">
                <li
                  id="userrole"
                  className="h-9 bg-[#F9F9F9] items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6] hover:bg-black"
                >
                  <PiClipboardTextBold id="icon userrole" className="" />
                  <h1 className="ml-4"> user role creation</h1>
                </li>
              </Link>
            </>
          )}

          {/* logout */}
          <li
            onClick={() => {
              logoutAzure();
            }}
            id="logout"
            className="h-9 bg-[#ff3e3e] items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6] hover:bg-black"
          >
            <CgLogOut id="icon logout" className="" />
            <h1 className="ml-4"> logout</h1>
          </li>
        </ul>
      </div>
    </div>
  );
}
