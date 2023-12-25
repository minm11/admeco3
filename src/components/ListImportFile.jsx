import supabase from "../supabaseClient";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import moment from "moment/moment";

const ListImportFile = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data: filesData, error: filesError } = await supabase
          .from("filename")
          .select("*");

        if (filesData) {
          setFiles(filesData || []);
          setFilteredFiles(filesData || []);

          // Extract unique usernames
          const uniqueUsernames = Array.from(
            new Set(filesData.map((file) => file.username))
          );
          setUsernames(uniqueUsernames);
        }

        // Handle errors if needed
        if (filesError) {
          console.error("Error fetching files:", filesError.message);
        }
      } catch (error) {
        console.error("Error fetching files:", error.message);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (filename, course, username) => {
    const downloadLink = `https://ejgdplrjgnbwghgjkxlg.supabase.co/storage/v1/object/public/Excelfile/${username}/${course}/${filename}`;

    try {
      const response = await fetch(downloadLink);
      if (response.ok) {
        window.open(downloadLink);
      } else {
        throw new Error("File not found");
      }
    } catch (error) {
      console.error("Error downloading file:", error.message);
      alert("File not found");
    }
  };

  const handleSearch = () => {
    try {
      const filtered = files.filter(
        (file) =>
          file.filename.toLowerCase().includes(searchTerm.toLowerCase()) &&
          moment(file.created_at).format("YYYY-MM-DD").includes(dateFilter) &&
          file.username.toLowerCase().includes(usernameFilter.toLowerCase())
      );
      setFilteredFiles(filtered);
    } catch (error) {
      alert("Invalid Search");
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex items-center gap-4 mb-4">
        <Link to="" className="hover:text-blue-500">
          Home
        </Link>
        <BiChevronRight className="text-gray-500" />
        <span className="text-gray-500">View Report</span>
      </div>

      <h1 className="text-3xl font-semibold mb-4">View Report</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by file name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="text"
          placeholder="Search By (YYYY-MM-DD)"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="ml-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="text"
          placeholder="Search the username"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
          className="ml-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-md"
        >
          Search
        </button>
      </div>

      {filteredFiles.length === 0 ? (
        <p>No files found based on the current filters.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-96">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="bg-white p-4 border rounded-md shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{file.filename}</h2>
              <p className="text-gray-600">
                Imported by: {file.username} | Date: {moment(file.created_at).format("LLL")}
              </p>
              <p className="text-gray-600">{file.description}</p>
              <button
                onClick={() => handleDownload(file.filename, file.course, file.username)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListImportFile;
