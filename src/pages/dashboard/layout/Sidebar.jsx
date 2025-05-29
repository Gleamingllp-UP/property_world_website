import React from "react";
import { Link, useLocation } from "react-router-dom";
import { property_world_logo } from "@/assets/images";
import { routes } from "../../../router/routes";
const Sidebar = () => {
  const location = useLocation();
  const isPathActive = (basePath, currentPath) => {
    return currentPath === basePath || currentPath.startsWith(`${basePath}/`);
  };
  return (
    <>
      <div
        className="bg-dark text-white p-3 vh-100"
        style={{ width: "250px", position: "fixed" }}
      >
        <img src={property_world_logo} alt="Logo" width="100" height="100" />
        <hr />
        <ul className="nav flex-column">
          {routes
            ?.filter((routes) => routes?.isPrivate && routes?.isDashboard)
            .sort((a, b) => a?.id - b?.id)
            .map(({ id, path, name, icon: Icon }) => {
              const isActive = isPathActive(path, location.pathname);
              return (
                <Link
                  key={id}
                  to={path}
                  className={`d-flex align-items-center gap-2 px-3 py-2 rounded transition ${
                    isActive
                      ? "bg-primary text-white fw-semibold shadow-sm"
                      : "text-white bg-transparent hover-bg-white bg-opacity-10"
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
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
