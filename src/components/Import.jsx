import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import * as XLSX from "xlsx";
import supabase from "../supabaseClient";
import moment from "moment/moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { v4 as uuidv4 } from "uuid";

export default function Import(UserName, handleButtonClick) {
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [Course, setCourse] = useState("");

  // submit state
  const [excelData, setExcelData] = useState(null);
  const [file, setFile] = useState();

  const downloadTemp = async () => {
    window.open(
      "https://ejgdplrjgnbwghgjkxlg.supabase.co/storage/v1/object/sign/template/Excel-adsr.xlsx?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZW1wbGF0ZS9FeGNlbC1hZHNyLnhsc3giLCJpYXQiOjE3MDE5OTg2ODUsImV4cCI6MTczMzUzNDY4NX0.8fGholdx8u2Av5zNMFKc42YZ01Ao5NR6HbOcjNF_nxw&t=2023-12-08T01%3A24%3A43.044Z"
    );
  };

  //teacher name muna para sa kung sino nag send tapos file name ganon
  const uploadExcel = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("Excelfile")
        .upload(UserName.UserName + "/" + Course + "/" + file.name, file);

      await supabase
        .from("filename")
        .insert([
          { filename: file.name, username: UserName.UserName, course: Course },
        ])
        .select();

      if (error) {
        alert("Error uploading file: " + error.message);
      } else {
        alert("File uploaded successfully: " + JSON.stringify(data));
      }
    } catch (e) {
      alert("Error during file upload: " + e.message);
    }
  };

  const handleFile = async (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    // let fileTypes = [".xls", ".xlsx", ".csv"];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
          handleFileSubmit(e.target.result);
        };
      } else {
        setExcelFile(null);
        setExcelData();
        setTypeError("please select only excel file types");
      }
    } else {
      console.log("please select your file");
      setExcelData();
    }
  };

  // on submit event
  const handleFileSubmit = (e) => {
    if (e !== null) {
      const workbook = XLSX.read(e, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      for (let index = 0; index < data.length; index++) {
        var a = data[index];
        if (a["STUDENT NUMBER"]) {
          break;
        } else {
          alert("INVALID FILE");
          return;
        }
      }
      setExcelData(data);
    }
  };

  //basta sending ng data sa supa
  const HandleUploadActivity = async () => {
    const { data, error } = await supabase.from("activity").insert({
      user: UserName.UserName,
      // dateTime: moment(new Date()).from("LLL"),
      dateTime: moment().format("LLL"),
      act: "imported a report",
    });

    if (error) {
      console.log(error);
    } else if (data) {
      console.log(data);
    }
  };

  const HandleUploadData = async () => {
    for (let index = 0; index < excelData.length; index++) {
      var a = excelData[index];
      const { error } = await supabase.from("StudentInformation").insert({
        studentNumber: a["STUDENT NUMBER"],
        name: a["LAST NAME"] + " " + a["FIRST NAME"],
        program: a["PROGRAM"],
        subject: a["SUBJECT"],
        section: a["SECTION"],
        noMeeting: a["NO. OF MEETINGS"],
        noLate: a["NO. OF DAYS LATE"],
        noAbsent: a["NO. OF DAYS ABSENT"],
        grade: a["GRADE"],
        otherConcerns: a["OTHER CONCERNS"],
        term: a["TERM"],
        //new
        // dueDate: dueDate, for dueDate
      });
    }
    alert("File uploaded successfully: ");
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

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
            Import
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

        {/* testing download from bucket */}
        <button
          onClick={() => {
            downloadTemp();
          }}
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-black"
        >
          Download Template
        </button>
      </div>

      <div className="mt-10 flex gap-3 gap-x-4 mb-5">
        {/* lagyan mo course design */}
        <div className="grid">
          Select Course
          <select
            onChange={(e) => setCourse(e.target.value)}
            value={Course}
            className="p-3 bg-slate-200"
          >
            <option value=""></option>
            <option value="BSIT">BSIT</option>
            <option value="BSAIS">BSAIS</option>
            <option value="BSHM">BSHM</option>
            <option value="BSCS">BSCS</option>
            <option value="BSTM">BSTM</option>
            <option value="BSCE">BSCE</option>
          </select>
        </div>

        {/* set activity */}

        {Course !== "" && (
          <div className="flex gap-2 items-center">
            <div className="grid">
              {" "}
              <label>Select input file</label>
              <input
                onClick={() => setExcelData() && setExcelFile()}
                accept=".xlsx,.cvc"
                type="file"
                className=" border border-gray-300 p-2"
                required
                onChange={handleFile}
              />
            </div>

            {excelData && excelData.length >= 0 && (
              <button
                onClick={() => {
                  HandleUploadData();
                  uploadExcel(excelFile);
                  HandleUploadActivity();
                }}
                className="bg-green-500 text-white mt-6   h-12 px-6 rounded-md hover:bg-black"
              >
                Upload
              </button>
            )}
          </div>
        )}

        {typeError && (
          <div className="alert alert-danger " role="alert">
            {typeError}
          </div>
        )}
      </div>

      <div id="view data">
        {excelData && excelData.length >= 0 ? (
          <div
            className="table-container overflow-y-auto 
          "
          >
            <div className="table responsive">
              <div className="  w-full max-h-[370px]  overflow-auto bg-slate-400 p-2 rounded-md shadow-md">
                <table className="w-full table-fixed text-[12px]  ">
                  <thead>
                    <tr className="bg-slate-300">
                      <th className="w-[5%] pr-8 border ">NO.</th>
                      <th className="w-[10%] pr-4 border  ">STUDENT NUMBER</th>
                      <th className="w-[10%] pr-1 border ">LAST NAME</th>
                      <th className="w-[10%] pr-1 border ">FIRST NAME</th>
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
                    {excelData.map((data, index) => (
                      <tr key={index} className="bg-slate-200">
                        <td className="w-[5%] p-3 ">{data["NO."]}</td>
                        <td className="w-[10%] p-7 ">
                          {data["STUDENT NUMBER"]}
                        </td>
                        <td className="w-[10%] p-10  ">{data["LAST NAME"]}</td>
                        <td className="w-[10%] p-10 ">{data["FIRST NAME"]}</td>
                        <td className="w-[10%] p-12 ">{data["PROGRAM"]}</td>
                        <td className="w-[10%] p-10 ">{data["SUBJECT"]}</td>
                        <td className="w-[10%] p-12 ">{data["SECTION"]}</td>
                        <td className="w-[5%] p-8 ">
                          {data["NO. OF MEETINGS"]}
                        </td>
                        <td className="w-[5%] p-8 ">
                          {data["NO. OF DAYS LATE"]}
                        </td>
                        <td className="w-[5%] p-8 ">
                          {data["NO. OF DAYS ABSENT"]}
                        </td>
                        <td className="w-[5%] p-7 ">{data["GRADE"]}</td>
                        <td className="w-[10%] p-7 ">
                          {data["OTHER CONCERNS"]}
                        </td>
                        <td className="w-[10%] p-12">{data["TERM"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48">
            <>
              {Course == "" && (
                <>
                  <div className="text-gray-500 mb-4">
                    Please select a Course before selecting file.
                  </div>
                </>
              )}
              {excelFile === null ? (
                <div className="text-gray-500 mb-4">Please upload a file.</div>
              ) : (
                <div className="text-gray-500 mb-4">
                  Cannot read your file please use our template.
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
}
