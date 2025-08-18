import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { property_world_logo } from "@/assets/images";
import { routes } from "../../../router/routes";
import { pageRoutes } from "../../../router/pageRoutes";
import { useDispatch, useSelector } from "react-redux";
import { AlignJustify, LogOut, SquarePen } from "lucide-react";
import LogoutModal from "../../auth/logout/LogoutModal";
import { user } from "../../../assets/images";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { getUserPlanThunk } from "../../../features/userPlan/userPlanSlice";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import ProfilePicPreviewModal from "../profile/ProfilePicPreviewModal";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store?.user);
  const [modalShow, setModalShow] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isPathActive = (basePath, currentPath) => {
    return currentPath === basePath || currentPath.startsWith(`${basePath}/`);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?._id) {
      dispatch(getUserPlanThunk({ user_id: userData?._id }));
    }
  }, [dispatch, userData?._id]);

  useEffect(() => {
    const lightbox2 = GLightbox({
      selector: ".lightbox2",
    });

    return () => {
      lightbox2.destroy();
    };
  }, [userData?.profile_picture, userData?.agent_photo]);

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

  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(imageSrc);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setSelectedFile(file);
      setShowPreview(true);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="mobile_menu">
        <div>
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
        </div>
        <Button variant="primary" onClick={handleShow}>
          <AlignJustify />
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <div
              className="custom-sidebar text-white vh-100 "
              style={{ width: "100%" }}
            >
              {userData && Object.entries(userData)?.length > 0 && (
                <div className="d-flex flex-column align-items-center text-white p-3">
                  <div className="position-relative">
                    <a
                      href={imageSrc}
                      className="lightbox2"
                      data-glightbox="type: image"
                    >
                      <ImageWithLoader
                        src={imageSrc}
                        alt="Profile"
                        className="profile-img mb-3"
                      />
                    </a>

                    {/* Camera Icon Button */}
                    <button
                      type="button"
                      className="btn btn-sm text-white btn-secondary rounded-circle position-absolute"
                      style={{ bottom: "19px", right: "0", padding: "3px" }}
                      onClick={triggerFileInput}
                    >
                      <SquarePen size={17} strokeWidth={2} />
                    </button>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="d-none"
                    />
                  </div>
                  {userData?.first_name && userData?.email && (
                    <>
                      <h5 className="text-center text-danger fw-medium">
                        {`${userData?.first_name} ${userData?.last_name}`}
                      </h5>
                      <p className="text-center small text-danger fw-medium">
                        {userData?.email || ""}
                      </p>
                    </>
                  )}

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
                      <button
                        key={id}
                        // to={path}
                        onClick={() => {
                          navigate(path);
                          handleClose();
                        }}
                        className={`d-flex align-items-center gap-2 px-3 py-2 menu_border-bottom  
                          transition ${
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
                      </button>
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
              <LogoutModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <ProfilePicPreviewModal
                preview={preview}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                selectedFile={selectedFile}
              />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className="desktop_menu">
        <div
          className="custom-sidebar text-white vh-100 "
          style={{ width: "300px", position: "fixed", overflowY: "auto" }}
        >
          <img
            src={property_world_logo}
            alt="Logo"
            className="m-2"
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
              <div className="position-relative">
                <a
                  href={imageSrc}
                  className="lightbox2"
                  data-glightbox="type: image"
                >
                  <ImageWithLoader
                    src={imageSrc}
                    alt="Profile"
                    className="profile-img mb-3"
                  />
                </a>

                {/* Camera Icon Button */}
                <button
                  type="button"
                  className="btn btn-sm text-white btn-secondary rounded-circle position-absolute"
                  style={{ bottom: "19px", right: "0", padding: "3px" }}
                  onClick={triggerFileInput}
                >
                  <SquarePen size={17} strokeWidth={2} />
                </button>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="d-none"
                />
              </div>
              {userData?.first_name && userData?.email && (
                <>
                  <h5 className="text-center text-danger fw-medium">
                    {`${userData?.first_name} ${userData?.last_name}`}
                  </h5>
                  <p className="text-center small text-danger fw-medium">
                    {userData?.email || ""}
                  </p>
                </>
              )}

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
          <ProfilePicPreviewModal
            preview={preview}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            selectedFile={selectedFile}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
