import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Dashboard = () => {
  const links = [
    {
      originalUrl: "https://google.com",
      shortUrl: "http://localhost:8080/aB32",
      clicks: 24,
    },
    {
      originalUrl: "https://github.com",
      shortUrl: "http://localhost:8080/x91K",
      clicks: 12,
    },
    {
      originalUrl: "https://example.com",
      shortUrl: "http://localhost:8080/Q72m",
      clicks: 5,
    },
  ];

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

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-[2fr_1.5fr_0.5fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600">
            <div>Original URL</div>
            <div>Short Link</div>
            <div>Clicks</div>
          </div>

          {links.map((link) => (
            <div
              key={link.shortUrl}
              className="grid grid-cols-[2fr_1.5fr_0.5fr] items-center border-b border-slate-100 px-6 py-5 last:border-b-0"
            >
              <div className="truncate pr-4 text-slate-700">
                {link.originalUrl}
              </div>

              <div className="truncate pr-4 text-indigo-600">
                {link.shortUrl}
              </div>

              <div className="font-semibold text-slate-800">{link.clicks}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
