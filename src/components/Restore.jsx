import supabase from "../supabaseClient";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const Restore = ({ username }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [tableAccount, setTableAccount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const checkboxClass = "custom-checkbox";

  const [course, setCourse] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      const { data: Account } = await supabase
        .from("accounts")
        .select()
        .eq("accessToken", window.localStorage.getItem("susi"));
  
      if (Account) {
        let query = supabase
          .from("filename")
          .select()
          .eq("username", await Account[0]?.name);
  
        // Check if a course is selected, and filter accordingly
        if (course) {
          query = query.eq("course", course);
        }
  
        const { data: files } = await query;
  
        setTableAccount(files);
        console.log(files);
      }
    };
  
    fetchFiles(); // Invoke the fetchFiles function here
  
  }, [course]);

  const handleCheckboxChange = (filename) => {
    const updatedSelectedFiles = [...selectedFiles];

    if (updatedSelectedFiles.includes(filename)) {
      // If the filename is already in the selectedFiles array, remove it
      const index = updatedSelectedFiles.indexOf(filename);
      updatedSelectedFiles.splice(index, 1);
    } else {
      // If the filename is not in the selectedFiles array, add it
      updatedSelectedFiles.push(filename);
    }

    setSelectedFiles(updatedSelectedFiles);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const { data: Account } = await supabase
        .from("accounts")
        .select()
        .eq("accessToken", window.localStorage.getItem("susi"));

      if (Account) {
        const { data: files } = await supabase
          .from("filename")
          .select()
          .eq("username", await Account[0]?.name);

        setTableAccount(files);
        console.log(files);
      }
    };
    console.log(files);
    fetchFiles();
  }, []);

  const handleFileSelect = async (file) => {
    const { data: mainFolderFiles, error: mainFolderError } =
      await supabase.storage.from(`Excelfile`).list(file);

    setFiles(mainFolderFiles);
  };

  const handleBackToRecentFolder = () => {
    setCurrentPath("");
    setSelectedFile(null);
  };

  const handleDownload = async (filename, course, username) => {
    console.log(
      `https://ejgdplrjgnbwghgjkxlg.supabase.co/storage/v1/object/public/Excelfile/${filename}/${course}/${username}`
    );
    window.open(
      `https://ejgdplrjgnbwghgjkxlg.supabase.co/storage/v1/object/public/Excelfile/${username}/${course}/${filename}`
    );
  };

  const handleDownloadSelected = async () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      const filename = selectedFiles[i];
      const index = tableAccount.findIndex(
        (data) => data.filename === filename
      );

      if (index !== -1) {
        try {
          const course = tableAccount[index].course;
          const username = tableAccount[index].username;

          const downloadURL = `https://ejgdplrjgnbwghgjkxlg.supabase.co/storage/v1/object/public/Excelfile/${username}/${course}/${filename}`;

          console.log(`Downloading file "${filename}" from: ${downloadURL}`);

          // Use the fetch API to download the file
          const response = await fetch(downloadURL);
          const blob = await response.blob();

          // Create a temporary link element
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;

          // Append the link to the document and trigger a click event
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Introduce a delay (e.g., 1000 milliseconds) between downloads
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Error downloading file "${filename}":`, error.message);
        }
      }
    }
  };

  const deleteFile = async (username, course, filename) => {
    // Remove the file from Supabase storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from("Excelfile")
      .remove([`${username}/${course}/${filename}`]);

    if (storageError) {
      throw new Error(
        `Failed to delete file from storage: ${storageError.message}`
      );
    }

    // Remove the file entry from the 'filename' table
    const { data: tableData, error: tableError } = await supabase
      .from("filename")
      .delete()
      .eq("username", username)
      .eq("course", course)
      .eq("filename", filename);

    if (tableError) {
      throw new Error(
        `Failed to delete file entry from table: ${tableError.message}`
      );
    }

    return { storageData, tableData };
  };

  const handleDeleteSelected = async () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      const filename = selectedFiles[i];
      const index = tableAccount.findIndex(
        (data) => data.filename === filename
      );

      if (index !== -1) {
        try {
          const course = tableAccount[index].course;
          const username = tableAccount[index].username;

          // Call the deleteFile function
          await deleteFile(username, course, filename);

          // Remove the deleted file from the tableAccount state
          setTableAccount((prevTableAccount) =>
            prevTableAccount.filter((data) => data.filename !== filename)
          );

          alert(`Deleted file "${filename}"`);
        } catch (error) {
          console.error(`Error deleting file "${filename}":`, error.message);
        }
      }
    }

    // After deleting selected files, clear the selectedFiles array
    setSelectedFiles([]);
  };

  return (
    <div
      id="main"
      className="pt-9 pb-28 px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%]"
    >
      <div id="headTitle" className="flex items-center gap-16">
        <div id="container left">
          <h1 className="text-4xl font-semibold mb-5 text-black">Restore</h1>
          <div className="flex items-center gap-4">
            <Link to="" className="hover:text-[#3C91E6]">
              Home
            </Link>
            <BiChevronRight id="icon iconchevronRight" className="" />
            <Link to="/Restore" className="hover:text-[#3C91E6]">
              Restore
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg justify-center  ">
        <div className="flex ">
          {selectedFile ? (
            <div>
              <button
                onClick={handleBackToRecentFolder}
                className="bg-gray-300 text-gray-700 h-9 w-[200px] py-2 rounded hover:bg-gray-400"
              >
                Back to Recent Folder
              </button>

              {/* Move this section inside the selectedFile condition */}
              {selectedFile.type === "file" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">File Content</h3>
                  {/* Display the content in a readable format */}
                  <pre>{fileContent}</pre>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-4 flex">
                <div className="mr-4">
                  <label htmlFor="searchInput" className="block mb-2">
                    Search Files:
                  </label>
                  <input
                    type="text"
                    id="searchInput"
                    className="border rounded p-2 w-full"
                    placeholder="Enter file name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                
              </div>

              {tableAccount && (
                <div className="h-[300px] overflow-y-auto overflow-x-hidden bg-blue-300 p-2 flex justify-center">
                  <div className="text-center">
                    <label className="flex justify-center">Retrieve File</label>

                    {tableAccount
                      .filter((data) =>
                        data.filename
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((data, index) => (
                        <div
                          key={index}
                          className="bg-slate-200 p-1 px-[100px]  mb-1 rounded-md hover:bg-blue-400 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className={checkboxClass}
                            checked={selectedFiles.includes(data.filename)}
                            onChange={() => handleCheckboxChange(data.filename)}
                          />
                          <span
                            onClick={() =>
                              handleDownload(
                                data.filename,
                                data.course,
                                data.username
                              )
                            }
                          >
                            {data.filename}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mb-4">
          <button
            onClick={handleDownloadSelected}
            className="bg-green-500 text-white h-9 px-4 rounded hover:bg-green-600"
            disabled={selectedFiles.length === 0}
          >
            Download Selected
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white h-9 px-4 rounded hover:bg-red-600"
            disabled={selectedFiles.length === 0}
          >
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Restore;
