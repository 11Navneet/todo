import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";

const Navbar = ({ userInfo }) => {
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl text-black font-medium py-2">Todo</h2>
      <ProfileInfo userInfo={userInfo} />
    </div>
  );
};

export default Navbar;
