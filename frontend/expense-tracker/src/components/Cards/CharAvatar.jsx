import React from "react";

const getInitials = (name) => {
  if (!name) return "";
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
  );
};

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${
        style || " "
      } flex items-center justify-center rounded-full bg-purple-100 text-gray-900 font-medium bg-gray-100`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
