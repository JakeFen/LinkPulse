import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";
import type { LinkResponse } from "../../types/link";
import { deleteLink, getLinks } from "../../services/linkService";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<LinkResponse>({
    links: [],
    stats: {
      totalLinks: 0,
      totalClicks: 0,
    },
  });
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const token = await getToken();

        if (!token) throw new Error("You must be logged in to view your links");

        const response: LinkResponse = await getLinks(token);

        setDashboardData(response);
      } catch (err) {
        if (err instanceof Error) setErrorMessage(err.message);
        else setErrorMessage("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [getToken, setDashboardData]);

  const handleDeleteLink = async (id: number) => {
    try {
      const token = await getToken();

      if (!token) throw new Error("You must be logged in to delete a link");

      await deleteLink(token, id);

      setDashboardData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          links: prev.links.filter((link) => link.id !== id),
        };
      });
    } catch (err) {
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage("Something went wrong");
    }
  };

  return (
    <div>
      <NavBar />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Links</h1>
            <p className="mt-1 text-slate-500">
              Manage your shortened links and track their performance.
            </p>
          </div>

          <Link
            to="/"
            className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Create Link
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
          </div>
        ) : errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            {errorMessage}
          </div>
        ) : (
          <div>
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-medium text-slate-500">
                  Total Links
                </div>
                <div className="mt-2 text-3xl font-bold text-slate-900">
                  {dashboardData.stats.totalLinks}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-medium text-slate-500">
                  Total Clicks
                </div>
                <div className="mt-2 text-3xl font-bold text-slate-900">
                  {dashboardData.stats.totalClicks}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-[2fr_1.5fr_0.5fr_40px] border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600">
                <div>Original URL</div>
                <div>Short Link</div>
                <div>Clicks</div>
                <div />
              </div>

              {dashboardData.links.map((link) => (
                <div
                  key={link.shortLink}
                  className="grid grid-cols-[2fr_1.5fr_0.5fr_40px] items-center border-b border-slate-100 px-6 py-5 last:border-b-0"
                >
                  <div className="truncate pr-4 text-slate-700">
                    {link.originalUrl}
                  </div>

                  <div className="truncate pr-4 text-indigo-600">
                    {link.shortLink}
                  </div>

                  <div className="font-semibold text-slate-800">
                    {link.clicks}
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(openMenu === link.id ? null : link.id)
                      }
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Link options"
                    >
                      <span className="text-xl leading-none">⋮</span>
                    </button>

                    {openMenu === link.id && (
                      <div className="absolute right-0 top-9 z-10 w-32 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                        <button
                          type="button"
                          className="w-full cursor-pointer px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                          onClick={() => {
                            handleDeleteLink(link.id);
                            setOpenMenu(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
