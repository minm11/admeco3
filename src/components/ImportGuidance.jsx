import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import * as XLSX from "xlsx";
import supabase from "../supabaseClient";
import moment from "moment/moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { v4 as uuidv4 } from "uuid";
export default function Import(UserName, handleButtonClick) {
  const [Imports, setImports] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  

 

  //*Read account data
  async function importData() {
    const { data, error } = await supabase
      .from("StudentInformation")
      .select("*");
    try {
      if (error) throw error;
      else {
        setImports(data);
        console.log("Success >_< ");
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  }

  //*Realtime Reading of Data
  useEffect(() => {
    importData();
    supabase
      .channel("room3")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "StudentInformation" },
        () => {
          importData();
        }
      )
      .subscribe();
  }, []);

  // DESIGN
  return (
    <div
      id="main"
      className="  px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%]"
    >
      <div
        id="headTitle"
        className="flex items-center justify-between gap-16 flex-wrap"
      >
        <div id="container left ">
          <h1 className="text-4xl font-semibold mb-2 pt-5 text-black">
            Imports
          </h1>
          <div className="flex items-center justify-between mb-8 ">
            <Link to="/" className="hover:text-[#3C91E6]">
              Home
            </Link>
            <BiChevronRight id="icon iconchevronRight" className="mx-2" />
            <Link to="/Import" className="hover:text-[#3C91E6]">
              Import
            </Link>
          </div>
        </div>

        {/* searchbar */}
        <div className="flex">
          <div
            id="searchbarcontainer"
            className="bg-slate-300 rounded-l-full flex justify-between h-9"
          >
            <input
              id="searchbar"
              className="rounded-l-full border-0 text-sm outline-none w-96 mx-5 bg-slate-300"
              placeholder="Search..."
              type="text"
            />
          </div>
          <div className="bg-yellow-400  rounded-r-full text-sm flex items-center p-2 h-9">
            <AiOutlineSearch id="icon" className="text-[20px]" />
          </div>
        </div>

        {/* duedate */}
        <div>
          <button
            id="container right"
            className="h-9 bg-[#F9F9F9] border-2 items-center ml-2 p-3 mr-[2px] rounded-full mb-3 flex hover:text-[#3C91E6]"
            onclick={() => setIsOpen((prev) => !prev)}
          >
            <h1 className=" text-black">set Due Date</h1>
          </button>
          <input type="date"></input>
        </div>
      </div>

      <div id="view data">
        <div className="table-container overflow-y-auto">
          <div className="table responsive">
            <div className="  w-full max-h-[550px]  overflow-auto bg-slate-400 p-2 rounded-md shadow-md">
              <table className="w-full table-fixed text-[12px]  ">
                <thead>
                  <tr className="bg-slate-300">
                    <th className="w-[10%] pr-4 border  ">STUDENT NUMBER</th>
                    <th className="w-[10%] pr-1 border ">NAME</th>
                    <th className="w-[10%] pr-1 border ">PROGRAM</th>
                    <th className="w-[10%] pr-1 border ">SUBJECT</th>
                    <th className="w-[10%] pr-1 border ">SECTION</th>
                    <th className="w-[5%]  border ">NO. OF MEETINGS</th>
                    <th className="w-[5%]  border ">NO. OF DAYS LATE</th>
                    <th className="w-[5%]  border ">NO. OF DAYS ABSENT</th>
                    <th className="w-[5%]  border ">GRADE</th>
                    <th className="w-[10%]  border ">OTHER CONCERNS</th>
                    <th className="w-[10%] p-4 border ">TERM</th>
                  </tr>
                </thead>
                <tbody>
                  {Imports.map((Imports) => (
                    <tr className="bg-slate-200">
                      <td className="w-[10%] p-12">{Imports.studentNumber}</td>
                      <td className="w-[10%] p-10 ">{Imports.name}</td>
                      <td className="w-[10%] p-12 ">{Imports.program}</td>
                      <td className="w-[10%] p-10 ">{Imports.subject}</td>
                      <td className="w-[10%] p-12 ">{Imports.section}</td>
                      <td className="w-[5%] p-8 ">{Imports.noMeeting}</td>
                      <td className="w-[5%] p-8 ">{Imports.noLate}</td>
                      <td className="w-[5%] p-8 ">{Imports.noAbsent}</td>
                      <td className="w-[5%] p-7 ">{Imports.grade}</td>
                      <td className="w-[10%] p-7 ">{Imports.otherConcerns}</td>
                      <td className="w-[10%] p-12">{Imports.term}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
