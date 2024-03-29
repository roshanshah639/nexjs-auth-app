import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl">
        User Profile Of{" "}
        <span className="bg-cyan-600 px-2 py-2 mt-1 rounded">{params.id}</span>
      </h1>
    </main>
  );
};

export default UserProfile;
