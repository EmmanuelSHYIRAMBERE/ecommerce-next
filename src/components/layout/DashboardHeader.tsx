import Link from "next/link";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-5">
      <h1 className="flex justify-center items-center text-3xl font-semibold my-5">
        Ecommerce Platform Dashboard
      </h1>
      <Link
        href="/api/auth/signin"
        className="shadow shadow-black p-2 rounded-md"
      >
        Login
      </Link>
    </div>
  );
};

export default DashboardHeader;
