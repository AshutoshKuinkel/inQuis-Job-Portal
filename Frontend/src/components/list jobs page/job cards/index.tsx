import { useQuery } from "@tanstack/react-query";
import DetailCard from "./detail-card";
import JobCard from "./job-main-card";
import { getAllJobsAPI } from "../../../api/job.api";
import { IJob } from "../../../types/job.types";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Oval } from "react-loading-icons";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useEffect, useState } from "react";

const JobDisplay = () => {
  const navigate = useNavigate();
  const { id: selectedJobId } = useParams();

  const [searchParam, setSearchParam] = useSearchParams();
  const [isMobile,setIsMobile] = useState(true)
  const [isJobClicked,setIsJobClicked] = useState(false)

  const query = searchParam.get("query") || "";
  const location = searchParam.get("location") || "";
  const currentPage = Number(searchParam.get("currentPage")) || 1;
  const sortBy = searchParam.get('sortBy') || ''

  const { data, isLoading } = useQuery({
    queryFn: () => getAllJobsAPI(currentPage, query, location,sortBy),
    queryKey: ["get_all_jobs", query, location, currentPage,sortBy],
  });

  // useEffect for checking screen width using window.innerwidth
  useEffect(()=>{
    const handleScreenWidth = ()=>{
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener('resize',handleScreenWidth)
    handleScreenWidth()

    return ()=> window.removeEventListener('resize',handleScreenWidth)
  },[])

  const handleJobClick = (
    id: string,
  ) => {
    navigate(`/jobs/${id}?query=${query}&location=${location}&currentPage=${currentPage}&sortBy=${sortBy}`);
    if(isMobile){
      setIsJobClicked(true)
      window.scrollTo(0,0)
    }
  };

  const handlePage = (pageNumber: number) => {
    if (
      pageNumber < 1 ||
      (data?.pagination?.total_pages &&
        pageNumber > data.pagination.total_pages)
    ) {
      return;
    }

    setSearchParam({
      query,
      location,
      currentPage: pageNumber.toString(),
    });
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Cards */}
        <div className="col-span-1">
          <div className={`flex flex-col gap-3 ${isMobile && isJobClicked ? 'hidden' : ''}`}>
            {isLoading && (
              <div className="flex justify-center items-center col-span-4 h-[300px]">
                <Oval stroke="#2c3e50" height="64" width="64" />
              </div>
            )}
            {!isLoading && data?.data.length === 0 ? (
              <div className="text-center mt-10 text-gray-600">
                <p>No jobs found on this page.</p>
                <button
                  onClick={() => handlePage(1)}
                  className="mt-4 px-4 py-2 bg-[#2c3e50] text-white rounded"
                >
                  Go Back to First Page
                </button>
              </div>
            ) : !isLoading ? (
              data?.data.map((job: IJob) => (
                <JobCard job={job} key={job._id} handleClick={handleJobClick} />
              ))
            ) : null}
          </div>
        </div>

        {/* Detail Section {Mobile} */}
        {isLoading ? (
          ""
        ) : ( isMobile && isJobClicked &&
          <div className={`col-span-2 border border-gray-300 rounded-md max-w-4xl h-screen sticky top-0 mb-10`}>
            <div
              className="h-full overflow-auto hover:overflow-auto"
              style={{ scrollbarGutter: "stable" }}
            >
              <DetailCard jobId={selectedJobId ?? null} />
            </div>
          </div>
        )}

        {/* Detail Section {Laptop} */}
        {isLoading ? (
          ""
        ) : (!isMobile &&
          <div className={`lg:block col-span-2 border border-gray-300 rounded-md max-w-4xl h-screen sticky top-0 mb-10`}>
            <div
              className="h-full overflow-auto hover:overflow-auto"
              style={{ scrollbarGutter: "stable" }}
            >
              <DetailCard jobId={selectedJobId ?? null} />
            </div>
          </div>
        )}

        {/* Next Previous Buttons {Mobile}*/}
        {!isLoading && isMobile && !isJobClicked && (
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

        {/* Next Previous Buttons {Desktop} */}
                {!isLoading && !isMobile && (
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
    </div>
  );
};

export default JobDisplay;
