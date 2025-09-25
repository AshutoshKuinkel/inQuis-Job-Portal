import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import TotalApplicationsCard from "../../components/employer/total-applications.card";
import RecentApplicationCards from "../../components/employer/recent-application.cards";
import ActiveJobsCard from "../../components/employer/active-jobs.card";
import { useQuery } from "@tanstack/react-query";
import { viewRecentApplicationsAPI } from "../../api/employer.api";
import { IApplicationResponse } from "../../types/application.types";
import PendingReviewsCard from "../../components/employer/pending-review.card";
import { useState } from "react";

const EmployerDashboard = () => {
  const { data, isPending } = useQuery({
    queryFn: viewRecentApplicationsAPI,
    queryKey: ["view_recent_Applications_API"],
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200
          w-60 p-4 z-50
          transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto min-h-screen">
        {/* Mobile hamburger button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none"
            aria-label="Open sidebar"
          >
            {/* Hamburger icon */}
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-3xl text-[#2c3e50] font-semibold">
            Employer Dashboard
          </h1>
          <p className="text-[#6C7B7F]">
            Manage your job postings and applications
          </p>
        </div>

        {/* Job Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <ActiveJobsCard />
          <TotalApplicationsCard />
          <PendingReviewsCard />
        </div>
        {/* Recent Applications */}
        <section className="border border-[#E9EBED] rounded-lg p-6">
          <p className="text-[#2c3e50] text-lg mb-4">Recent Applications</p>
          {!isPending ? (
            data?.data?.length > 0 ? (
              <div className="space-y-4">
                {data.data.map((application: IApplicationResponse) => (
                  <RecentApplicationCards
                    application={application}
                    key={application._id}
                  />
                ))}
              </div>
            ) : (
              <p className="text-[#6C7B7F]">Nothing to see</p>
            )
          ) : (
            <p className="text-[#6C7B7F]">Loading...</p>
          )}
        </section>
      </main>
    </div>
  );
};

const page = withAuth(EmployerDashboard, [Role.EMPLOYER]);
export default page;
