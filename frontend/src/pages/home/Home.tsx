import React from "react";
import NavBar from "../../components/NavBar";

const Home = () => {
  return (
    <>
      <div>
        <NavBar></NavBar>
        <section className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4">
          <div className="w-full">
            <p className="text-center text-2xl text-slate-800">
              Shorten your links and keep track of how often they're used!
            </p>
            <label
              htmlFor="url"
              className="mt-8 block text-lg font-semibold text-slate-800"
            >
              Paste your link below
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="https://example.com"
                className="text-lg h-12 py-2 px-4 bg-white border border-slate-800 rounded-lg placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <button
                onClick={() => console.log("shorten link btn")}
                className="cursor-pointer rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap"
              >
                Shorten Link
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
