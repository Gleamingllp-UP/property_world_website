import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { default_user } from "../../../assets/images";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store?.user);

  return (
    <div className="p-4">
      <h2 className="fw-bold text-m">
        Welcome, {`${userData?.first_name} ${userData?.last_name}`}
      </h2>
      <p className="text-muted">
        From your account dashboard, you can easily check & view your recent
        activity, manage your password and account details.
      </p>

      <div
        className=" p-2 mt-4 d-flex flex-row align-items-center"
        style={{ maxWidth: "600px" }}
      >
        <img
          src={
            userData?.user_type?.name === "Agent" && userData?.agent_photo
              ? userData?.agent_photo
              : userData?.user_type?.name === "Individual" &&
                userData?.profile_picture
              ? userData?.profile_picture
              : default_user
          }
          alt="Profile"
          className="rounded-4 border"
          style={{
            width: "150px",
            height: "170px",
            objectFit: "cover",
            marginRight: "20px",
          }}
        />
        <div>
          <h5 className="mb-1 fw-semibold ">
            {`${userData?.first_name} ${userData?.last_name}`}
          </h5>
          <p className="mb-1 small">
            Mobile:{" "}
            <span className="text-dark ">{userData?.phone_number || ""}</span>
          </p>
          <p className="mb-1 small">
            Email: <span className="text-dark ">{userData?.email || ""}</span>
          </p>
          <button
            className="btn btn-link p-0 text-decoration-none small"
            onClick={() => navigate(pageRoutes.MY_PROFILE)}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
