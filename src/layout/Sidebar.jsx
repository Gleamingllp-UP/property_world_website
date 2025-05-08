import { routes } from "@/router/routes";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const isPathActive = (basePath, currentPath) => {
    return (
      currentPath === basePath || currentPath.startsWith(`${basePath}/`)
    );
  };
  
  return (
    <aside className="w-full h-full bg-gradient-to-b  from-blue-100/80 via-blue-50/60 to-white/50 backdrop-blur-2xl border-r border-white/30 shadow-md p-6 text-gray-800 px-2 overflow-y-auto">
      <nav className="flex flex-col gap-3">
        {routes
          ?.filter((routes) => routes?.isPrivate && routes?.isVisibleInSidebar)
          .sort((a, b) => a?.id - b?.id)
          .map(({ id, path, name, icon: Icon }) => {
            const isActive = isPathActive(path, location.pathname);
            return (
              <Link
                key={id}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-200/80 text-blue-700 font-medium shadow"
                    : "hover:bg-white/40 hover:text-blue-500"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{name}</span>
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}

export default Sidebar;
