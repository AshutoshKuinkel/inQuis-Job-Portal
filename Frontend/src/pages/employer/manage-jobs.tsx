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

const ManageJobs = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("currentPage") || 1);

  const { data, isLoading } = useQuery({
    queryFn: () => getMyJobsAPI(currentPage),
    queryKey: ["get_my_Jobs_API", currentPage],
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

  const redirectToCreateJob = () => {
    navigate("/employer/createJob");
  };

  if (isLoading) {
    return(<div className="flex justify-center items-center h-screen">
      <Oval stroke="#2c3e50" height="64" width="64" />
    </div>)
  }
  return (
    <div className="h-screen">
      <div className="grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="p-2 col-span-7">
          {/* Employer dashboard header */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col gap-1 p-8">
              <h1 className="text-3xl text-[#2c3e50] font-semibold">
                Manage Jobs
              </h1>
              <p className="text-[#6C7B7F]">
                View, edit, and delete your job postings
              </p>
            </div>
            <button
              className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer"
              onClick={redirectToCreateJob}
            >
              <div className="flex items-center gap-3">
                <GoPlus size={22} />
                <p>Create New Job</p>
              </div>
            </button>
          </div>

          {/* Job Cards section */}
          <div className="pl-8 pr-8">
            <div className="flex flex-col gap-6">
              {!isLoading &&
                data.data?.map((job: IJob) => {
                  return <ManageJobCard job={job} key={job._id} />;
                })}
              {/* Next Previous Buttons {Desktop} */}
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
                        currentPage === 1
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
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
      </div>
    </div>
  );
};

const page = withAuth(ManageJobs, [Role.EMPLOYER]);
export default page;
