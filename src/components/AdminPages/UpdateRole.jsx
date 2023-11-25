import React, { useState } from "react";
import supabase from "../../supabaseClient";

//*Handle Update Submit

const UpdateRole = ({ data, i, handleUpdate }) => {
  const [Role, setRole] = useState("");
  console.log(Role);

  async function handleUpdate(e) {
    e.preventDefault();
    const { error: fail } = await supabase
      .from("accounts")
      .update({ role: Role })
      .eq("email", data.email);

    try {
      if (fail) throw fail;
      else {
        console.log("Success");
      }
    } catch (fail) {
      console.log(fail);
    }
  }
  return (
    <form key={i} onSubmit={handleUpdate} className="flex flex-col">
      <label className="">{data.email}:</label>
      <label className="">Set Role:</label>
      <select onChange={(e) => setRole(e.target.value)} name="role">
        <option id="0"></option>
        <option id="1">teacher</option>
        <option id="2">guidance</option>
        <option id="3">admin</option>
      </select>
      <button>Submit</button>
    </form>
  );
};

export default UpdateRole;
