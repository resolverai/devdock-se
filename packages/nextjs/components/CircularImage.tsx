// components/CircularImage.tsx
import React, { useState } from "react";
import Link from "next/link";

interface CircularImageProps {
  src: string | undefined;
  alt: string | undefined;
  size: string | undefined;
  email: string | undefined;
}

const CircularImage: React.FC<CircularImageProps> = ({ src, alt, size, email }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="flex flex-col absolute items-center top-4 right-10">
      <div
        className="relative rounded-full overflow-hidden cursor-pointer"
        style={{ width: `${size}px`, height: `${size}px` }}
        onClick={toggleDropdown}
      >
        <img src={src} alt={alt} className="object-cover w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100">
          {/* <span className="text-white text-sm">{alt}</span> */}
        </div>
      </div>
      <p className="mt-2 relative text-sm items-center text-gray-700">{email}</p>
      {dropdownVisible && (
        <div className="absolute mt-2 bg-white border rounded shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <Link href="/api/auth/logout" className="link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CircularImage;
