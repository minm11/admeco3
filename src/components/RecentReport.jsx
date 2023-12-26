import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import supabase from "../supabaseClient";
import moment from "moment/moment";
import "react-calendar/dist/Calendar.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function RecentReport(UserName) {
  const [Imports, setImports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anotherFilter, setAnotherFilter] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [facultyNames, setFacultyNames] = useState(new Set());

  const tableRef = useRef(null);

  const exportToPDF = async () => {
    try {
      const pdf = new jsPDF();
      const table = tableRef.current;

      if (table) {
        const rows = table.querySelectorAll("tbody tr");
        const pageHeight = pdf.internal.pageSize.getHeight();
        let currentY = 10;

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const canvas = await html2canvas(row);
          const imageData = canvas.toDataURL("image/png");

          // If adding the current row would exceed the page height, add a new page
          if (currentY + 20 > pageHeight) {
            pdf.addPage();
            currentY = 10;
          }

          // Add the image to the PDF at the current Y-coordinate
          pdf.addImage(imageData, "PNG", 10, currentY, 180, 0);
          currentY += 20; // Adjust the Y-coordinate for the next row
        }
        alert("Wait 10s To Convert to pdf");
        pdf.save("LIST OF ALL STUDENT.pdf");
        alert("Success");
      }
    } catch (error) {
      console.error("Error exporting to PDF", error.message);
    }
  };

  const fetchFacultyAccount = async () => {
    try {
      const { data, error } = await supabase
        .from("StudentInformation")
        .select("faculty");
      if (error) throw error;

      // Extract faculty names from the data and convert them to a Set for uniqueness
      const namesSet = new Set(data.map((item) => item.faculty));
      setFacultyNames(namesSet);

      // Automatically set facultyFilter based on UserName
      if (UserName.UserName) {
        setFacultyFilter(UserName.UserName);
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  useEffect(() => {
    fetchFacultyAccount();
  }, [UserName]);

  useEffect(() => {
    fetchFacultyAccount();
  }, []);

  const filterData = (data) => {
    return data.filter(
      (item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        ) &&
        (!anotherFilter ||
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(anotherFilter.toLowerCase())
          )) &&
        (!facultyFilter ||
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(facultyFilter.toLowerCase())
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
  }, [searchQuery, anotherFilter, facultyFilter]);

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
          Past Report
          </h1>
          <div className="flex items-center justify-between mb-8 ">
            <Link to="" className="hover:text-[#3C91E6]">
              Home
            </Link>
            <BiChevronRight id="icon iconchevronRight" className="mx-2" />
            <Link to="" className="hover:text-[#3C91E6]">
              Past Report
            </Link>
          </div>
         
        </div>

        {/* searchbar */}
        <div className="flex flex-col items-center justify-center mt-5 me-[40%]">
          {/* Select Semester */}
          <div
            id="dropdowncontainer"
            className="bg-slate-300 rounded-r-full  flex justify-between h-8 "
          >
            <label className="text-[20px] text-grey-700 mb-1 ml-7">
              Select Semester
            </label>
            <select
              id="dropdown"
              className="rounded-r-full  border-0 text-md outline-none w-40 mx-5 bg-slate-300"
              type="text"
              value={anotherFilter}
              onChange={(e) => setAnotherFilter(e.target.value)}
            >
              <option> </option>
              <option>1ST SEMESTER</option>
              <option>2ND SEMESTER</option>
            </select>
          </div>

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

        
          <Link to="/importhistory" className="text-green-500 hover:text-green-600">
            <button className="hover:bg-blue-800 bg-blue-500 p-1 w-56 rounded-md  text-white ml-[35%] mt-[7%] absolute top-0">
              Back To Recent Report
            </button>
          </Link>
        

          <button
            onClick={exportToPDF}
            className="hover:bg-green-800 bg-green-500 p-1 w-56 rounded-md  text-white ml-[85%] mt-[2%] absolute top-0"
          >
            CONVERT TO PDF
          </button>

          <select
            id="searchbar"
            className=" appearance-none rounded-r-full border-0 text-md outline-none w-72 mx-5 bg-slate-300 mr-[75%] mt-[7%] absolute top-0"
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
            disabled
          >
            <option disabled value="">
              Select Faculty
            </option>
            {Array.from(facultyNames).map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          
        </div>
      </div>

      

      <div id="view data ">
        <div className="table-container " ref={tableRef}>
          <div className="table responsive">
            <div className="  w-full max-h-[480px]  overflow-auto bg-slate-400 p-2 rounded-md shadow-md mt-5">
              <table className="w-full table-fixed text-[12px]  ">
                <thead>
                  <tr className="bg-slate-300">
                    <th className="w-[10%] pr-4 border  ">Date</th>
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
                      <td className="w-[10%] p-12">
                        {moment(Imports.created_at).format("YYYY-MM-DD")}
                      </td>
                      <td className="w-[10%] p-12">{Imports.studentNumber}</td>
                      <td className="w-[10%] p-10 ">{Imports.name}</td>
                      <td className="w-[10%] p-12 ">{Imports.program}</td>
                      <td className="w-[10%] p-10 ">{Imports.subject}</td>
                      <td className="w-[10%] p-12 ">{Imports.section}</td>
                      <td className="w-[5%] p-8 ">{Imports.noMeeting}</td>
                      <td className="w-[5%] p-8 ">{Imports.noLate}</td>
                      <td className="w-[5%] p-8 ">{Imports.noAbsent}</td>
                      <td className="w-[5%] p-7 ">{Imports.grade}</td>
                      <td className="w-[10%] p-7 ">{Imports.reason}</td>
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
