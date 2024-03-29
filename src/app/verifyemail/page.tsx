"use client";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Link from "next/link";

const Verifyemail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl">Verify Your Email</h1>
      <h2 className="text-2xl">{token ? `${token}` : "No Token Found."}</h2>

      {verified && (
        <div>
          <h2 className="text-2xl mb-4">Email Verified Successfully. </h2>
          <Link className="p-2 bg-cyan-600 mt-4" href="/login">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500">Error: Something went wrong.</h2>
        </div>
      )}
    </div>
  );
};

export default Verifyemail;
