import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

const UserTableSkeleton = ({ columns }) => {
  return (
    <TableRow className="animate-pulse">
      {columns.map((col, idx) => (
        <TableCell key={idx} className="text-center">
          {col.key === "actions" ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <div
              className={`h-4 ${getSkeletonWidth(col.key)} bg-gray-300 rounded mx-auto`}
            />
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

// Optional widths based on column key
const getSkeletonWidth = (key) => {
  const widths = {
    srNo: "w-6",
    first_name: "w-24",
    last_name: "w-24",
    email: "w-32",
    phone_number: "w-28",
    createdAt: "w-20",
    status: "w-10",
  };
  return widths[key] || "w-24";
};

export default UserTableSkeleton;
