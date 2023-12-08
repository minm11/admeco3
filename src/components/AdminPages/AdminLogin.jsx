import React, { useState } from "react";
import supabase from "../../supabaseClient";

function AdminLogin({
  setOpenLogin,
  openLogin,
  setAdminRole,
  setUser,
  setLoggedIn,
}) {
  const [info, setInfo] = useState({ username: "", password: "" });

  async function handleLoginAdmin(e) {
    e.preventDefault();
    const { data: adminData } = await supabase.from("admin").select();

    let isAdmin = false;

    for (let index = 0; index < adminData.length; index++) {
      if (
        adminData[index].adminname === info.username &&
        adminData[index].adminpass === info.password
      ) {
        isAdmin = true;
        setLoggedIn(true);
        break; // Exit the loop once a match is found
      }
    }

    if (isAdmin) {
      setAdminRole(true);
      setUser("admin");
      close();
    } else {
      setAdminRole(false);
      alert("Access Denied");
    }
  }

  const close = () => setOpenLogin(!openLogin);

  //   Create access key every login
  //   Refresh check access key

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
