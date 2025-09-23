import { useQuery } from "@tanstack/react-query";
import ApplicationCards from "../../components/employer/application-cards";
import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import { viewAllApplicationsAPI } from "../../api/employer.api";
import { IApplicationResponse } from "../../types/application.types";
import { useSearchParams } from "react-router";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Applications = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("currentPage") || 1);
  const { data, isPending } = useQuery({
    queryFn: () => viewAllApplicationsAPI(currentPage),
    queryKey: ["view_all_Applications_API", currentPage],
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

  return (
    <div className="">
      <div className="grid grid-cols-8 h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="p-2 col-span-7">
          {/* Employer dashboard header */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col gap-1 p-8">
              <h1 className="text-3xl text-[#2c3e50] font-semibold">
                All Applications
              </h1>
              <p className="text-[#6C7B7F]">
                Review and manage all job applications
              </p>
            </div>
          </div>
          <div className="pl-8 flex gap-5 flex-wrap">
            {/* Stats overview for applications */}
            {!isPending && (
              <div className="flex flex-col items-center justify-center">
                <div className="bg-[#FBFBFC] p-8 rounded-lg min-w-[80vw] mb-8">
                  <div className="flex justify-evenly p-4">
                    <div className="flex flex-col items-center">
                      <p className="text-2xl text-[#2c3e50] font-semibold">2</p>
                      <p className="text-gray-500 text-sm">Pending review</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-2xl text-[#2c3e50] font-semibold">1</p>
                      <p className="text-gray-500 text-sm">Accepted</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-2xl text-[#2c3e50] font-semibold">0</p>
                      <p className="text-gray-500 text-sm">Rejected</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap pl-8 gap-5">
            {/* Applications cards */}
            {!isPending &&
              data.data.map((application: IApplicationResponse) => {
                return <ApplicationCards application={application} />;
              })}
          </div>

          {/* Next Previous Buttons {Desktop} */}
          {!isPending && (
            <div className="flex justify-between items-center pb-10 p-3 max-w-[85vw] pl-8">
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
        </div>
      </div>
    </div>
  );
};

const page = withAuth(Applications, [Role.EMPLOYER]);
export default page;
