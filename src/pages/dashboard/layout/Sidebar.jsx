import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { property_world_logo } from "@/assets/images";
import { routes } from "../../../router/routes";
import { pageRoutes } from "../../../router/pageRoutes";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import LogoutModal from "../../auth/logout/LogoutModal";
import { default_user } from "../../../assets/images";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store?.user);
  const [modalShow, setModalShow] = useState(false);

  const isPathActive = (basePath, currentPath) => {
    return currentPath === basePath || currentPath.startsWith(`${basePath}/`);
  };

  return (
    <>
      <div
        className="custom-sidebar text-white p-2 vh-100 "
        style={{ width: "300px", position: "fixed" }}
      >
        <img
          src={property_world_logo}
          alt="Logo"
          className=""
          style={{
            cursor: "pointer",
            width: "130px",
            objectFit: "contain",
          }}
          onClick={() => navigate(pageRoutes.HOME_PAGE)}
        />

        <hr className="my-2" />
        {userData && Object.entries(userData)?.length > 0 && (
          <div className="d-flex flex-column align-items-center text-white p-3">
            <ImageWithLoader
              src={
                userData?.user_type?.name === "Agent" && userData?.agent_photo
                  ? userData?.agent_photo
                  : userData?.user_type?.name === "Individual" &&
                    userData?.profile_picture
                  ? userData?.profile_picture
                  : default_user
              }
              alt="Profile"
              className="profile-img mb-3"
            />
            <h5 className="text-center">
              {`${userData?.first_name} ${userData?.last_name}`}
            </h5>
            <p className="text-center small">{userData?.email || ""}</p>
            <hr className="my-2 text-black" />

            <button
              className="btn btn-visit mb-3"
              onClick={() => navigate(pageRoutes.HOME_PAGE)}
            >
              GO TO WEBSITE
            </button>
          </div>
        )}

        <hr className="my-2" />
        <ul className="nav flex-column">
          {routes
            ?.filter((routes) => routes?.isPrivate && routes?.isDashboard && routes?.isVisibleInDash)
            .sort((a, b) => a?.id - b?.id)
            .map(({ id, path, name, icon: Icon }) => {
              const isActive = isPathActive(path, location.pathname);
              return (
                <Link
                  key={id}
                  to={path}
                  className={`d-flex align-items-center gap-2 px-3 py-2  transition ${
                    isActive
                      ? "bg-white text-primary fw-semibold shadow-sm  rounded-3"
                      : "text-black bg-transparent hover-bg-white bg-opacity-10"
                  }`}
                  style={{
                    transition: "background-color 0.2s, color 0.2s",
                  }}
                >
                  {Icon && (
                    <Icon
                      className="me-2"
                      style={{ width: "1.25rem", height: "1.25rem" }}
                    />
                  )}
                  <span>{name}</span>
                </Link>
              );
            })}
          <Link
            onClick={() => {
              setModalShow(true);
            }}
            className={`d-flex align-items-center gap-2 px-3 py-2 
              transition text-black bg-transparent hover-bg-white bg-opacity-10`}
          >
            <LogOut
              className="me-2"
              style={{ width: "1.25rem", height: "1.25rem" }}
            />
            <span>Logout</span>
          </Link>
        </ul>
        <LogoutModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};

export default Sidebar;
