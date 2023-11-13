import React from "react";
import { Link } from "react-router-dom";
import {BiChevronRight, BiFilter, BiErrorAlt, BiSolidGroup} from 'react-icons/bi' 
import {BsCalendar2MinusFill} from 'react-icons/bs'

export default function Activity(){
    return(     
        <div id="main" className="  pt-9 pb-28 px-5 font-lato mt-7 max-h-full overflow-y-auto  w-full">
            <div id="headTitle" className="flex items-center justify-between gap-16 flex-wrap">
                <div id="container left">
                    <h1 className="text-4xl font-semibold mb-5 text-black">Activity</h1>
                    <div className="flex items-center gap-4">
                        <Link to='/' className="hover:text-[#3C91E6]">Home</Link>
                        <BiChevronRight id="icon iconchevronRight" className=""/>
                        <Link to='/Activity' className="hover:text-[#3C91E6]">Activity</Link>
                    </div>
                </div>
            </div>
            
            <div className="flex mt-[60px] ml-6 text-black">
               <div id="Activity" className=" basis-[75%]  ">
                    <div id="head" className="flex mb-7">
                        <h1 className="text-2xl  font-semibold ">Activity</h1>
                    </div>
                    <ul className="">
                        <li className="border-x-2  mb-5 bg-[#eee] rounded-lg px-14 py-6  flex items-center">
                        <BsCalendar2MinusFill className="text-[#ff0000]"/>
                           <h1 className="ml-4">tite</h1> 
                        </li>
                        <li className="border-x-2  mb-5 bg-[#eee] rounded-lg px-14 py-6  flex items-center">
                           <BsCalendar2MinusFill className="text-[#00aaff]"/>
                           <h1 className="ml-4">tite</h1> 
                        </li>
                        <li className="border-x-2  mb-5 bg-[#eee] rounded-lg px-14 py-6  flex items-center">
                        <BsCalendar2MinusFill className="text-[#ff0000]"/>
                           <h1 className="ml-4">tite</h1> 
                        </li>
                        <li className="border-x-2  mb-5 bg-[#eee] rounded-lg px-14 py-6  flex items-center">
                           <BsCalendar2MinusFill className="text-[#00aaff]"/>
                           <h1 className="ml-4">tite</h1> 
                        </li>
                        <li className="border-x-2  mb-5 bg-[#eee] rounded-lg px-14 py-6  flex items-center">
                        <BsCalendar2MinusFill className="text-[#ff0000]"/>
                           <h1 className="ml-4">tite</h1> 
                        </li>
                        <li className="border-x-2  mb-5 bg-[#eee] rounded-lg px-14 py-6  flex items-center">
                           <BsCalendar2MinusFill className="text-[#00aaff]"/>
                           <h1 className="ml-4">tite</h1> 
                        </li>
                    </ul>
                </div> 
            </div>
                

            
        </div>

    );
}