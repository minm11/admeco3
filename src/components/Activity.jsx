import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

import { BsCalendar2MinusFill } from "react-icons/bs";
export default function Activity() {
  return (
    <div id="main" className="  pt-9 pb-28 px-5 font-lato mt-7 max-h-screen  fixed w-[60%] ">
      <div
        id="headTitle"
        className="flex items-center justify-between  flex-wrap"
      >
        <div id="container left">
          <h1 className="text-4xl font-semibold mb-5 text-black">Activity</h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-[#3C91E6]">
              Home
            </Link>
            <BiChevronRight id="icon iconchevronRight" className="" />
            <Link to="/Activity" className="hover:text-[#3C91E6]">
              Activity
            </Link>
          </div>
        </div>
      </div>

      <div id="table data" className=" mt-[68px] ml-6 text-black ">
                <div id="order" className=" ">
            <div id="head" className="flex mb-7">
              <h1 className="text-2xl  font-semibold ">Activity</h1>
            </div>
            
            <div className="  border-collapse ">
              <thead>
                <tr className="border-b-[1px]  flex  gap-[200px]">
                  <th className="pb-1 pl-8 text-sm text-left bottom-1 border-solid border-[#eee]">
                    UserName
                  </th>
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    TimeClicked
                  </th>
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    Status
                  </th>
                </tr>
              </thead>
              <ul className="mt-2 ">
                <li className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex gap-20">
                  <div className="flex items-center">
                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                  <h1 className="ml-4">teacher name</h1>
                  </div>
                  
                  <h1>November 15, 2023 2:08 AM</h1>
                  <h1>imported a report</h1>
                </li>
                <li className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex gap-20">
                  <div className="flex items-center">
                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                  <h1 className="ml-4">teacher name</h1>
                  </div>
                  
                  <h1>November 15, 2023 2:08 AM</h1>
                  <h1>imported a report</h1>
                </li>
                <li className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex gap-20">
                  <div className="flex items-center">
                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                  <h1 className="ml-4">teacher name</h1>
                  </div>
                  
                  <h1>November 15, 2023 2:08 AM</h1>
                  <h1>imported a report</h1>
                </li>
                <li className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex gap-20">
                  <div className="flex items-center">
                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                  <h1 className="ml-4">teacher name</h1>
                  </div>
                  
                  <h1>November 15, 2023 2:08 AM</h1>
                  <h1>imported a report</h1>
                </li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
}
