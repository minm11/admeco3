import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { createClient } from "@supabase/supabase-js";
import supabase from "../supabaseClient";
import moment from "moment/moment";

import Modal from "react-modal";
import { AiOutlineSearch } from "react-icons/ai";

const Progress = () => {
  const [activities, setActivities] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openStudentModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

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
      const { data, error } = await supabase
        .from("StudentInformation")
        .select("*");
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
      <div
        id="headTitle"
        className="flex items-center justify-between flex-wrap "
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
                activities.map((student, index) => (
                  <tr
                    key={index}
                    className="px-10 hover:bg-[#eee]"
                    onClick={() => openStudentModal(student)}
                  >
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

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Student Information Modal"
            className="flex items-center justify-center h-screen"
          >
            {selectedStudent && (
              <div className="bg-slate-300 p-6 rounded-md w-96 ">
                <table>
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
                    
                    <tr
                      className="px-10 hover:bg-[#eee]"
                    >
                      <td className="p-7">
                        <p className="pl-1">
                          {selectedStudent.name ? selectedStudent.name : "N/A"}
                        </p>
                      </td>

                      <td>
                        <p className="pl-1">
                          {selectedStudent.term ? selectedStudent.term : "N/A"}
                        </p>
                      </td>
                      <td>
                        <p className="pl-1">
                          {moment(selectedStudent.created_at).format("LLL")}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <button
            
              className="mt-4 px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={closeModal}
            >
              Close Modal
            </button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Progress;
