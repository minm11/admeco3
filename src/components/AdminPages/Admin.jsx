import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
 import UpdateRole from "./UpdateRole";

const Admin = () => {
  //*Get input data
  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });
  const [Users, setUsers] = useState([]);
  //*Handle onchange of inputs
  function handlechange(e) {
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
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
        console.log("ping pang pung");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //*Read account data
  async function accountData() {
    const { data, error } = await supabase.from("accounts").select();
    try {
      if (error) throw error;
      else {
        setUsers(data);
        console.log("ping pang pung");
      }
    } catch (error) {
      console.log(error);
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

  // accounts Table [name,email,role]

  return (
    <>
      <div className="w-screen min-h-screen h-auto inset-0 flex items-center justify-center place-content-center ">
        <div className="bg-slate-200 p-8 ">
          <h1 className="text-xl font-semibold">Inserting Data</h1>
          <form onSubmit={handleInsert} className="flex flex-col">
            <label className="">Email:</label>
            <input onChange={handlechange} type="text" name="email" />
            <label className="">role:</label>
            <select onChange={handlechange} name="role">
              <option id="0"></option>
              <option id="1">teacher</option>
              <option id="2">guidance</option>
              <option id="3">admin</option>
            </select>
            <button>Submit</button>
          </form>

          <h1 className="text-xl mb-4 font-semibold">Updating Data</h1>
          <div className="max-h-[11rem] overflow-y-auto overflow-x-hidden">
            {Users.map((data, i) => (
              <UpdateRole data={data} i={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
