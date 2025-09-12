import { useQuery } from "@tanstack/react-query";
import JobCard from "../../list jobs page/job cards/job-main-card";
import { getCategoryJob } from "../../../api/category.api"; // Assuming you have an API call for fetching jobs by category
import { IJob } from "../../../types/job.types";
import { useSearchParams } from "react-router-dom";
import { Oval } from "react-loading-icons";
import { ICategory } from "../../../types/category.types";
import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface IProps {
  category?: ICategory;
}

const CategoryJobsDisplay: React.FC<IProps> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("id"); // Get the category ID from query params
  const currentPage = Number(searchParams.get("currentPage") || 1);
  const { data, isLoading } = useQuery({
    queryFn: () => getCategoryJob(categoryId!, currentPage),
    queryKey: ["get_category_jobs", categoryId, currentPage],
    enabled: !!categoryId, // Only fetch if categoryId exists
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
      id: categoryId!,
      currentPage: pageNumber.toString(),
    });
  };

  const handleJobClick = () => {
    return;
  };

  return (
    <div className="mt-16">
      <div className="">
        <div className="">
          <h2 className="text-4xl text-[#2c3e50] text-center mb-5">
            Jobs in Category: {category?.name}
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <Oval stroke="#2c3e50" height="64" width="64" />
            </div>
          ) : (
            <div className="lg:h-screen">
              <div className="flex  flex-wrap gap-4 justify-center p-4 items-center">
                {data?.data?.length ? (
                  data.data.map((job: IJob) => (
                    <JobCard
                      job={job}
                      key={job._id}
                      handleClick={handleJobClick}
                    />
                  ))
                ) : (
                  <p>No jobs found for this category.</p>
                )}
              </div>
            </div>
          )}
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

export default CategoryJobsDisplay;
