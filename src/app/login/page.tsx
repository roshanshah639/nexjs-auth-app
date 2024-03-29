"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success.", response.data);
      toast.success("Login Success.");

      // redirect to profile page
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
      {/* Login form */}
      <h1 className="text-2xl">{loading ? "Processing..." : "Login"}</h1>
      <div className="w-full max-w-sm">
        {/* email */}
        <label className="block mt-4 ml-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full max-w-lg rounded border border-[#0070ba] outline-none py-2 px-3 mt-2 text-[#0070ba]"
          placeholder="Enter Your Email"
        />
        {/* password */}
        <label className="block mt-4 ml-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full max-w-lg rounded border border-[#0070ba] outline-none py-2 px-3 mt-2 text-[#0070ba]"
          placeholder="Enter Your Password"
        />
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={onLogin}
            className="rounded-full bg-[#0070ba] outline-none py-2 px-12 mt-2 text-white hover:bg-[#0061a5]"
          >
            {buttonDisabled ? "No Login" : "Login"}
          </button>
        </div>
      </div>
      <h5 className="block mt-4 ml-1">
        New to website
        <Link
          className="text-cyan-200 hover:text-cyan-100 ml-1 mt-2"
          href="/signup"
        >
          Signup
        </Link>
      </h5>
    </main>
  );
};

export default Login;
