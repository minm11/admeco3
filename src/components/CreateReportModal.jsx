import React, { useState, useEffect } from "react";

function CreateReportModal({
  openModal,
  setOpenModal,
  data,
  index,
  dataArray,
  sedivataArray,
  handleUpdateData,
}) {
  const [updatedData, setUpdatedData] = useState({ ...data }); // Use spread operator to create a copy of the initial data

  // Update the state when 'openModal' changes
  useEffect(() => {
    setUpdatedData({ ...data });
  }, [openModal, data]);

  const handleKeyPress = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const update = () => {
    handleUpdateData(updatedData);

    // Close the modal
    setOpenModal(false);
    alert("Sucess Update Data");
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

    CS101: ["TEST ", ""],
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

  const filteredSubject = updatedData.section
    ? SectionToSubjectMapping[updatedData.section] || []
    : [];

  // Filter options based on user input
  const filteredOptions = sectionOption.filter((option) =>
    option.startsWith(
      programToSectionMapping[updatedData.program.toUpperCase()]
    )
  );

  if (!openModal) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="bg-slate-200 max-h-[80vh] w-[80vw] overflow-y-auto shadow-md shadow-black rounded-md">
        <div className="grid grid-cols-12 text-[12px] font-bold p-1 mt-10 mb-1 w-full">
          <div className="font-thin capitalize">STUDENT NUMBER</div>
          <div className="font-thin capitalize">LAST NAME</div>
          <div className="font-thin capitalize">FIRST NAME</div>
          <div className="font-thin capitalize">PROGRAM</div>

          <div className="font-thin capitalize">SECTION</div>
          <div className="font-thin capitalize">SUBJECT</div>
          <div className="font-thin capitalize">NO. OF MEETING</div>
          <div className="font-thin capitalize">NO. OF Late</div>
          <div className="font-thin capitalize">NO. OF ABSENT</div>
          <div className="font-thin capitalize text-center">GRADE</div>
          <div className="font-thin capitalize">REASON</div>
          <div className="font-thin capitalize text-center">TERM</div>
        </div>
        <div className="grid grid-cols-12 p-1 w-full">
          <input
            type="text"
            name="studentnumber"
            onChange={handleKeyPress}
            value={updatedData.studentnumber}
            className="text-center"
          />
          <input
            type="text"
            name="lastname"
            onChange={handleKeyPress}
            value={updatedData.lastname}
            className="text-center"
          />
          <input
            type="text"
            name="firstname"
            onChange={handleKeyPress}
            value={updatedData.firstname}
            className="text-center"
          />
          <select
            type="text"
            name="program"
            onChange={handleKeyPress}
            value={updatedData.program}
            className="text-center"
          >
            <option value="BSCS">BSCS</option>
            <option value="BSIT">BSIT</option>
            <option value="BSCPE">BSCPE</option>
            <option value="BSAIS">BSAIS</option>
            <option value="BSHM">BSHM</option>
            <option value="BSTM">BSTM</option>
          </select>

          <select
            type="text"
            name="section"
            onChange={handleKeyPress}
            value={updatedData.section}
            className="text-center"
          >
            <option></option>
            {filteredOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            type="text"
            name="subject"
            onChange={handleKeyPress}
            value={updatedData.subject}
            className="text-center"
          >
            <option></option>
            {filteredSubject.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            type="text"
            name="noMeeting"
            onChange={handleKeyPress}
            value={updatedData.noMeeting}
            className="text-center"
          >
            <option></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          
          <select
            type="text"
            name="noLate"
            onChange={handleKeyPress}
            value={updatedData.noLate}
            className="text-center"
          >
            <option></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <select
            type="text"
            name="noAbsent"
            onChange={handleKeyPress}
            value={updatedData.noAbsent}
            className="text-center"
          >
            <option></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <select
            type="text"
            name="grade"
            onChange={handleKeyPress}
            value={updatedData.grade}
            className="text-center"
          >
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
          </select>

          <select
            type="text"
            name="reason"
            onChange={handleKeyPress}
            value={updatedData.reason}
            className="text-center"
          >
            <option value="no attendance">no attendance</option>
            <option value="no attendance,activities">
              no attendance,activities
            </option>
            <option value="no attendance,activities">
              no attendance,activities, tp
            </option>
            <option value="no attendance,activities, task performance and major exam">
              no attendance,activities, tp and major exam
            </option>
          </select>

          <select
            type="text"
            name="term"
            onChange={handleKeyPress}
            value={updatedData.term}
            className="text-center"
          >
            <option value="PRELIM">PRELIM</option>
            <option value="MIDTERM">MIDTERM</option>
            <option value="PRE-FINALS">PRE-FINALS</option>
            <option value="FINALS">FINALS</option>
          </select>
        </div>
        <div className="flex flex-col justify-center">
          <button
            onClick={() => update()}
            className="bg-green-600 text-white w-full p-1"
          >
            UPDATE
          </button>
          <button
            onClick={() => setOpenModal(false)}
            className="hover:text-red-600 text-black w-full p-1"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateReportModal;
