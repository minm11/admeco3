import React, { useState } from "react";
import supabase from "../../supabaseClient";

//*Handle Update Submit

// new modify nasa baba yung old code incase mali
const UpdateRole = ({ data, i, handle }) => {
  const [role, setRole] = useState("");
  console.log(role);

  const handleDelete = async (e) => {
    
    try {
      const { error } = await supabase
        .from("accounts")
        .delete()
        .eq("email", data.email);

      if (error) {
        throw error;
      } else {
        console.log("Deleted Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ role })
        .eq("email", data.email);

      if (error) {
        throw error;
      } else {
        console.log("Success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  function handleSwitch() {
    if (handle === "Update") {
      handleUpdate();
    } else {
      handleDelete();
    }
  }
  console.log(handle);
  // new modify with new design recommend :)
  return (
    <div className="max-w-sm mx-auto my-4 p-6 bg-white rounded-md shadow-md">
      <form key={i} onSubmit={handleSwitch} className="flex flex-col">
        <label className="mb-2 text-center">{data.email}</label>
        
        {handle == "Update" && (
          <>
          <label className="mb-2 text-center">Set Role</label>
          <select
            onChange={(e) => setRole(e.target.value)}
            name="role"
            value={role}
            className="border p-2 rounded-md mb-4"
          >
            <option value=""></option>
            <option value="teacher">Teacher</option>
            <option value="guidance">Guidance</option>
            <option value="admin">Admin</option>
          </select>
          </>
          
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >{`${handle == "Update" ? "Submit" : "delete"}`}</button>{" "}
        {/* added type attribute */}
      </form>
    </div>
  );
};

export default UpdateRole;
//incase mali yung modify nandito yung old code

{
  /* old code
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
  } */
}

{
  /*   old code
{
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
*/
}
