import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { property_world_logo } from "@/assets/images";
import { routes } from "../../../router/routes";
import { pageRoutes } from "../../../router/pageRoutes";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import LogoutModal from "../../auth/logout/LogoutModal";
import { user } from "../../../assets/images";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { getUserPlanThunk } from "../../../features/userPlan/userPlanSlice";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store?.user);
  const [modalShow, setModalShow] = useState(false);

  const isPathActive = (basePath, currentPath) => {
    return currentPath === basePath || currentPath.startsWith(`${basePath}/`);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?._id) {
      dispatch(getUserPlanThunk({ user_id: userData?._id }));
    }
  }, [dispatch, userData?._id]);

  const getValidImageSrc = (...sources) => {
    return sources.find(
      (src) =>
        typeof src === "string" &&
        src.trim() !== "" &&
        /^(https?:\/\/|\/)/.test(src)
    );
  };

  const imageSrc = getValidImageSrc(
    userData?.profile_picture,
    userData?.agent_photo,
    userData?.agency_logo,
    user
  );

  const isAgentOrAgency =
    userData?.role !== "Individual" && userData?.role !== "guest";

  const visibleRoutes = routes
    ?.filter((route) => {
      if (!route.isPrivate || !route.isDashboard) return false;
      if (route.isVisibleInDash === true) return true;
      if (route.isVisibleInDash === "agentOrAgency") return isAgentOrAgency;
      return false;
    })
    .sort((a, b) => a?.id - b?.id);

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
              src={imageSrc}
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
          {visibleRoutes &&
            visibleRoutes?.map(({ id, path, name, icon: Icon }) => {
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
