import React from "react";
import Link from "next/link";

const SidebarBarDashboard = () => {
  return (
    <aside>
      <div className="bg-green-500 min-h-screen w-64 p-5">
        <h1>Dashboard</h1>
        <Link href="/">Go to Home</Link>
      </div>
    </aside>
  );
};

export default SidebarBarDashboard;
