import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center h-16 p-4 border-b border-slate-200 bg-white">
        <div>
          <a href="/" className="text-2xl text-slate-900 hover:text-indigo-600">
            LinkPulse
          </a>
        </div>
        <div>
          {/* TODO: Only show when logged in */}
          <a
            href="/dashboard"
            className="text-md font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 px-3 py-3 rounded-md"
          >
            Dashboard
          </a>
          <a
            href="/login"
            className="text-md font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 px-3 py-3 rounded-md"
          >
            Log In
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
