import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Progress from "./components/Progress";
import Activity from "./components/Activity";
import Import from "./components/Import";
import Login from "./components/Login";
import AdminPages from "./components/AdminPages/Admin";
import supabase from "./supabaseClient";
//
export default function App({ msalinstance }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState();
  const [userAzure, setUserAzure] = useState(null);
  const [adminRole, setAdminRole] = useState(false);

  console.log(adminRole + " " + user);

  useEffect(() => {
    authen();
  }, [userAzure]);
  async function authen(user) {
    // const { data, error } = await supabase.from("accounts").insert({name:userAzure.name}).eq("name", userAzure.username)
    // if (userData) {
    //   for (let index = 0; index < userData.length; index++) {
    //     if (userData[index].adminEmail = user.username) {
    //       setUser(userData);
    //       setUserAzure(loginResponse);
    //       if (userData[index].adminName = null) {
    //         alert(loginResponse.name)
    //       console.log(loginResponse)
    //       const { data, error } = await supabase
    //         .from("accounts")
    //         .insert({ name: loginResponse.account.name, email: loginResponse.account.username })
    //       }
    //   }
    // }
  }
console.log(user)
  return (
    <div className="flex h-screen ">
      <div
        className={`${
          openMenu
            ? "w-[280px] h-screen transition-transform duration-200 overflow-hidden"
            : "w-0 hidden h-screen transition-transform duration-200"
        }`}
      >
        {user && <SideBar openMenu={openMenu} user={user} />}
      </div>
      <NavBar
        setOpenMenu={setOpenMenu}
        openMenu={openMenu}
        msalinstance={msalinstance}
        setUser={setUser}
        userAzure={userAzure}
        setUserAzure={setUserAzure}
        user={user}
        setAdminRole={setAdminRole}
      />
      <div className="w-[100%] overflow-hidden">
        <div className="mt-12">
          {adminRole && (
            <Routes>
              <Route path="/import" element={<Import />} />
              <Route path="/progress" element={<Progress />} />

              <Route path="/activity" element={<Activity />} />
            </Routes>
          )}

          <Routes>
            <Route path="/" element={<AdminPages />} />
            <Route path="/Admin" element={<Dashboard />} />
            <Route
              path="/Login"
              element={<Login msalinstance={msalinstance} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
