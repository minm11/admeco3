import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import supabase from "../supabaseClient";
import { BsCalendar2MinusFill } from "react-icons/bs";
import moment from "moment/moment";
import { clear } from "@testing-library/user-event/dist/clear";

const SetDeadline = () => {
  const [title, setTitle] = useState("");
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateDeadline, setSelectedDateDeadline] = useState(null);
  const [activities, setActivities] = useState([]);
  const [AnnouncementLog, setAnnouncementLog] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [totalSubmissionCount, setTotalSubmissionCount] = useState(0);

  const handleDateDeadlineChange = (date) => {
    setSelectedDateDeadline(date);
  };

  const handleDateStart = (dates) => {
    setSelectedDateStart(dates);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSetDeadline = async () => {
    try {
      const filteredActivities = activities.filter((activity) =>
        moment(activity.dateTime).isSameOrAfter(selectedDateStart)
      );

      setActivities(filteredActivities);

      // Insert data into the 'announcements' table
      const { data, error } = await supabase.from("Announcements").insert([
        {
          title: title,
          start: selectedDateStart,
          deadline: selectedDateDeadline,
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
        alert("Success Announcement");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

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
  //* Realtime Reading of Data
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


  const handleDeleteAnnouncement = async (announcement) => {
    try {
      // Delete the announcement from the 'Announcements' table
      const { data, error } = await supabase
        .from("Announcements")
        .delete()
        .eq("id", announcement.id);

      if (error) {
        console.error("Error deleting data:", error);
      } else {
        console.log("Data deleted successfully:", data);

        alert(`Announcement "${announcement.title}" deleted successfully`);

        // Update the AnnouncementLog state by excluding the deleted row
        setAnnouncementLog((prevAnnouncements) =>
          prevAnnouncements.filter((item) => item.id !== announcement.id)
        );

        setSelectedRow(null); // Clear the selected row after deletion
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div
      id="main"
      className="pt-9 pb-28 px-5 font-lato mt-7 max-h-screen overflow-y-auto fixed w-[100%]"
    >
      <div id="headTitle" className="flex items-center gap-16">
        <div id="container left">
          <h1 className="text-4xl font-semibold mb-5 text-black">
          Create Announcement
          </h1>
          <div className="flex items-center gap-4">
            <Link to="" className="hover:text-[#3C91E6]">
              Home
            </Link>
            <BiChevronRight id="icon iconchevronRight" className="" />
            <Link to="/setDeadline" className="hover:text-[#3C91E6]">
              Create Announcement
            </Link>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter title"
              className="w-full h-[35px] border rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <DatePicker
              selected={selectedDateStart}
              onChange={handleDateStart}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select a start"
              className="w-full h-[35px] border rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <DatePicker
              selected={selectedDateDeadline}
              onChange={handleDateDeadlineChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select a deadline"
              className="w-full h-[35px] border rounded-md p-2"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <button
                onClick={() => {
                  handleSetDeadline();
                }}
                className="md:w-[97%] w-[100%] h-[35px] bg-[#0074B7] text-white  rounded-md hover:bg-[#3282b5]"
              >
                Set Deadline
              </button>
            </div>

            <div>
              <button
                onClick={() => {
                  setTitle("");
                  setSelectedDateStart(null);
                  setSelectedDateDeadline(null);
                }}
                className="md:w-[97%] w-[100%] h-[35px] bg-[#0074B7] bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="flex-col bg-[#c8d7e5] md:h-[38%] h-[28%] p-3 rounded-tr-md overflow-y-auto w-[70%] shadow-black shadow-md">
          <table className="min-w-full bg-white border border-gray-300 p-3">
            <thead className="flex">
              <tr>
                <th className="text-4xl font-semibold mb-5 text-black p-3">
                 Announcement
                </th>
                <th className="flex items-center gap-4"></th>
              </tr>
            </thead>
            <tbody className="flex">
              {AnnouncementLog.map((Announcement) => (
                <tr
                  key={Announcement.id}
                  className={`flex ${
                    selectedRow === Announcement.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setModalData(Announcement);
                    setIsModalOpen(true);
                  }}
                >
                  <td colSpan="2" className="p-3 flex items-center gap-4">
                    <div
                      className="z-0 bg-gray-100 p-3 text-start rounded-md hover:bg-gray-400 hover:cursor-pointer
                   hover:translate-x-3 w-[230px] h-[130px] text-[15px] overflow-hidden duration-500 hover:shadow-lg hover:shadow-black"
                    >
                      <label className="truncate flex items-center">
                        {Announcement.title}
                      </label>
                      <div className="grid text-[12px] font-thin">
                        <label>{`Start: ${moment(Announcement.start).format(
                          "LLL"
                        )}`}</label>
                        <label>{`Deadline: ${moment(
                          Announcement.deadline
                        ).format("LLL")}`}</label>
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
                        <button
                          className="ml-4 p-2 bg-red-500 text-white rounded-md"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the row click event from triggering
                            handleDeleteAnnouncement(Announcement); // Set the selected row ID
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div> </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div
              className="bg-opacity-50 absolute inset-0"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div
              className="bg-white p-8 rounded-md z-10 max-w-2xl overflow-y-auto"
              id="modal-content"
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                position: "relative",
              }}
            >
              <h1 className="text-3xl font-semibold mb-4">{modalData.title}</h1>
              <p className="text-lg mb-4">{`Start: ${moment(
                modalData.start
              ).format("LLL")}`}</p>
              <p className="text-lg mb-4">{`Deadline: ${moment(
                modalData.deadline
              ).format("LLL")}`}</p>
              {/* Show activities within the deadline */}
              {activities
                .filter(
                  (activity) =>
                    moment(activity.dateTime).isSameOrAfter(modalData.start) &&
                    moment(activity.dateTime).isBefore(modalData.deadline)
                )
                .map((activity) => (
                  <ul key={activity.id} className="mt-2">
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
        )}
      </div>
    </div>
  );
};

export default SetDeadline;
