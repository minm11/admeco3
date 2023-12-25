import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
export default function ImportHistory({
 
}) {
  
  return (
    <div
      id="main"
      className="pt-9 pb-28 px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%]"
    >
      <div
        id="headTitle"
        className="flex items-center justify-between gap-16 flex-wrap"
      >
        <div id="container left ">
          <h1 className="text-4xl font-semibold mb-2 pt-5 text-black">
            Import History
          </h1>
          <div className="flex items-center justify-between mb-8 ">
            <Link to="/dashboardteacher" className="hover:text-[#3C91E6]">
              Home
            </Link>
            <BiChevronRight id="icon iconchevronRight" className="mx-2" />
            <Link to="" className="hover:text-[#3C91E6]">
              ImportHistory
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-slate-300 p-1 hover:p-2 duration-300 hover:shadow-md hover:shadow-black hover:mb-1">
        <div className="grid grid-cols-12 text-[12px] font-bold p-1 mt-10 mb-1 w-full">
          <div className="font-thin capitalize">STUDENT NUMBER</div>
          <div className="font-thin capitalize">LAST NAME</div>
          <div className="font-thin capitalize">FIRST NAME</div>
          <div className="font-thin capitalize">PROGRAM</div>
          <div className="font-thin capitalize">SECTION</div>
          <div className="font-thin capitalize">SUBJECT</div>
          <div className="font-thin capitalize">NO. OF MEETING</div>
          <div className="font-thin capitalize">NO. OF LATE</div>
          <div className="font-thin capitalize">NO. OF ABSENT</div>
          <div className="font-thin capitalize text-center">GRADE</div>
          <div className="font-thin capitalize">REASON</div>
          <div className="font-thin capitalize text-center">TERM</div>
        </div>
      </div>
    </div>
  );
}
