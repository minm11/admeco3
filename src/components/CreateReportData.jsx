import React, { useState, useEffect } from "react";
import CreateReportModal from "./CreateReportModal";


function CreateReportData({ data, index, dataArray, sedivataArray , handleUpdateDataInArray }) {
  const [openModal, setOpenModal] = useState(false);
  const [localData, setLocalData] = useState(data);

  const handleUpdateData = (updatedData) => {
    setLocalData(updatedData);
    // Update data in the parent component's dataArray
    handleUpdateDataInArray(index, updatedData);
  };

  

  return (
    <div className="bg-slate-300 p-1 hover:p-2 duration-300 hover:shadow-md hover:shadow-black hover:mb-1">
      <div
        onClick={() => setOpenModal(!openModal)}
        className="grid grid-cols-12 "
      >
        <div className="font-thin capitalize">{data.studentnumber}</div>
        <div className="font-thin capitalize">{data.lastname}</div>
        <div className="font-thin capitalize">{data.firstname}</div>
        <div className="font-thin capitalize">{data.program}</div>
       
        <div className="font-thin capitalize">{data.section}</div>
        <div className="font-thin capitalize">{data.subject}</div>
        <div className="font-thin capitalize ml-10">{data.noMeeting}</div>
        <div className="font-thin capitalize ml-10">{data.noLate}</div>
        <div className="font-thin capitalize ml-10">{data.noAbsent}</div>
        <div className="font-thin capitalize text-center">{data.grade}</div>
        <div className="font-thin capitalize">{data.reason}</div>
        <div className="font-thin capitalize text-center ml-7">{data.term}</div>
      </div>

      <CreateReportModal
        data={localData}
        openModal={openModal}
        setOpenModal={setOpenModal}
        index={index}
        dataArray={dataArray}
        sedivataArray={sedivataArray}
        handleUpdateData={handleUpdateData}
      />
    </div>
  );
}

export default CreateReportData;
