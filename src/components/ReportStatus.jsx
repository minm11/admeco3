import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { BsCalendar2MinusFill } from "react-icons/bs";

import { AiOutlineSearch } from "react-icons/ai";
import supabase from "../supabaseClient";

export default function ReportStatus() {
  const [activities, setActivities] = useState([]);
  const [Imports, setImports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [anotherFilter, setAnotherFilter] = useState("");

  // Function to filter data based on searchQuery
  const filterData = (data) => {
    return data.filter(
      (item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        ) &&
        (!anotherFilter ||
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(anotherFilter.toLowerCase())
          ))
    );
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("StudentInformation")
        .select("*");
      if (error) throw error;

      const filteredData = filterData(data);
      setImports(filteredData);
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  // Update Imports state when searchQuery changes
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchData();
    }, 300); // Adjust the delay as needed (e.g., 300ms)

    return () => clearTimeout(delaySearch); // Cleanup on unmount or when searchQuery changes
  }, [searchQuery, anotherFilter]);

  //*Read account data
  async function activityData() {
    try {
      const { data, error } = await supabase.from("activity").select("*");
      if (error) throw error;

      // Sort activities by dateTime in descending order (latest to earliest)
      const sortedActivities = data.sort((a, b) => {
        return new Date(b.dateTime) - new Date(a.dateTime);
      });

      setActivities(sortedActivities);
      console.log("Success >_< ");
    } catch (error) {
      console.error("Error", error.message);
    }
  }

  //*Realtime Reading of Data
  useEffect(() => {
    activityData();
    const subscription = supabase
      .channel("room2")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activity" },
        () => {
          activityData();
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div
      id="main"
      className="pt-9 pb-28 px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%] "
    >
      <div
        id="headTitle"
        className="flex items-center justify-between flex-wrap "
      >
        <div id="container left ">
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
        <div >
        <div
            id="searchbarcontainer"
            className="bg-slate-300 rounded-r-full  flex justify-between  py-1 mt-5 "
          >
            <input
              id="searchbar"
              className="rounded-r-full  border-0 text-md outline-none w-72 mx-5 bg-slate-300"
              placeholder="Search..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="bg-yellow-400  rounded-r-full text-sm flex items-center p-2 h-9">
              <AiOutlineSearch id="icon" className="text-[20px]" />
            </div>
            
          </div>   
        </ div>
      </div>

      <div id="table data" className=" mt-[68px] ml-6 text-black ">
        <div id="order" className=" ">
          <div id="head" className="flex mb-7 ">
            <h1 className="text-2xl  font-semibold ">Activity</h1>
          </div>

          <div className="  border-collapse ">
            <thead>
              <tr className="border-b-[1px]  flex  gap-[270px]">
                <th className="pb-1 pl-8 text-sm text-left bottom-1 border-solid border-[#eee]">
                  UserName
                </th>
                
                <tr className="gap-16 flex">
                  
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    Prelim
                  </th>
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    Midterm
                  </th>                  
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    Pre-Finals
                  </th>
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    Finals
                  </th>
                </tr>
                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                  Status
                </th>
              </tr>
            </thead>
            {activities.map((activity) => (
              <ul className="mt-2 ">
                <li className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex gap-20">
                  <div className="flex items-center">
                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                    <h1 className="ml-4">{activity.user}</h1>
                  </div>

                  
                  <div className="gap-16 flex">
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    
                  </th>
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    
                  </th>                  
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    
                  </th>
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    
                  </th>
                </div>
                
                  
                  <h1>{activity.act}</h1>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
