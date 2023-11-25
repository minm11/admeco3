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
import { v4 as uuidv4 } from "uuid";

export default function App({ msalinstance }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState();
  const [userAzure, setUserAzure] = useState(null);
  const [adminRole, setAdminRole] = useState(false);
  const [accountsInfo, setAccountsInfo] = useState([]);

  useEffect(() => {
    tokenChecker();
    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "accounts" },
        (payload) => {
          tokenChecker();
        }
      )
      .subscribe();
  }, []);

  async function tokenChecker() {
    const { data: accounts } = await supabase.from("accounts").select();
    for (let index = 0; index < accounts.length; index++) {
      if (window.localStorage.getItem("susi") === accounts[index].accessToken) {
        setUser(accounts[index].role);
        return;
      }
      if (window.localStorage.getItem("susi") !== accounts[index].accessToken) {
        window.localStorage.clear();
        setUser(false);

        return;
      }
    }
  }
  console.log(user);
  return (
    <div className="flex h-screen ">
      <div className=" overflow-hidden flex">
        <NavBar
          setOpenMenu={setOpenMenu}
          openMenu={openMenu}
          msalinstance={msalinstance}
          setUser={setUser}
          userAzure={userAzure}
          setUserAzure={setUserAzure}
          user={user}
          setAdminRole={setAdminRole}
          uuidv4={uuidv4()}
        />
        <div
          className={`${
            openMenu
              ? "w-[280px] h-screen transition-transform duration-200 overflow-hidden"
              : "w-0 hidden h-screen transition-transform duration-200"
          }`}
        >
          {user && <SideBar openMenu={openMenu} user={user} />}
        </div>

        <div className="mt-12 z-0">
          {adminRole && (
            <Routes>
              <Route path="/activity" element={<Activity />} />
            </Routes>
          )}



          <Routes>
            <Route path="/Admin" element={<AdminPages />} />
            <Route path="/import" element={<Import />} />
            <Route path="/progress" element={<Progress />} />
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
