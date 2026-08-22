import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";
import type { LinkResponse } from "../../types/link";
import { getLinks } from "../../services/linkService";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<LinkResponse | null>({
    links: [],
    stats: {
      totalLinks: 0,
      totalClicks: 0,
    },
  });
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
              <div className="grid grid-cols-[2fr_1.5fr_0.5fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600">
                <div>Original URL</div>
                <div>Short Link</div>
                <div>Clicks</div>
              </div>

              {dashboardData.links.map((link) => (
                <div
                  key={link.shortLink}
                  className="grid grid-cols-[2fr_1.5fr_0.5fr] items-center border-b border-slate-100 px-6 py-5 last:border-b-0"
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
