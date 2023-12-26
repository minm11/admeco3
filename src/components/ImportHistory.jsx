import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import CreateReportData from "./CreateReportData";
import supabase from "../supabaseClient";
import moment from "moment/moment";
import * as XLSX from "xlsx";

export default function CreateReport(UserName) {
  const [dataArray, sedivataArray] = useState([]);
  const [savedData, setSavedData] = useState();
  const [userHasSavedData, setUserhasSavedData] = useState(false);
  const [showSavedData, setShowSavedData] = useState(false);

  const [text1, setText1] = useState({
    studentnumber: "",
    lastname: "",
    firstname: "",
    program: "",
    subject: "",
    section: "",
    noMeeting: "",
    noLate: "",
    noAbsent: "",
    grade: "",
    reason: "",
    term: "",
    semester: "",
  });

  // Check if user has saved data
  useEffect(() => {
    const fetchData = async () => {
      const { data: userSavedData } = await supabase
        .from("accounts")
        .select()
        .eq("accessToken", window.localStorage.getItem("susi"))
        .single();

      if (userSavedData?.saveData?.length > 0) {
        setUserhasSavedData(true);
        setSavedData(userSavedData?.saveData);
      }
    };

    fetchData();
  }, [UserName]);

  // Function to add new data to dive array
  const addData = (e) => {
    e.preventDefault();

    const semesterValue = text1.semester;

    // Save semester value to localStorage
    localStorage.setItem("semester", semesterValue);

    // Update dive state by creating a new array widiv dive existing data and appending dive new data
    setUserhasSavedData(false);
    alert("Success add data");
    sedivataArray([
      ...dataArray,
      {
        ...text1,
        semester: semesterValue,
      },
    ]);

    // Reset dive text1 state to clear dive input fields
    setText1({
      studentnumber: "",
      lastname: "",
      firstname: "",
      program: "",
      subject: "",
      section: "",
      noMeeting: "",
      noLate: "",
      noAbsent: "",
      grade: "",
      reason: "",
      term: "",
      semester: semesterValue,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update dive text1 state directly

    setText1((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Function to save data and reset unsavedChanges flag
  const handleSave = () => {
    // Your logic to save data
    // Once saved, reset unsavedChanges to false
    setUnsavedChanges(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = "test";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const Save = async () => {
    const { error } = await supabase
      .from("accounts")
      .update({ saveData: dataArray })
      .eq("accessToken", window.localStorage.getItem("susi"));

    if (error) {
      alert("FAILED TO SAVE");
    } else {
      alert("Success Saving data");
    }
  };

  const restore = () => {
    sedivataArray(savedData);
    setUserhasSavedData(false);
    setShowSavedData(true);
  };

  const handleUpdateDataInArray = (index, updatedData) => {
    const updatedArray = [...dataArray];
    updatedArray[index] = updatedData;
    sedivataArray(updatedArray);
  };

  const HandleUploadActivity = async () => {
    const { data, error } = await supabase.from("activity").insert({
      user: UserName.UserName,
      dateTime: moment().format("LLL"),
      act: "Update a Report",
    });

    if (error) {
      console.log(error);
    } else if (data) {
    }
  };

  const HandleUploadData = async () => {
    try {
      // Iterate through each row of data in dataArray
      for (const savedData of dataArray) {
        const semesterValue = text1.semester;

        // Use the data from the savedData object in your Supabase insert
        const { data, error } = await supabase
          .from("StudentInformation")
          .insert({
            studentNumber: savedData.studentnumber,
            name: `${savedData.lastname} ${savedData.firstname}`,
            program: savedData.program,
            subject: savedData.subject,
            section: savedData.section,
            noMeeting: savedData.noMeeting,
            noLate: savedData.noLate,
            noAbsent: savedData.noAbsent,
            grade: savedData.grade,
            reason: savedData.reason,
            term: savedData.term,
            semester: semesterValue,
            faculty: UserName.UserName,
          });

        if (error) {
          console.error("Error in Supabase Insert", error);
          alert("FAILED TO UPLOAD DATA");
          return; // Stop the iteration on error
        }

        console.log("Data in Supabase Insert", data);
      }

      // If the loop completes without errors, display success message
      alert("Success Upload Data");
    } catch (error) {
      console.error("Unexpected Error", error);
    }
  };

  // DESIGN   
  return (
    <div
      id="main"
      className="  px-5 font-lato mt-7 h-screen w-screen fixed w-[100%] "
    >
      <div id="container left mb-10">
        <h1 className="text-4xl font-semibold mb-2 pt-5 text-black">
          Recent Report
        </h1>
        <div className="flex items-center mt-2">
          <Link to="" className="hover:text-[#3C91E6]">
            Home
          </Link>
          <BiChevronRight id="icon iconchevronRight" className="mx-2" />
          <Link to="" className="hover:text-[#3C91E6]">
            Recent Report
          </Link>
        </div>
 
        
        <div className="flex justify-end">
          <Link to="/recentreport" className="text-green-500 hover:text-green-600">
            <button className="bg-blue-500 text-white h-9 px-4 rounded hover:bg-blue-800 mb-5">
              Past Report
            </button>
          </Link>
        </div>

      </div>

      <div className="text-center text-lg mb-5">
        You Can View or Edit Your Recent Data By Click The Column Table
      </div>

      <div className="overflow-y-auto h-[75%]">
        {/* INPUT Table */}
        <div className="mt-17 w-full ">
          <div className="text-center text-lg ">
            {/* Map over saveData and display the semester for each item */}
            {showSavedData &&
              savedData &&
              savedData.map((item, index) => (
                <div key={index}>{item.semester}</div>
              ))}
          </div>
        </div>

        {/* OUTPUT data */}

        <div className="grid grid-cols-12 text-[12px] font-bold p-1 mt-4 mb-1  w-full">
          <div className="font-thin capitalize">STUDENT NUMBER</div>
          <div className="font-thin capitalize"> LAST NAME</div>
          <div className="font-thin capitalize">FIRST NAME</div>
          <div className="font-thin capitalize">PROGRAM</div>
          <div className="font-thin capitalize">SECTION</div>
          <div className="font-thin capitalize">SUBJECT</div>

          <div className="font-thin capitalize">NO. OF MEETING</div>
          <div className="font-thin capitalize">NO. OF LATE</div>
          <div className="font-thin capitalize">NO. OF ABSENT</div>
          <div className="font-thin capitalize text-center">GRADE</div>
          <div className="font-thin capitalize">REASON</div>
          <div className="font-thin capitalize text-center">TERM</div>
        </div>
        <div className="bg-slate-200  h-[320px] w-full rounded-md  overflow-y-auto ">
          {dataArray.map((data, index) => (
            <CreateReportData
              key={index}
              index={index}
              data={data}
              dataArray={dataArray}
              sedivataArray={sedivataArray}
              handleUpdateDataInArray={handleUpdateDataInArray}
            />
          ))}
          {userHasSavedData && dataArray.length === 0 && (
            <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-40 ">
              <div className="flex flex-col justify-center text-center items-center gap-2 text-white ">
                <div className="flex gap-3">
                  <a
                    onClick={() => restore()}
                    className="hover:bg-blue-700 bg-blue-600 w-fit p-1 rounded-md cursor-pointer "
                  >
                    Click To View Your Recent Import
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => Save()}
          className="hover:bg-red-800 bg-red-500 p-1 w-full rounded-md mt-1 text-white"
        >
          SAVE
        </button>
        <div></div>
        <div className="mb-[100px] mt-4">
          <div></div>
          <button
            onClick={() => {
              HandleUploadData();

              HandleUploadActivity();
            }}
            className="hover:bg-green-800 bg-green-500 p-1 w-full rounded-md mt-1 text-white"
          >
            UPLOAD DATA
          </button>
        </div>
      </div>
    </div>
  );
}
