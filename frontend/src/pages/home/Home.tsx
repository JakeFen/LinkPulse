import { useState } from "react";
import NavBar from "../../components/NavBar";
import createLink from "../../services/linkService";
import type { linkResponse } from "../../types/link";
import { useAuth } from "@clerk/react";

const Home = () => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const shortenLink = async (event) => {
    event.preventDefault();
    setShortURL("");
    setErrorMessage("");
    setIsLoading(true);

    const token = await getToken();

    try {
      const response: linkResponse = await createLink(longURL, token);
      setShortURL(response.shortLink);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong");
      }
      setIsLoading(false);
    }
  };

  const copyShortURL = async () => {
    await navigator.clipboard.writeText(shortURL);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <NavBar></NavBar>
      <section className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4">
        <div className="w-full">
          <p className="text-center text-2xl text-slate-800">
            Shorten your links and keep track of how often they're used!
          </p>
          <form action="" onSubmit={shortenLink}>
            <label
              htmlFor="url"
              className="mt-8 block text-lg font-semibold text-slate-800"
            >
              Paste your link below
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                id="url"
                name="url"
                value={longURL}
                onChange={(e) => {
                  setLongURL(e.target.value);
                }}
                placeholder="https://example.com"
                className="text-lg h-12 py-2 px-4 bg-white border border-slate-800 rounded-lg placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Shortening..." : "Shorten Link"}
              </button>
            </div>
          </form>
          <div className="mt-4 min-h-24">
            {errorMessage && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {errorMessage}
              </div>
            )}

            {shortURL && (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                <p className="font-semibold text-emerald-700">Success!</p>

                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={shortURL}
                    readOnly
                    className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-emerald-800"
                  />

                  <button
                    type="button"
                    onClick={copyShortURL}
                    className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    {copied ? "Coppied " : "Copy"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
