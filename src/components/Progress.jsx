import React from "react";
import { Link } from "react-router-dom";
import {BiChevronRight} from 'react-icons/bi' 

export default function Progress(){
    return(
        <div id="main" className=" pt-9 pb-28 px-5 font-lato mt-7 max-h-full overflow-y-auto   w-full">
            <div id="headTitle" className=" items-center gap-16 ">
                <div id="container left">
                    <h1 className="text-4xl font-semibold mb-5 text-black">Progress</h1>
                    <div className="flex items-center gap-4">
                        <Link to='/' className="hover:text-[#3C91E6]">Home</Link>
                        <BiChevronRight id="icon iconchevronRight" className=""/>
                        <Link to='/Progress' className="hover:text-[#3C91E6]">Progress</Link>
                    </div>
                </div>
            </div>
            
            
            <div id="table data" className=" mt-[68px] ml-6 text-black">
                <div id="order" className=" basis-[75%]">
                    <h1 className="text-2xl mr-auto mb-8 font-semibold ">Progress</h1>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-[1px]">
                                <th className="pb-1 pl-10 text-sm text-left bottom-1 border-solid border-[#eee]">Student Name</th>
                                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">Term</th>
                                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">Date Progress</th>
                                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="">
							<tr className=" px-10 hover:bg-[#eee]">
                                <td className="p-7  ">
									
                                    <p className="pl-1">Ron Jericho manzano</p>
								</td>
								<td>Midterm</td>
								<td>28-09-2023</td>
								<td><span className="status Passed">Passed</span></td>
							</tr>
							<tr className="h-24 hover:bg-[#eee]">
                                <td className="p-7">
									
									<p className="pl-1">Vincent Baliuag</p>
								</td>
                                <td>Prelim</td>
								<td>28-09-2023</td>
								<td><span className="status Failure">Failure</span></td>
							</tr>
							<tr className=" hover:bg-[#eee]">
                                <td className=" p-7">
									<p className="pl-1">Alto Alexander</p>
								</td>
                                <td>Finals</td>
								<td>28-09-2023</td>
								<td><span className="status Improving">Improving</span></td>
							</tr>
							<tr className="  hover:bg-[#eee]">
                                <td className="p-7">
									<p className="pl-1">Ceejay Fajardo</p>
								</td>
                                <td>Midterm</td>
								<td>28-09-2023</td>
								<td><span className="status Failure">Failure</span></td>
							</tr>
							
						</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}