import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Progress from "./components/Progress";
import Activity from "./components/Activity";
import Import from "./components/Import";
import ImportGuidance from "./components/ImportGuidance";
import { Login } from "./components/Login";
import supabase from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";
import UserRoleCreation from "./components/UserRoleCreation";
import Restore from "./components/Restore";
//import { name } from "@azure/msal-browser/dist/packageMetadata";

export default function App({ msalinstance }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState();
  const [userAzure, setUserAzure] = useState({});
  const [adminRole, setAdminRole] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [UserName, setUserName] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  var loginResponse;

  const handleButtonClick = async () => {
    const now = new Date();
    const formattedDate = now.toLocaleString();
    setCurrentDate(formattedDate);
  };

  // //*Read account data
  // async function activityData() {
  //   const { data, error } = await supabase.from("activity").select("*");
  //   try {
  //     if (error) throw error;
  //     else {
  //       setActivityData(data);
  //       console.log("Success >_< ");
  //     }
  //   } catch (error) {
  //     console.error("Error", error.message);
  //   }
  // }

  // reads username then throw it where you want
  const userName = async (info) => {
    const { data: accounts, error } = await supabase
      .from("accounts")
      .select("name")
      .eq("accessToken", window.localStorage.getItem("susi"));

    if (error) {
      console.error("Error", error.message);
    }
    if (accounts) setUserName(accounts[0].name);
    return;
  };

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

  async function tokenChecker() {
    if (window.localStorage.getItem("susi")) {
      const { data: accounts } = await supabase.from("accounts").select();

      for (let index = 0; index < accounts.length; index++) {
        if (
          accounts[index].accessToken === window.localStorage.getItem("susi")
        ) {
          setUser(accounts[index].role);
          setLoggedIn(true);
          userName();
          return;
        }
      }
      window.localStorage.clear();
      setUser(false);
      return;
    }
  }

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
          UserName={UserName}
          userName={userName}
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
            <Route
              path="/import"
              element={
                <Import
                  UserName={UserName}
                  userName={userName}
                  currentDate={currentDate}
                  handleButtonClick={handleButtonClick}
                />
              }
            />
            <Route
              path="/importGuidance"
              element={
                <ImportGuidance
                  UserName={UserName}
                  userName={userName}
                  currentDate={currentDate}
                  handleButtonClick={handleButtonClick}
                />
              }
            />
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
            <Route path="/restore" element={<Restore UserName={UserName} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
