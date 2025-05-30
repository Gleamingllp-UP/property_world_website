import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { getUserData,userLogOut } from "../../../features/user/userSlice";
const Header = () => {
   const { userData } = useSelector((store) => store?.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogOut());
  };

useEffect(() => {
  dispatch(getUserData());
}, []);

  console.log("user",userData);

  return (
    <>
      <header className="bg-light d-flex justify-content-between align-items-center p-2" style={{ marginLeft: "250px" }}>
        <h2>Dashboard</h2>
        
        <div className="d-flex align-items-center gap-3">
          <FaUserCircle size={24} />
          <span>{`${userData?.first_name || ''} ${userData?.last_name || ''}`}</span>
          <FaCog size={20} style={{ cursor: "pointer" }} title="Settings" />
          <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" />
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
