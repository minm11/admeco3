import React, { useState } from "react";
import supabase from "../../supabaseClient";

function AdminLogin({ setOpenLogin, openLogin, setAdminRole, setUser }) {
  const [info, setInfo] = useState({ username: "", password: "" });

  async function handleLoginAdmin(e) {
    e.preventDefault();
    const { data: adminData } = await supabase.from("admin").select();

    for (let index = 0; index < adminData.length; index++) {
      if (
        adminData[index].adminname === info.username &&
        adminData[index].adminpass === info.password
      ) {
        setAdminRole(true);
        setUser("admin")
        close();
        return;
      } else {
        setAdminRole(false);
        alert("Access Denied");
      }
    }
  }

  const close = () => setOpenLogin(!openLogin);

  //   Create access key every login
  //   Refresh check access key

  const handlechange = (e) => {
    setInfo((previnfo) => {
      return { ...previnfo, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      <form className="gap-1 grid" onSubmit={handleLoginAdmin}>
        <label>UserName</label>
        <input
          required
          text="text"
          name="username"
          onChange={handlechange}
          className="bg-slate-300 rounded-md p-1"
        ></input>
        <label>Password</label>
        <input
          required
          text="text"
          name="password"
          onChange={handlechange}
          className="bg-slate-300 rounded-md p-1"
        ></input>
        <button>LOGIN</button>
      </form>
    </div>
  );
}

export default AdminLogin;
