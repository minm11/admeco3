import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import UpdateRole from "./AdminPages/UpdateRole";

const UserRoleCreation = () => {
  //*Get input data
  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });
  const [Users, setUsers] = useState([]);

  //*Handle onchange of inputs
  function handleChange(e) {
    setFormData((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  //*Insert Submit
  async function handleInsert(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("accounts")
      .insert([{ email: formData.email, role: formData.role }]);

    try {
      if (error) throw error;
      else {
        alert("Data Inserted Successfully");
      }
    } catch (error) {
      alert("Error", error.message);
      console.log("Error", error.message);
    }
  }

  //*Read account data
  async function accountData() {
    const { data, error } = await supabase.from("accounts").select();
    try {
      if (error) throw error;
      else {
        setUsers(data);
        console.log("Success >_< ");
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  }

  //*Realtime Reading of Data
  useEffect(() => {
    accountData();
    supabase
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "accounts" },
        () => {
          accountData();
        }
      )
      .subscribe();
  }, []);

  const [searchUpdate, setUpdate] = useState("");
  const [searchDelete, setDelete] = useState("");
  const [searchUpdateName, setUpdateName] = useState("");
  const [searchDeleteName, setDeleteName] = useState("");

  const filteredUsers = Users.filter(
    (data) =>
      data.role.toLowerCase().includes(searchUpdate.toLowerCase()) &&
      data.email.toLowerCase().includes(searchUpdateName.toLowerCase())
  );

  const filteredDeleteUsers = Users.filter(
    (data) =>
      data.role.toLowerCase().includes(searchDelete.toLowerCase()) &&
      data.email.toLowerCase().includes(searchDeleteName.toLowerCase())
  );

  

  return (
    <div className="min-h-screen flex items-center justify-center  w-screen gap-2">
      <div className="bg-white- p-8 rounded shadow-md shadow-black  w-full max-w-md bg-gray-300">
        <h1 className="text-xl font-semibold mb-6 text-indigo-700 ">
          Inserting Data
        </h1>
        <form onSubmit={handleInsert} className="flex flex-col space-y-4">
          <div>
            <label className="text-gray-700">Email:</label>
            <input
              onChange={handleChange}
              type=" text"
              name="email"
              className="border rounded px -2 py -1 w-full focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-gray-700">Role:</label>
            <select
              onChange={handleChange}
              name="role"
              className="border rounded px -2 py -1 w- full focus:outline-none focus:border-indigo-500"
            >
              <option value=""></option>
              <option value="teacher" className="text-green-500">
                Teacher
              </option>
              <option value="guidance" className="text-blue-500">
                Guidance
              </option>
              <option value="admin" className="text-red-500">
                admin
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indgo"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="bg-white- p-8 rounded shadow-md shadow-black  w-full max-w-md bg-gray-300 ">
        <h1 className="text-xl mt-8 font-semibold mb-4 text-indigo-700 ">
          Updating Data
        </h1>

        <div className="mb-4">
          <label className="text-gray-700">Search by Role:</label>
          <input
            type="text"
            value={searchUpdate}
            onChange={(e) => setUpdate(e.target.value)}
            className="border rounded px-2 py-1 w-full focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700">Search by Email:</label>
          <input
            type="text"
            value={searchUpdateName}
            onChange={(e) => setUpdateName(e.target.value)}
            className="border rounded px-2 py-1 w-full focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="max-h-[14rem] overflow-y-auto overflow-x-hidden">
          {filteredUsers.map((data, i) => (
            <div key={i} className="text-center bg-grey ">
              <p
                className="text-sm text-gray-600 mb-2"
                style={{ fontSize: "18px" }}
              >
                Role: {data.role}
              </p>
              <UpdateRole handle={"Update"} data={data} i={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white- p-8 rounded shadow-md shadow-black  w-full max-w-md bg-gray-300 ">
        <h1 className="text-xl mt-8 font-semibold mb-4 text-indigo-700 ">
          Delete Data
        </h1>
        <div className="mb-4">
          <label className="text-gray-700">Search by Role:</label>
          <input
            type="text"
            value={searchDelete}
            onChange={(e) => setDelete(e.target.value)}
            className="border rounded px-2 py-1 w-full focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Search by Email:</label>
          <input
            type="text"
            value={searchDeleteName}
            onChange={(e) => setDeleteName(e.target.value)}
            className="border rounded px-2 py-1 w-full focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="max-h-[14rem] overflow-y-auto overflow-x-hidden">
          {filteredDeleteUsers.map((data, i) => (
            <div key={i} className="text-center bg-grey ">
              <p
                className="text-sm text-gray-600 mb-2"
                style={{ fontSize: "18px" }}
              >
                Role: {data.role}
              </p>
              <UpdateRole handle={"Delete"} key={i} data={data} i={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRoleCreation;
