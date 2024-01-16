"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { MdNotifications } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  // Function to format the last path segment with specific handling for IDs
  const formatPathSegment = (segment) => {
    // Check if the segment is an ID (24 characters hexadecimal)
    const isId = /^[0-9a-fA-F]{24}$/.test(segment);

    if (isId) {
      return "Item Details";
    }

    return segment;
  };

  const lastSegment = pathname.split("/").pop();
  const formattedLastSegment = formatPathSegment(lastSegment);

  return (
    <div className="p-[20px] rounded-[10px] flex items-center justify-between bg-[#094b6a]">
      <div className="capitalize text-white font-bold">
        {formattedLastSegment}
      </div>
      <div className="flex items-center gap-[20px]">
        <div className="flex gap-[20px] bg-white rounded-md">
          <MdNotifications size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
