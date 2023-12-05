import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Progress from "./components/Progress";
import Activity from "./components/Activity";
import Import from "./components/Import";
import { Login } from "./components/Login";
import supabase from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";
import UserRoleCreation from "./components/UserRoleCreation";

export default function App({ msalinstance }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState();
  const [userAzure, setUserAzure] = useState({});
  const [adminRole, setAdminRole] = useState(false);
  const [accountsInfo, setAccountsInfo] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  var loginResponse;

  useEffect(() => {
    tokenChecker();
    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "accounts" },
        (payload) => {
          tokenChecker();
        }
      )
      .subscribe();
  }, []);



  const userName = async (info) => {
    const { data: accounts } = await supabase
      .from("accounts")
      .select()
      .eq("accessToken", window.localStorage.getItem("susi"));

    console.log(accounts);
    return;
  };

  async function tokenChecker() {
    const { data: accounts } = await supabase.from("accounts").select();
    userName();
    for (let index = 0; index < accounts.length; index++) {
      if (accounts[index].accessToken === window.localStorage.getItem("susi")) {
        setUser(accounts[index].role);
        setLoggedIn(true)
        return;
      }
    }
    window.localStorage.clear();
    setUser(false);

    return;
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
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
        />
        <div
          className={`${
            openMenu
              ? "w-[280px] h-screen transition-transform duration-200 overflow-hidden"
              : "w-0 hidden h-screen transition-transform duration-200"
          }`}
        >
          
           <SideBar
            openMenu={openMenu}
            user={user}
            msalinstance={msalinstance}
            loginResponse={loginResponse}
            adminRole={adminRole}
          /> 
        </div>

        <div className="mt-12 z-0">
          <Routes>
            <Route path="/activity" element={<Activity />} />
          </Routes>

          <Routes>
            <Route path="/import" element={<Import />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/Login"
              element={
                <Login
                  msalinstance={msalinstance}
                  loginResponse={loginResponse}
                />
              }
            />
            <Route path="/userrole" element={<UserRoleCreation />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
