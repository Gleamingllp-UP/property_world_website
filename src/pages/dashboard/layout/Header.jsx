import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { getUserData } from "../../../features/user/userSlice";

import LogoutModal from "../../auth/logout/LogoutModal";
const Header = () => {
  const [modalShow, setModalShow] = useState(false);

  const { userData } = useSelector((store) => store?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <>
      <header
        className="bg-dark text-white d-flex justify-content-between align-items-center "
        style={{ marginLeft: "300px",padding:"18px" }}
      >
        <h4 className="mb-0">Dashboard</h4>
        {userData?.first_name && (
          <div className="d-flex align-items-center gap-3">
            <FaUserCircle size={24} />
            <span>{`${userData?.first_name || ""} ${
              userData?.last_name || ""
            }`}</span>
            <FaCog size={20} style={{ cursor: "pointer" }} title="Settings" />
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setModalShow(true)}
            >
              <FaSignOutAlt className="me-1" />
              Logout
            </button>
          </div>
        )}
      </header>
      <LogoutModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Header;
