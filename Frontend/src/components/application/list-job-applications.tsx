import { useQuery } from "@tanstack/react-query";
import { viewMyApplicationsAPI } from "../../api/user.api";
import MyApplicationCards from "../user page components/my-applications-cards";
import { useSearchParams } from "react-router";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Oval from "react-loading-icons/dist/esm/components/oval";

const ViewMyApplications = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("currentPage") || 1);
  const { data, isLoading } = useQuery({
    queryFn: () => viewMyApplicationsAPI(currentPage),
    queryKey: ["my_applications", currentPage],
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
    <div className="flex flex-col border border-[#E9EBED] w-[60vw] p-6 rounded-lg">
      <div>
        <p className="text-[#2c3e50]">Job Applications</p>
        <p className="text-gray-500 text-sm">
          Track and manage your job applications
        </p>
      </div>
      {/* Jobs Applied to Cards */} 
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Oval stroke="#2c3e50" height="64" width="64" />
        </div>
      ) : (
        data?.data.map((application: any) =>
          application.job ? (
            <MyApplicationCards
              job={application.job}
              application={application}
              key={application._id}
            />
          ) : null
        )
      )}
      {/* Pagination controls */}
      {!isLoading && (
        <div className="flex justify-between items-center pb-10 p-3">
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
  );
};

export default ViewMyApplications;
