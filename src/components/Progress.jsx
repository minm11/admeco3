import React from "react";
import { Link } from "react-router-dom";
import {BiChevronRight} from 'react-icons/bi'
import { createClient } from '@supabase/supabase-js'; 

export default function Progress(){


    return(
        <div id="main" className="pt-9 pb-28 px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%]">
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
                <div id="order" className=" ">
                    <h1 className="text-2xl mr-auto mb-8 font-semibold ">Progress</h1>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-[1px]">
                                <th className="pb-1 pl-10 text-sm text-left bottom-1 border-solid border-[#eee]">Student Name</th>
                                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">Term</th>
                                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">Date Progress</th>
                                
                            </tr>
                        </thead>
                        <tbody className="">
                           
                            {/* this is for showing the data in the progress
                            
                            {student.map(student) => } 
                            
                            <tr key={student.id} className=" px-10 hover:bg-[#eee]">
                         <td className="p-7">
                         <p className="pl-1">{student.name}</p>
                         </td>
                           <td>{student.term}</td>
                          <td>{student.dateProgress}</td>
                              <td>
                          <span className={`status ${student.status}`}>{student.status}</span>
                             </td>
                         </tr>
                         ))}
                            
                            */}



							<tr className=" px-10 hover:bg-[#eee]">
                                <td className="p-7  ">
									
                                    <p className="pl-1">Ron Jericho manzano</p>
								</td>
								<td>Midterm</td>
								<td>28-09-2023</td>
								
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