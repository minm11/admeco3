import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";
import { BiChevronRight, BiErrorAlt, BiSolidGroup } from "react-icons/bi";
import { BsCalendar2MinusFill } from "react-icons/bs";
import moment from "moment/moment";

export default function Home({ username }) {
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
        .order("start", { ascending: false });

      if (error) {
        console.error("Error fetching announcement data:", error);
      } else {
        const nonArchivedAnnouncements = data.filter(
          (announcement) => announcement.status !== "archived"
        );

        setAnnouncementLog(nonArchivedAnnouncements);
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
              <Link to="/dashboardteacher">Dashboard</Link>
            </div>
            <div>
              <BiChevronRight id="icon iconchevronRight" className="" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#3C91E6] h-screen p-3 rounded-tr-md overflow-y-auto shadow-black shadow-md">
        {AnnouncementLog.filter(
          (announcement) => announcement.status !== "archived"
        ).map((Announcement) => (
          <div key={Announcement.id} className="flex items-stretch mb-4">
            <div className="z-0 bg-gray-100 p-3 text-start rounded-md hover:bg-gray-400 hover:cursor-pointer w-full h-full text-[20px] overflow-hidden">
              <label className="truncate flex items-center">
                {Announcement.title}
              </label>
              <div className="grid text-[14px] font-thin">
                <label>{`Start: ${moment(Announcement.start).format(
                  "LLL"
                )}`}</label>
                <label>{`Deadline: ${moment(Announcement.deadline).format(
                  "LLL"
                )}`}</label>
              </div>
              <div className="flex text-[14px] font-thin">
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
          </div>
        ))}
      </div>
    </div>
  );
}
