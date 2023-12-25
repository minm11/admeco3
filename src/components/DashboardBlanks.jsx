import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { BsCalendar2MinusFill } from "react-icons/bs";
import supabase from "../supabaseClient";

export default function DashboardBlanks({ setOpenMenu, openMenu }) {
  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    // This code will run when the component is mounted
    handleMenuToggle();
  }, []); // The empty dependency array means this effect runs once after the initial render

  return (
    <div>
      {/* Your component JSX goes here */}
      <button onClick={handleMenuToggle}>Toggle Menu</button>
    </div>
  );
}
