import React, { useState } from "react";
import supabase from "../../supabaseClient";

const Admin = () => {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });
  async function handleSubmit(e) {
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
      alert(error.message);
      console.log(error);
    }
  }
  // accounts Table [name,email,role]
  function handlechange(e) {
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  }
  return (
    <>
      <div className="w-screen h-screen inset-0 flex items-center justify-center place-content-center ">
        <div className="bg-slate-200 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col">
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
        </div>
      </div>
    </>
  );
};

export default Admin;
