// components/CircularImage.tsx
import React, { useState } from "react";
import { useLogout } from "@account-kit/react";
import Link from "next/link";

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
    }
  });
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  
  const handleLogout = () => {
    logout();
    // window.location.href = "/api/auth/logout";
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
            <Link  href="/api/auth/logout" className="px-4 py-2 hover:bg-gray-200 cursor-pointer"  onClick={handleLogout}>
              Logout
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CircularImage;
