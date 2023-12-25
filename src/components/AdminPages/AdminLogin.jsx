import React, { useState } from "react";
import supabase from "../../supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function AdminLogin({
  setOpenLogin,
  openLogin,
  setAdminRole,
  setTeacherRole,
  setGuidanceRole,
  setUser,
  setLoggedIn,
}) {
  const [info, setInfo] = useState({ username: "", password: "" });
  const nav = useNavigate()
  async function handleLoginAdmin(e) {
    
    e.preventDefault();
    const { data: adminData } = await supabase.from("admin").select();
    const { data: teacherData } = await supabase.from("admin").select();
    const { data: guidanceData } = await supabase.from("admin").select();
    let isGuidance = false;
    let isTeacher = false;
    let isAdmin = false;

    for (let index = 0; index < adminData.length; index++) {
      if (
        adminData[index].adminname === info.username &&
        adminData[index].adminpass === info.password
      ) {
        window.localStorage.setItem("susi", "04e2e033-a7d9-4f85-a55a-8aeab41845ec")
        isAdmin = true;
        setLoggedIn(true);
        break; // Exit the loop once a match is found
      }
    }

    // for (let index = 0; index < teacherData.length; index++) {
    //   if (
    //     teacherData[index].teachername === info.username &&
    //     teacherData[index].teacherpass === info.password
    //   ) {
    //     window.localStorage.setItem("susi", "9584191f-150d-45f0-8ceb-94c953c05c7a")
    //     isTeacher = true;
    //     setLoggedIn(true);
    //     break; // Exit the loop once a match is found
    //   }
    // }

    // for (let index = 0; index < guidanceData.length; index++) {
    //   if (
    //     guidanceData[index].guidancename === info.username &&
    //     guidanceData[index].guidancepass === info.password
    //   ) {
    //     window.localStorage.setItem("susi", "04e2e033-a7d9-4f85-a55a-8aeab41845ec")
    //     isGuidance = true;
    //     setLoggedIn(true);
    //     break; // Exit the loop once a match is found
    //   }
    // }

    // if (isGuidance) {
    //   setGuidanceRole(true);
    //   setUser("guidance");
    //   close();
    //   nav('/')
    // } 

    // else if (isTeacher) {
    //   setTeacherRole(true);
    //   setUser("teacher");
    //   close();
    //   nav('/')
    // } 

    // else 
    if (isAdmin) {
      setAdminRole(true);
      setUser("admin");
      close();
      nav('/')
    } 
    else {
      setAdminRole(false);
      setTeacherRole(false);
      setGuidanceRole(false);
      alert("Access Denied");
    }
  }

  

  

  const close = () => setOpenLogin(!openLogin);

  const handleChange = (e) => {
    setInfo((previnfo) => {
      return { ...previnfo, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xs">
        <form className="  rounded px-8 pt-6 pb-8 " onSubmit={handleLoginAdmin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              UserName
            </label>
            <input
              required
              text="text"
              name="username"
              onChange={handleChange}
              className="bg-slate-300 rounded-md p-1"
            ></input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Password
            </label>
            <input
              required
              type="password"
              text="text"
              name="password"
              onChange={handleChange}
              className="bg-slate-300 rounded-md p-1"
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
