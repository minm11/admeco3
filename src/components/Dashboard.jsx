import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";
import { BiChevronRight, BiErrorAlt, BiSolidGroup } from "react-icons/bi";
import { BsCalendar2MinusFill } from "react-icons/bs";
import moment from "moment/moment";

export default function Home({ username, openMenu}) {
  const [activities, setActivities] = useState([]);

  const [studentData, setStudentData] = useState([]);

  const [AnnouncementLog, setAnnouncementLog] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [totalSubmissionCount, setTotalSubmissionCount] = useState(0);

  const fetchStudentData = async () => {
    try {
      let { data: studentInformation, error } = await supabase
        .from("StudentInformation")
        .select("*")
        .order("created_at", { ascending: false }); // Order by created_at in descending order
      if (error) {
        alert(error);
      } else {
        setStudentData(studentInformation);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  async function activityData() {
    try {
      const { data, error } = await supabase.from("activity").select("*");
      if (error) throw error;

      // Sort activities by dateTime in descending order (latest to earliest)
      const sortedActivities = data.sort((a, b) => {
        return new Date(b.dateTime) - new Date(a.dateTime);
      });

      setActivities(sortedActivities);
      console.log("Success >_< ");
    } catch (error) {
      console.error("Error", error.message);
    }
  }

  async function announcementData() {
    try {
      const { data, error } = await supabase
        .from("Announcements")
        .select("*")
        .order("start", { ascending: false }); // Order by start date in descending order

      if (error) {
        console.error("Error fetching announcement data:", error);
      } else {
        setAnnouncementLog(data);
        console.log("Success announcement data >_< ");
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  }

  //*Realtime Reading of Data
  useEffect(() => {
    activityData();

    supabase
      .channel("room2")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activity" },
        () => {
          activityData();
        }
      )
      .subscribe();

    announcementData();
    supabase
      .channel("room2")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Announcements" },
        () => {
          announcementData();
        }
      )
      .subscribe();
  }, []);

  return (

    
     
   

    <div
      id="main"
      className="pt-9 pb-28 px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%]"
    >
      <div
        id="headTitle"
        className="flex items-center justify-between gap-16 flex-wrap"
      >
        <div id="container left">
          <h1 className="text-4xl font-semibold mb-5 text-black">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-black">
              <Link to="">Dashboard</Link>
            </div>
            <div>
              <BiChevronRight id="icon iconchevronRight" className="" />
            </div>
          </div>
        </div>
      </div>

      <div className=" flex-col bg-[#3C91E6] md:h-[38%] h-[28%] p-3 rounded-tr-md overflow-y-auto w-[50%] shadow-black shadow-md ">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="flex">
            <tr>
              <th className="text-4xl font-semibold mb-5 text-black p-3">
                Deadline Announcement
              </th>
              <th className="flex items-center gap-4"></th>
            </tr>
          </thead>

          <tbody className="">
            {AnnouncementLog.map((Announcement) => (
              <ul
                key={Announcement.id}
                className="flex"
                onClick={() => {
                  setModalData(Announcement);
                  setIsModalOpen(true);
                }}
              >
                <li colSpan="2" className="m-2 flex items-center gap-4">
                  <div
                    className=" z-0 bg-gray-100 p-3 text-start rounded-md hover:bg-gray-400 
                   hover:cursor-pointer w-[230px] h-[120px] text-[15px] overflow-hidden 
                   duration-500 hover:shadow-lg hover:shadow-black p-3"
                  >
                    <label className="truncate flex items-center">
                      {Announcement.title}
                    </label>
                    <div className="grid text-[12px] font-thin">
                      <label>{`Start: ${moment(Announcement.start).format(
                        "LLL"
                      )}`}</label>
                      <label>{`Deadline: ${moment(Announcement.deadline).format(
                        "LLL"
                      )}`}</label>
                    </div>
                    <div className="flex text-[12px] font-thin">
                      Teacher Submissions:
                      <div className="text-blue-600 ml-2">
                        {`${
                          activities.filter(
                            (activity) =>
                              moment(activity.dateTime).isSameOrAfter(
                                Announcement.start
                              ) &&
                              moment(activity.dateTime).isBefore(
                                Announcement.deadline
                              )
                          ).length
                        }`}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </tbody>
        </table>
      </div>

      <div
        id="table data"
        className="flex gap-6 mt-[68px] ml-6 text-black overflow-y"
      >
        <div
          id="progress"
          className="basis-[50%] overflow-y-auto"
          style={{
            border: "5px solid #3C91E6 ",
            borderRadius: "8spx",
            maxHeight: "400px",
          }}
        >
          <div id="head" className="mb-5 bg-blue-500 sticky top-0">
            <h1 className="text-2xl font-semibold text-center mx-auto text-white  ">
              Progress
            </h1>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-[1px]">
                <th className="pb-1 pl-8 text-sm text-left bottom-1 border-solid border-[#eee]">
                  Student Name
                </th>
                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                  Date Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                studentData.map((student, index) => (
                  <tr key={index} className="px-10 hover:bg-[#eee]">
                    <td className="p-7">
                      <p className="pl-1">
                        {student.name ? student.name : "N/A"}
                      </p>
                    </td>

                    <td>
                      <p className="pl-1">
                        {moment(student.created_at).format("yyyy-M-D")}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div
          id="activity"
          className="basis-[50%] overflow-y-auto "
          style={{
            border: "5px solid #3C91E6 ",
            borderRadius: "8px",
            maxHeight: "400px",
          }}
        >
          <div id="head" className="flex mb-7 bg-blue-500 sticky top-0">
            <h1 className="text-2xl font-semibold text-center mx-auto text-white p-2 ">
              Activity
            </h1>
          </div>

          <div className="  border-collapse ">
            <thead>
              <tr className="border-b-[1px]  flex  gap-[200px]">
                <th className="pb-1 pl-8 text-sm text-left bottom-1 border-solid border-[#eee]">
                  UserName
                </th>
                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                  TimeClicked
                </th>
                <th className="pb-1 text-sm text-left bottom-1 border-solid border-[#eee]">
                  Status
                </th>
              </tr>
            </thead>
            {activities.map((activity) => (
              <ul className="mt-2 ">
                <li className="border-x-2 mb-5 bg-[#eee] rounded-lg px-6 py-6  flex gap-20">
                  <div className="flex items-center">
                    <BsCalendar2MinusFill className="text-[#ff0000]" />
                    <h1 className="ml-4">{activity.user}</h1>
                  </div>

                  <h1>{activity.dateTime}</h1>
                  <h1>{activity.act}</h1>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
