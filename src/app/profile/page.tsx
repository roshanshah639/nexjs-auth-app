"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout Success.", response.data);
      toast.success("Logout Success.");

      // redirect to login page
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl">Profile</h1>
      <button onClick={onLogout} className="bg-cyan-600 px-4 py-2 mt-1 rounded">
        Logout
      </button>
    </main>
  );
};

export default Profile;
