import React from "react";
import { TbLoader2 } from "react-icons/tb";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md">
      <div className="p-6  bg-transparent backdrop-blur-md flex items-center space-x-3 rounded-lg">
        <TbLoader2 className="animate-spin text-4xl text-blue-600" />
      </div>
    </div>
  );
}

export default Loader;
