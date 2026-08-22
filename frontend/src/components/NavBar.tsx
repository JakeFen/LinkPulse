import { Link } from "react-router-dom";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-16 p-4 border-b border-slate-200 bg-white">
      <div>
        <Link to="/" className="text-2xl text-slate-900 hover:text-indigo-600">
          LinkPulse
        </Link>
      </div>
      <div className="flex flex-column gap-2">
        <Show when="signed-in">
          <Link
            to="/dashboard"
            className="text-md font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 px-3 py-3 rounded-md"
          >
            Dashboard
          </Link>
          <UserButton />
        </Show>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button
              type="button"
              className="cursor-pointer rounded-md px-3 py-3 text-md font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            >
              Log In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </SignUpButton>
        </Show>
      </div>
    </nav>
  );
};

export default NavBar;
