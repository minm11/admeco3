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
          .eq("username", await Account[0].name);

        setTableAccount(files);
        console.log(files);
      }
    };

    fetchFiles();
  }, []);

  const handleFileSelect = async (file) => {
    const { data: mainFolderFiles, error: mainFolderError } =
      await supabase.storage.from(`Excelfile`).list(file);

    setFiles(mainFolderFiles);
  };

  const handleRetrieveFile = async () => {
    if (selectedFileName) {
      try {
        const { data, error } = await supabase.storage
          .from("Excelfile")
          .download(selectedFileName);

        if (data) {
          setFileContent(data);
        } else {
          console.error("Error:", error);
        }
      } catch (error) {
        console.error("Error retrieving file:", error.message);
      }
    }
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

  return (
    <div
      id="main"
      className="px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%]"
    >
      <div id="container left" className="flex">
        <h1 className="text-4xl font-semibold mb-2 pt-5 text-black">Restore</h1>
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="hover:text-[#3C91E6]">
            Home
          </Link>
          <BiChevronRight id="icon iconchevronRight" className="mx-2" />
          <Link to="/Restore" className="hover:text-[#3C91E6]">
            Restore
          </Link>
        </div>
      </div>
      <div className="w-full max-w-lg">
        {/* ... (rest of the code) ... */}
        <div className="flex">
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
              {/* <label htmlFor="fileDropdown" className="block mb-2">
                Select a file:
              </label>
              {console.log(files)}
              <select
                id="fileDropdown"
                className="border rounded p-2 mb-4 w-auto"
                value={selectedFileName}
                onChange={(e) => {
                  setSelectedFileName(e.target.value);
                  handleFileSelect(e.target.value);
                }}
              >
                <option value={""}></option>
                {files.map((file, index) => (
                  <option key={index} value={file.name}>
                    {file.name}
                  </option>
                ))}
              </select> */}

              {tableAccount && (
                <div className="h-[500px] overflow-y-auto overdflow-x-hidden bg-blue-300 p-2 ">
                  <label className="text-center flex justify-center">
                    {" "}
                    Retrieve File
                  </label>
                  {tableAccount.map((data, index) => (
                    <div
                      key={index}
                      className="bg-slate-200 p-1 px-[100px]  mb-1 rounded-md hover:bg-blue-400 cursor-pointer"
                      onClick={() =>
                        handleDownload(
                          data.filename,
                          data.course,
                          data.username
                        )
                      }
                    >
                      {data.filename}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restore;
