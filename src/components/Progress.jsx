import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { createClient } from "@supabase/supabase-js";
import supabase from "../supabaseClient";
import moment from "moment/moment";

const Progress = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentData = async () => {
    try {
      let { data: studentInformation, error } = await supabase
        .from("StudentInformation")
        .select("*")
        .order("created_at", { ascending: false }); // Order by created_at in descending order
      if (error) {
        alert(error);
      } else {
        setStudentData(studentInformation);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchStudentData();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div
      id="main"
      className="pt-9 pb-28 px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%]"
    >
      <div id="headTitle" className=" items-center gap-16 ">
        <div id="container left">
          <h1 className="text-4xl font-semibold mb-5 text-black">Progress</h1>
          <div className="flex items-center gap-4">
            <Link to="" className="hover:text-[#3C91E6]">
              Home
            </Link>
            <BiChevronRight id="icon iconchevronRight" className="" />
            <Link to="/Progress" className="hover:text-[#3C91E6]">
              Progress
            </Link>
          </div>
        </div>
      </div>

      <div id="table data" className="mt-[68px] ml-6 text-black">
        <div id="order" className="">
          <h1 className="text-2xl mr-auto mb-8 font-semibold">Progress</h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-[1px]">
                <th className="pb-1 pl-10 text-sm text-left bottom-1 border-solid border-[#eee]">
                  Student Name
                </th>
                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                  Term
                </th>
                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                  Date Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                studentData.map((student, index) => (
                  <tr key={index} className="px-10 hover:bg-[#eee]">
                    <td className="p-7">
                      <p className="pl-1">
                        {student.name ? student.name : "N/A"}
                      </p>
                    </td>

                    <td>
                      <p className="pl-1">
                        {student.term ? student.term : "N/A"}
                      </p>
                    </td>
                    <td>
                      <p className="pl-1">
                        {moment(student.created_at).format("LLL")}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Progress;
