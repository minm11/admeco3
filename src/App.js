import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Progress from "./components/Progress";
import Activity from "./components/Activity";
import Import from "./components/Import";
import SearchStudent from "./components/SearchStudent";
import { Login } from "./components/Login";
import supabase from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";
import UserRoleCreation from "./components/UserRoleCreation";
import Restore from "./components/Restore";
import Loginpage from "./components/Loginpage";
import SetDeadline from "./components/SetDeadline";
import ListImportFile from "./components/ListImportFile";
import CreateReport from "./components/CreateReport";
import DashboardTeacher from "./components/DashboardTeacher";
import DashboardBlanks from "./components/DashboardBlanks";
import ImportHistory from "./components/ImportHistory";
import ReportStatus from "./components/ReportStatus";
import RecentReport from "./components/RecentReport";
import PastAnnouncement from "./components/PastAnnouncement";

export default function App({ msalinstance }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState();
  const [userAzure, setUserAzure] = useState({});
  const [adminRole, setAdminRole] = useState(false);
  const [teacherRole, setTeacherRole] = useState(false);
  const [guidanceRole, setGuidanceRole] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [UserName, setUserName] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  var loginResponse;

  const handleButtonClick = async () => {
    const now = new Date();
    const formattedDate = now.toLocaleString();
    setCurrentDate(formattedDate);
  };

  // reads username then throw it where you want
  const userName = async (info) => {
    const { data: accounts, error } = await supabase
      .from("accounts")
      .select("name")
      .eq("accessToken", window.localStorage.getItem("susi"));

    if (error) {
      console.error("Error", error.message);
    }
    if (accounts) setUserName(accounts[0]?.name);
    return;
  };

  async function tokenChecker() {
    if (window.localStorage.getItem("susi")) {
      const { data: accounts } = await supabase.from("accounts").select();

      for (let index = 0; index < accounts?.length; index++) {
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

  return (
    <div className="flex h-screen  ">
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
          setGuidanceRole={setGuidanceRole}
          setTeacherRole={setTeacherRole}
          uuidv4={uuidv4()}
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          UserName={UserName}
          userName={userName}
        />

        {loggedIn ? null : <Loginpage />}

        <div
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
          className={`${
            openMenu
              ? "w-[190px] h-screen transition-transform duration-200 overflow-hidden "
              : "w-0 hidden h-screen transition-transform duration-1000 ml-12"
          }`}
        >
          <SideBar
            openMenu={openMenu}
            user={user}
            msalinstance={msalinstance}
            loginResponse={loginResponse}
            adminRole={adminRole}
            teacherRole={teacherRole}
            guidanceRole={guidanceRole}
            UserName={UserName}
            userName={userName}
          >
            {/* Render the logo and hide the name when openMenu is true */}
            {openMenu ? <div>{/* Your logo component goes here */}</div> : null}
          </SideBar>
        </div>

        <div className="mt-12 z-0">
          <Routes>
            {/* Check if the user is logged in */}
            {loggedIn ? (
              <>
                <Route path="/activity" element={<Activity />} />

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
                <Route path="/reportstatus" element={<ReportStatus />} />
                <Route
                  path="/searchstudent"
                  element={
                    <SearchStudent
                      UserName={UserName}
                      userName={userName}
                      currentDate={currentDate}
                      handleButtonClick={handleButtonClick}
                    />
                  }
                />
                 <Route
                  path="/recentreport"
                  element={
                    <RecentReport
                      UserName={UserName}
                      userName={userName}
                      currentDate={currentDate}
                      handleButtonClick={handleButtonClick}
                    />
                  }
                />
                <Route path="/progress" element={<Progress />} />
                <Route path="/setdeadline" element={<SetDeadline />} />
                <Route path="/pastannouncement" element={<PastAnnouncement />} />
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/dashboardteacher"
                  element={<DashboardTeacher />}
                />

                <Route path="/userrole" element={<UserRoleCreation />} />
                <Route
                  path="/dashboardblanks"
                  element={
                    <DashboardBlanks
                      openMenu={openMenu}
                      setOpenMenu={setOpenMenu}
                    />
                  }
                />
                <Route
                  path="/restore"
                  element={<Restore UserName={UserName} />}
                />
                <Route
                  path="/importhistory"
                  element={
                    <ImportHistory
                      UserName={UserName}
                      userName={userName}
                      currentDate={currentDate}
                    />
                  }
                />

                <Route path="/listimportfile" element={<ListImportFile />} />

                <Route
                  path="/createreport"
                  element={
                    <CreateReport
                      UserName={UserName}
                      userName={userName}
                      currentDate={currentDate}
                    />
                  }
                />
              </>
            ) : (
              // Render the Login component if not logged in
              <Route
                path="/login"
                element={
                  <Login
                    openMenu={openMenu}
                    user={user}
                    msalinstance={msalinstance}
                    loginResponse={loginResponse}
                    teacherRole={teacherRole}
                    guidanceRole={guidanceRole}
                    adminRole={adminRole}
                    UserName={UserName}
                    userName={userName}
                  />
                }
              />
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}
