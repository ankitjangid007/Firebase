"use client";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";

const Header = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex justify-between items-center w-full mb-4 py-3 px-4 shadow-md">
      <h1 className="text-3xl font-semibold">Movie List</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
