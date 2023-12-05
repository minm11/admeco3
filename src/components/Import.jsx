import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import * as XLSX from "xlsx";
import supabase from "../supabaseClient";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Import() {
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  // submit state
  const [excelData, setExcelData] = useState(null);
  const [date, setDate] = useState();
  const [isOpen, setIsOpen] = useState(false);

  //new
  // const [dueDate, setDueDate] = useState(null);

  const handleFile = async (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    // let fileTypes = [".xls", ".xlsx", ".csv"];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
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
        if (a["LAST NAME"]) {
          break;
        } else {
          alert("INVALID FILE");
          return;
        }
      }
      setExcelData(data);
    }
  };

  const HandleUploadData = async () => {
    for (let index = 0; index < excelData.length; index++) {
      var a = excelData[index];
      const { error } = await supabase.from("StudentInformation").insert({
        name: a["LAST NAME"] + " " + a["FIRST NAME"],
        program: a["PROGRAM"],
        subject: a["SUBJECT"],
        section: a["SECTION"],
        noMeeting: a["NO. OF MEETINGS"],
        noLate: a["NO. OF DAYS LATE"],
        noAbsent: a["NO. OF DAYS ABSENT"],
        grade: a["GRADE"],
        otherConcerns: a["OTHER CONCERNS"],
        
         //new
        // dueDate: dueDate, for dueDate 
      });

      console.log(error);
    }
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
      <div className="mt-10 flex gap-3 mb-5">
        <input
          onClick={() => setExcelData() && setExcelFile()}
          accept=".xlsx,.cvc"
          type="file"
          className=" border border-gray-300 p-2 mb-1"
          required
          onChange={handleFile}
        />
        {excelData && excelData.length >= 0 && (
          <button
            onClick={() => HandleUploadData()}
            className="bg-green-500 text-white  py-2 px-6 rounded-md hover:bg-black"
          >
            SUPABASE
          </button>
        )}
        {typeError && (
          <div className="alert alert-danger " role="alert">
            {typeError}
          </div>
        )}
      </div>

      <div id="view data">
        {excelData && excelData.length >= 0 ? (
          <div className="table-container overflow-y-auto max-h-96">
            <div className="table responsive">
              <div className="  w-full max-h-[350px]  overflow-auto bg-slate-400 p-2 rounded-md shadow-md">
                <div className="grid grid-cols-11 gap-y-5 gap-x-3 p-1 text-[12px] ">
                  <div className="">NO.</div>
                  <div className=""> LAST NAME</div>
                  <div className=""> FIRST NAME</div>
                  <div className=""> PROGRAM</div>
                  <div className=""> SUBJECT</div>
                  <div className=""> SECTION</div>

                  <div className=""> NO. OF MEETINGS</div>
                  <div className=""> NO. OF DAYS LATE</div>
                  <div className=""> NO. OF DAYS ABSENT</div>
                  <div className=""> GRADE</div>

                  <div className=""> OTHER CONCERNS</div>
                </div>

                {excelData.map((data, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-11 bg-slate-200 mt-2 "
                  >
                    <div className=""> {data["NO."]}</div>
                    <div className="">{data["LAST NAME"]}</div>
                    <div className="">{data["FIRST NAME"]}</div>
                    <div className="">{data["PROGRAM"]}</div>
                    <div className="">{data["SUBJECT"]}</div>
                    <div className="">{data["SECTION"]}</div>
                    <div className="">{data["NO. OF MEETINGS"]}</div>
                    <div className="">{data["NO. OF DAYS LATE"]}</div>
                    <div className="">{data["NO. OF DAYS ABSENT"]}</div>
                    <div className="">{data["GRADE"]}</div>
                    <div className="">{data["OTHER CONCERNS"]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48">
            <>
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


{
  /* {Object.keys(individualExcelData).map((key) => (
                      <td key={key}>{individualExcelData[key]}</td>
                    ))} */
}
