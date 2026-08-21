import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-16 p-4 border-b border-slate-200 bg-white">
      <div>
        <Link to="/" className="text-2xl text-slate-900 hover:text-indigo-600">
          LinkPulse
        </Link>
      </div>
      <div>
        {/* TODO: Only show when logged in */}
        <Link
          to="/dashboard"
          className="text-md font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 px-3 py-3 rounded-md"
        >
          Dashboard
        </Link>
        <Link
          to="/login"
          className="text-md font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 px-3 py-3 rounded-md"
        >
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
