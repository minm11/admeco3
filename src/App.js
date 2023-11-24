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

  //console.log(adminRole + " " + user);
  // accounts Table [name,email,role]
  useEffect(() => {
    if (userAzure) authen();
  }, [userAzure]);

  async function authen() {
    await nameChecker();
    const { data: accounts } = await supabase.from("accounts").select();

    for (let index = 0; index < accounts.length; index++) {
      if (
        userAzure.username === accounts.email &&
        accounts.email === "teacher"
      ) {
        setUser("teacher");
      }
      if (
        userAzure.username === accounts.email &&
        accounts.email === "guidance"
      ) {
        setUser("guidance");
      }
    }
  }

  async function nameChecker() {
    alert(true)
    const { data: accounts } = await supabase.from("accounts").select();
    for (let index = 0; index < accounts.length; index++) {
      if (accounts[index].email === userAzure.username) {
        const { data: insertAccounts } = await supabase
          .from("accounts")
          .update({ name: userAzure.name })
          .eq("email", userAzure.username);
      }
    }
    return;
  }

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

      <div className="w-[100%] overflow-hidden flex">
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
        <div className="mt-12 z-0">
          {adminRole && (
            <Routes>
              <Route path="/import" element={<Import />} />
              <Route path="/progress" element={<Progress />} />

              <Route path="/activity" element={<Activity />} />
            </Routes>
          )}

          <Routes>
            <Route path="/Admin" element={<AdminPages />} />
            <Route path="/" element={<Dashboard />} />
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
