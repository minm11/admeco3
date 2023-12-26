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
      act: "Imported a Create Report",
      term: savedData[0].term,
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

  //TEMPORARY MAY BUG
  const HandleUploadExcel = async () => {
    try {
      const firstSavedData = dataArray[0]; // Assuming dataArray is an array of objects

      const excelData = [
        [
          "NO",
          "STUDENT NUMBER",
          "LAST NAME",
          "FIRST NAME",
          "PROGRAM",
          "SUBJECT",
          "SECTION",
          "NO. OF MEETINGS",
          "NO. OF DAYS LATE",
          "NO. OF DAYS ABSENT",
          "GRADE",
          "REASON",
          "TERM",
        ],
        [
          "1", // Use quotes to make it a string
          firstSavedData.studentnumber,
          firstSavedData.lastname,
          firstSavedData.firstname,
          firstSavedData.program,
          firstSavedData.subject,
          firstSavedData.section,
          firstSavedData.noMeeting,
          firstSavedData.noLate,
          firstSavedData.noAbsent,
          firstSavedData.grade,
          firstSavedData.reason,
          firstSavedData.term,
        ],
      ];

      const fileName = "exported_excel.xlsx";

      const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, fileName);
      };

      // Call exportToExcel when you want to export the data
      exportToExcel();
    } catch (error) {
      console.error("Error handling Excel upload:", error);
    }
  };

  const programToSectionMapping = {
    BSCS: "CS",
    BSIT: "BT",
    BSCPE: "CE",
    BSAIS: "AIS",
    BSHM: "HM",
    BSTM: "TM",
  };

  const SectionToSubjectMapping = {
    BT101: [
      "ComProg1",
      "Euthenics 1",
      "Intro To Computing",
      "MMW",
      "CONTEMPORARY WORLD",
      "THE ENTREPRENEURIAL MIND",
      "UTS",
    ],
    BT102: [
      "ART APPRECIATION",
      "DISCRETE STRUCTURES 1 ",
      "ETHICS",
      "NSTP 1",
      "PE 1",
      "PURPOSIVE COMMUNICATION",
      "RPH",
      "STS",
    ],
    BT201: [
      "COMPROG 2 ",
      "DATA STRUCTURES AND ALGORITHMS ",
      "HCI",
      "INTRO DIGITAL GRAPHICS DESIGN",
      "NSTP 2",
      "PE 2",
      "PLATFORM TECHNOLOGY",
      "POC",
      "RIZAL'S LIFE AND WORKS",
    ],

    CS101: ["TEST "],
    AIS101: [
      "COMPUTER PRODUCT TOOLS",
      "CONCEPTUAL FRAMEWORK & ACCOUNTING STANDARDS",
      "ACCOUNTING STANDARDS",
      "ETHICS",
      "FINANCIAL ACCOUNTING AND REPORTING",
      "INCOME TAXATION",
      "OBLIGATIONS AND CONTRACTS",
      "NSTP",
      "OPERATIONS MANAGEMENT",
      "PE",
      "PURPOSE COMMUNICATION",
      "BASIC ACCOUNTING",
      "READING IN PHILIPPINES HISTORY",
      "",
    ],
  };

  const sectionOption = [
    "BT101",
    "CS101",
    "CE101",
    "AIS101",
    "HM101",
    "TM101",
    "BT102",
    "CS102",
    "CE102",
    "AIS102",
    "HM102",
    "TM102",

    "BT201",
    "CS201",
    "CE201",
    "AIS201",
    "HM201",
    "TM201",

    "BT202",
    "CS202",
    "CE202",
    "AIS202",
    "HM202",
    "TM202",

    "BT301",
    "CS301",
    "CE301",
    "AIS301",
    "HM301",
    "TM301",

    "BT302",
    "CS302",
    "CE302",
    "AIS302",
    "HM302",
    "TM302",
  ];

  const filteredSubject = text1.section
    ? SectionToSubjectMapping[text1.section] || []
    : [];

  // Filter options based on user input

  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    const filteredOptions = sectionOption.filter((option) =>
      option.startsWith(programToSectionMapping[text1.program.toUpperCase()])
    );

    if (text1.semester === "1ST SEMESTER") {
      // Filter specific sections for 1st semester
      const filteredSections = filteredOptions.filter(
        (option) =>
          option === "BT101" ||
          option === "BT301" ||
          option === "BT102" ||
          option === "BT302" ||
          
          option === "CS101" ||
          option === "CS301" ||
          option === "CS102" ||
          option === "CS302" ||

          option === "AIS101" ||
          option === "AIS102" ||
          option === "AIS301" ||
          option === "AIS302" ||

          option === "HM101" ||
          option === "HM102" ||
          option === "HM301" ||
          option === "HM302" ||

          option === "TM101" ||
          option === "TM102" ||
          option === "TM301" ||
          option === "TM302" ||

          option === "CE101" ||
          option === "CE102" ||
          option === "CE301" ||
          option === "CE302" 
         
      );

     

      setFilteredOptions(filteredSections);
    } else if (text1.semester === "2ND SEMESTER") {
      // Filter specific sections for 2nd semester
      const filteredSections = filteredOptions.filter(
        (option) =>
          option === "BT201" ||
          option === "BT202" ||

          option === "CS201" ||
          option === "CS202" ||

          option === "AIS201" ||
          option === "AIS202" ||
         
          option === "HM201" ||
          option === "HM202" ||

          option === "TM201" ||
          option === "TM202" ||

          option === "CE201" ||
          option === "CE202"
      );

     

      setFilteredOptions(filteredSections);
    } else {
      // Default case or handle additional semesters if needed
      setFilteredOptions([]);
    }
  }, [text1.semester, text1.program]);

  // DESIGN
  return (
    <div
      id="main"
      className="  px-5 font-lato mt-7 h-screen w-screen fixed w-[100%] "
    >
      <div id="container left mb-10">
        <h1 className="text-4xl font-semibold mb-2 pt-5 text-black">
          Report Creation
        </h1>
        <div className="flex items-center mt-2">
          <Link to="" className="hover:text-[#3C91E6]">
            Home
          </Link>
          <BiChevronRight id="icon iconchevronRight" className="mx-2" />
          <Link to="/createreport" className="hover:text-[#3C91E6]">
            Report Creation
          </Link>
        </div>

        <div className="flex justify-end">
          <Link to="/import" className="text-green-500 hover:text-green-600">
            <button className="bg-green-500 text-white h-9 px-4 rounded hover:bg-green-600 mb-5">
              Import Excel
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-y-auto h-[75%]">
        {/* INPUT Table */}
        <div className="mt-17 w-full ">
          <form onSubmit={addData} className="grid w-full ">
            <div className="flex flex-col items-center mb-8">
              <label className="labelRegis">
                Semester{" "}
                <select
                  required
                  name="semester"
                  type="text"
                  value={text1.semester}
                  onChange={handleChange}
                  placeholder="Enter Semester"
                  className="inputRegis"
                  style={{ width: "200px" }}
                >
                  <option></option>
                  <option>1ST SEMESTER</option>
                  <option>2ND SEMESTER</option>
                </select>
              </label>
            </div>

            <div className="md:grid-cols-4 grid-cols-1 grid gap-2 mb-3  w-full ">
              <div className="labelRegis ">
                Student Number{" "}
                <input
                  required
                  name="studentnumber"
                  type="text"
                  value={text1.studentnumber}
                  onChange={handleChange}
                  placeholder="Enter Student Number"
                  className=" inputRegis"
                />
              </div>
              <div className="labelRegis">
                Last Name{" "}
                <input
                  required
                  name="lastname"
                  type="text"
                  value={text1.lastname}
                  onChange={handleChange}
                  className="inputRegis"
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="labelRegis">
                First Name{" "}
                <input
                  required
                  name="firstname"
                  type="text"
                  value={text1.firstname}
                  onChange={handleChange}
                  className="inputRegis"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="labelRegis">
                Program{" "}
                <select
                  required
                  name="program"
                  value={text1.program}
                  onChange={handleChange}
                  className="inputRegis"
                >
                  <option></option>
                  {Object.keys(programToSectionMapping).map(
                    (program, index) => (
                      <option key={index} value={program}>
                        {program}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="labelRegis">
                Section{" "}
                <select
                  required
                  name="section"
                  value={text1.section}
                  onChange={handleChange}
                  className="inputRegis"
                  disabled={!text1.program}
                >
                  <option></option>
                  {filteredOptions.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="labelRegis">
                Subject{" "}
                <select
                  required
                  name="subject"
                  value={text1.subject}
                  onChange={handleChange}
                  className="inputRegis"
                  disabled={!text1.section || !text1.program}
                  style={{ width: "360px" }}
                >
                  <option></option>
                  {filteredSubject.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                  {!text1.section && !text1.program && (
                    <option disabled>No data available</option>
                  )}
                </select>
              </div>

              <div className="labelRegis">
                No. of Meetings{" "}
                <select
                  required
                  name="noMeeting"
                  type="text"
                  value={text1.noMeeting}
                  onChange={handleChange}
                  className="inputRegis"
                  style={{ weight: "20px" }}
                  placeholder="Enter No. of Meeting"
                >
                  <option></option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>

              <div className="labelRegis">
                No. of Late{" "}
                <select
                  required
                  name="noLate"
                  type="text"
                  value={text1.noLate}
                  onChange={handleChange}
                  className="inputRegis"
                  placeholder="Enter No. of Late"
                >
                  <option></option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>

              <div className="labelRegis">
                No. of Absent{" "}
                <select
                  required
                  name="noAbsent"
                  type="text"
                  value={text1.noAbsent}
                  onChange={handleChange}
                  className="inputRegis"
                  placeholder="Enter No. of Absent"
                >
                  <option></option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>

              <div className="labelRegis">
                Grade{" "}
                <select
                  required
                  name="grade"
                  type="text"
                  value={text1.grade}
                  onChange={handleChange}
                  className="inputRegis"
                >
                  <option></option>
                  <option>50</option>
                  <option>60</option>
                  <option>70</option>
                </select>
              </div>

              <div className="labelRegis">
                Reason
                <select
                  required
                  name="reason"
                  value={text1.reason}
                  onChange={handleChange}
                  className="inputRegis"
                >
                  <option></option>
                  <option>no attendance</option>
                  <option>no attendance,activities</option>
                  <option>no attendance,activities, tp</option>
                  <option>no attendance,activities, tp and major exam</option>
                </select>
              </div>

              <div className="labelRegis">
                Term{" "}
                <select
                  required
                  name="term"
                  value={text1.term}
                  onChange={handleChange}
                  className="inputRegis text-center w-[150px]"
                >
                  <option></option>
                  <option>PRELIM</option>
                  <option>MIDTERM</option>
                  <option>PRE-FINALS</option>
                  <option>FINALS</option>
                </select>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              ADD DATA
            </button>
          </form>
        </div>
        <div className="font-thin capitalize text-center p-3 text-lg">
          {text1.semester ? (
            text1.semester
          ) : (
            <span className="text-BLACK text-lg">SELECT SEMESTER FIRST</span>
          )}
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
                <label>YOU HAVE A SAVED DATA DO YOU WANT TO RESTORE IT?</label>
                <div className="flex gap-3">
                  <a
                    onClick={() => restore()}
                    className="hover:bg-blue-700 bg-blue-600 w-fit p-1 rounded-md cursor-pointer "
                  >
                    RESTORE
                  </a>
                  <a
                    onClick={() => setUserhasSavedData(false)}
                    className="hover:bg-blue-700 bg-blue-600 w-fit p-1 rounded-md cursor-pointer "
                  >
                    CANCEL
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="text-center bg-black text-white">
          {" "}
          IF YOU WANT TO REMOVE THE SAVED DATA CLICK REFRESH BUTTON AND PRESS
          CANCEL
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
              // HandleUploadExcel();
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
