"use client";
import logout from "@api/query/auth/logout";
import { Icons } from "@assets/icons";
import Toastify from "@lib/Toastify";
import { useState } from "react";

const Profile = ({ name, email }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const { ToastContainer, showErrorMessage } = Toastify();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      showErrorMessage({ message: "Issue in logout. Please try later" });
    }
  };

  return (
    <>
      <p
        className="h-full text-2xl cursor-pointer"
        onClick={() => setOpenProfile((prev) => !prev)}
      >
        <Icons.profile />
      </p>

      {openProfile && (
        <div
          className="absolute z-20 top-full mt-2 right-0 bg-slate-800 border border-white 
        flex flex-col gap-4 py-4 rounded-xl"
        >
          <p className="capitalize px-4">Hello, {name}</p>
          <p
            className="hover:bg-slate-600 cursor-pointer px-4 py-2"
            onClick={handleLogout}
          >
            Sign Out ({email})
          </p>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Profile;
