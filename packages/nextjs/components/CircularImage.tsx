// components/CircularImage.tsx
import React, { useState } from "react";
import { useLogout } from "@account-kit/react";

interface CircularImageProps {
  src: string | undefined;
  alt: string | undefined;
  size: string | undefined;
  email: string | undefined;
}

const CircularImage: React.FC<CircularImageProps> = ({ src, alt, size, email }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { logout } = useLogout({
    onError: (error) => {
      console.error("Logout Error:", error);
    },
    onSuccess: () => {
      console.log("Logout Success");
      window.location.href = "/api/auth/logout";
    }
  });

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
  };

  return (
    <div className="flex flex-col absolute items-center top-4 right-10">
      <div
        className="relative rounded-full overflow-hidden cursor-pointer"
        style={{ width: `${size}px`, height: `${size}px` }}
        onClick={toggleDropdown}
      >
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      </div>
      <p className="mt-2 relative text-sm items-center text-gray-700">{email}</p>
      {dropdownVisible && (
        <div className="absolute mt-2 bg-white border rounded shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CircularImage;
