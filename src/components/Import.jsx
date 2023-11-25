import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import * as XLSX from "xlsx";

// pending major error 

export default function Import() {
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  // submit state
  const [excelData, setExcelData] = useState(null);
  // on change event
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("please select your file");
    }
  };
  // on submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 10));
    }
  };

  return (
    <div
      id="main"
      className=" pt-9 pb-28 px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%]"
    >
      <div
        id="headTitle"
        className="flex items-center justify-between gap-16 flex-wrap"
      >
        <div id="container left">
          <h1 className="text-4xl font-semibold mb-5 text-black">Import</h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-[#3C91E6]">
              Home
            </Link>
            <BiChevronRight id="icon iconchevronRight" className="" />
            <Link to="/Import" className="hover:text-[#3C91E6]">
              Import
            </Link>
          </div>
        </div>
      </div>
      <form id="form" className="mt-10" onSubmit={handleFileSubmit}>
        <input
          type="file"
          className="form-control"
          required
          onChange={handleFile}
        />
        <button
          type="submit"
          className="btn btn-success btn-md hover:bg-black mx-10"
        >
          Upload
        </button>
        {typeError && (
          <div className="alert alert-danger " role="alert">
            {typeError}
          </div>
        )}
      </form>
      <div id="view data">
        {excelData ? (
          <div className="table responsive">
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((individualExcelData, index) => (
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key) => (
                      <td key={key}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No file is Uploaded yet!</div>
        )}
      </div>
    </div>
  );
}
