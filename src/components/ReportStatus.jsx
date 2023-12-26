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

  // Function to filter data based on searchQuery
  const filterData = (data) => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("activity").select("*");
      if (error) throw error;

      const filteredData = filterData(data);
      setActivities(filteredData); // Change this line to setActivities instead of setImports
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
  }, [searchQuery]);

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
  }, [CheckSign]);

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
          <h1 className="text-4xl font-semibold mb-5 text-black">
            Report Status
          </h1>
          <div className="flex items-center gap-4">
            <Link to="" className="hover:text-[#3C91E6]">
              Home
            </Link>
            <BiChevronRight id="icon iconchevronRight" className="" />
            <Link to="" className="hover:text-[#3C91E6]">
              Report Status
            </Link>
          </div>
        </div>
        <div>
          <div
            id="searchbarcontainer"
            className="bg-slate-300 flex justify-between   mt-5 "
          >
            <input
              id="searchbar"
              className="  border-0 text-md outline-none w-72 mx-5 bg-slate-300"
              placeholder="Search..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="bg-yellow-400   text-sm flex items-center p-2 h-9">
              <AiOutlineSearch id="icon" className="text-[20px]" />
            </div>
          </div>
        </div>
      </div>

      <div id="table data" className=" mt-[68px] ml-6 text-black ">
        <div id="order" className=" ">
          <div id="head" className="flex mb-7 ">
            <h1 className="text-2xl  font-semibold ">Report Status</h1>
          </div>

          <div className="  border-collapse ">
            <thead>
              <tr className="border-b-[1px]  flex  gap-[270px]">
                <th className="pb-1 pl-8 text-sm text-left bottom-1 border-solid border-[#eee]">
                  UserName
                </th>

                <tr className="gap-27 flex">
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                    Status Term
                  </th>
                  <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee] px-52">
                    Status Date
                  </th>
                </tr>
              </tr>
            </thead>
            {activities.map((activity) => (
              <ul className="mt-2" key={activity.id}>
                <li className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex gap-32">
                  <div className="flex items-center">
                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                    <h1 className="ml-4">{activity.user}</h1>
                  </div>

                  {/* Check sign logic */}
                  <div className="flex  items-center">
                    {activity.term &&
                      activity.term.toLowerCase().includes("prelim") && (
                        <CheckSign condition={true} label="Prelim" />
                      )}
                    {activity.term &&
                      activity.term.toLowerCase().includes("midterm") && (
                        <CheckSign condition={true} label="Midterm" />
                      )}
                    {activity.term &&
                      activity.term.toLowerCase().includes("pre-finals") && (
                        <CheckSign condition={true} label="Pre-Finals" />
                      )}
                    {activity.term &&
                      activity.term.toLowerCase().includes("finals") && (
                        <CheckSign condition={true} label="Finals" />
                      )}
                  </div>

                  <h1 className="ml-4">{activity.dateTime}</h1>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CheckSign = ({ condition, label }) => {
  return (
    <div className="flex items-center">
      {condition ? (
        <div className="text-green-500">✅</div>
      ) : (
        <div className="text-red-500">❌</div>
      )}
      <span className="ml-2">{label}</span>
    </div>
  );
};
