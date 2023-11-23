import React from "react";
import { Link } from "react-router-dom";
import {BiChevronRight} from 'react-icons/bi' 

import { BsCalendar2MinusFill } from "react-icons/bs";
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
            
            <div id="table data" className=" mt-[68px] ml-6 text-black">
                <div id="order" className="">
                    <h1 className="text-2xl mr-auto mb-8 font-semibold ">Activity</h1>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-[1px]">
                                <th className="pb-1 pl-10 text-sm text-left bottom-1 border-solid border-[#eee]">Student Name</th>
                                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">Date Progress</th>
                                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="mt-2">
                            <tr className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex  ">
                                <td className="flex items-center  ">
                                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                                    <p className="ml-4">teacher name</p>
								</td>
								<td>November 15, 2023 2:08 AM</td>
								<td>imported a report</td>
							</tr>
                            <tr className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex  ">
                                <td className="flex items-center  ">
                                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                                    <p className="ml-4">teacher name</p>
								</td>
								<td>November 15, 2023 2:08 AM</td>
								<td>imported a report</td>
							</tr>
                            <tr className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex  ">
                                <td className="flex items-center  ">
                                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                                    <p className="ml-4">teacher name</p>
								</td>
								<td>November 15, 2023 2:08 AM</td>
								<td>imported a report</td>
							</tr>
                            <tr className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex  ">
                                <td className="flex items-center  ">
                                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                                    <p className="ml-4">teacher name</p>
								</td>
								<td>November 15, 2023 2:08 AM</td>
								<td>imported a report</td>
							</tr>
						</tbody>
                    </table>
                </div>
            </div>
                

            
        </div>

    );
}