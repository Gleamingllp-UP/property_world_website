import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { default_user, user } from "../../../assets/images";
import { getUserDetailsThunk } from "../../../features/user/userSlice";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetailsThunk());
  }, [dispatch]);

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

  return (
    <div className="">
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
        <ImageWithLoader
          src={imageSrc}
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
