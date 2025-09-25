import { useQuery } from "@tanstack/react-query";
import ManageJobCard from "../../components/employer/manage-job.card";
import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import { GoArrowLeft, GoArrowRight, GoPlus } from "react-icons/go";
import { useNavigate, useSearchParams } from "react-router";
import { getMyJobsAPI } from "../../api/employer.api";
import { IJob } from "../../types/job.types";
import Oval from "react-loading-icons/dist/esm/components/oval";
import { useState } from "react";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("currentPage") || 1);

  const { data, isLoading } = useQuery({
    queryFn: () => getMyJobsAPI(currentPage),
    queryKey: ["get_my_Jobs_API", currentPage],
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const redirectToCreateJob = () => {
    navigate("/employer/createJob");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval stroke="#2c3e50" height="64" width="64" />
      </div>
    );
  }

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl text-[#2c3e50] font-semibold">
              Manage Jobs
            </h1>
            <p className="text-[#6C7B7F]">
              View, edit, and delete your job postings
            </p>
          </div>
          <button
            className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] flex items-center gap-2"
            onClick={redirectToCreateJob}
          >
            <GoPlus size={22} />
            <span>Create New Job</span>
          </button>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {!isLoading && data?.data?.length === 0 ? (
            <p className="text-[#6C7B7F] text-center py-10">
              Nothing to see
            </p>
          ) : (
            data?.data?.map((job: IJob) => (
              <ManageJobCard job={job} key={job._id} />
            ))
          )}
        </div>

        {/* Pagination */}
        {!isLoading && data?.data?.length > 0 && (
          <div className="flex justify-between items-center py-10">
            {/* Prev */}
            <div
              className={`flex items-center border border-[#2c3e50] px-4 py-2 space-x-2 rounded-lg ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => handlePage(currentPage - 1)}
            >
              <GoArrowLeft />
              <span>Previous</span>
            </div>

            {/* Next */}
            <div
              className={`flex items-center border border-[#2c3e50] px-4 py-2 space-x-2 rounded-lg ${
                data?.pagination?.total_pages &&
                currentPage >= data.pagination.total_pages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => handlePage(currentPage + 1)}
            >
              <span>Next</span>
              <GoArrowRight />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const page = withAuth(ManageJobs, [Role.EMPLOYER]);
export default page;
