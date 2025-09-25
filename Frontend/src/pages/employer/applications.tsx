import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ApplicationCards from "../../components/employer/application-cards";
import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import {
  viewAllApplicationsAPI,
  viewApplicationStats,
} from "../../api/employer.api";
import { IApplicationResponse } from "../../types/application.types";
import { useSearchParams } from "react-router";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Oval from "react-loading-icons/dist/esm/components/oval";

const Applications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("currentPage") || 1);

  const { data, isLoading } = useQuery({
    queryFn: () => viewAllApplicationsAPI(currentPage),
    queryKey: ["view_all_Applications_API", currentPage],
  });

  const { data: stats } = useQuery({
    queryFn: viewApplicationStats,
    queryKey: ["view_Application_Stats"],
  });

  const handlePage = (pageNumber: number) => {
    if (
      pageNumber < 1 ||
      (data?.pagination?.total_pages &&
        pageNumber > data.pagination.total_pages)
    ) {
      return;
    }

    setSearchParams({
      currentPage: pageNumber.toString(),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval stroke="#2c3e50" height="64" width="64" />
      </div>
    );
  }

  const pendingApplications = stats?.data.filter(
    (application: IApplicationResponse) => application.status === "PENDING"
  );

  const acceptedApplications = stats?.data.filter(
    (application: IApplicationResponse) => application.status === "ACCEPTED"
  );

  const rejectedApplications = stats?.data.filter(
    (application: IApplicationResponse) => application.status === "REJECTED"
  );

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200
          w-60 p-4 z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Hamburger (Mobile) */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none"
            aria-label="Open sidebar"
          >
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
              />
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className="flex items-baseline justify-between mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl text-[#2c3e50] font-semibold">
              All Applications
            </h1>
            <p className="text-[#6C7B7F]">
              Review and manage all job applications
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex gap-5 flex-wrap mb-6">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="bg-[#FBFBFC] p-8 rounded-lg w-full md:w-[80vw]">
              <div className="flex justify-evenly p-4">
                <div className="flex flex-col items-center">
                  <p className="text-2xl text-[#2c3e50] font-semibold">
                    {pendingApplications?.length ?? 0}
                  </p>
                  <p className="text-gray-500 text-sm">Pending review</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-2xl text-[#2c3e50] font-semibold">
                    {acceptedApplications?.length ?? 0}
                  </p>
                  <p className="text-gray-500 text-sm">Accepted</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-2xl text-[#2c3e50] font-semibold">
                    {rejectedApplications?.length ?? 0}
                  </p>
                  <p className="text-gray-500 text-sm">Rejected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="flex flex-wrap gap-5">
          {!isLoading && data?.data?.length === 0 ? (
            <p className="text-[#6C7B7F] text-lg p-4 flex items-center justify-center w-full">
              Nothing to see
            </p>
          ) : (
            data?.data?.map((application: IApplicationResponse) => (
              <ApplicationCards
                application={application}
                key={application._id}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {!isLoading && data?.data?.length > 0 && (
          <div className="flex justify-between items-center pb-10 p-3 max-w-[85vw]">
            {/* Previous */}
            <div
              className={`flex items-center border border-[#2c3e50] p-2 space-x-2 rounded-lg text-center ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => handlePage(currentPage - 1)}
            >
              <GoArrowLeft />
              <button
                className={`${
                  currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Previous
              </button>
            </div>

            {/* Next */}
            <div
              className={`flex items-center border border-[#2c3e50] p-2 space-x-2 rounded-lg text-center ${
                data?.pagination?.total_pages &&
                currentPage >= data.pagination.total_pages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => handlePage(currentPage + 1)}
            >
              <button
                className={`${
                  data?.pagination?.total_pages &&
                  currentPage >= data.pagination.total_pages
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Next
              </button>
              <GoArrowRight />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const page = withAuth(Applications, [Role.EMPLOYER]);
export default page;
