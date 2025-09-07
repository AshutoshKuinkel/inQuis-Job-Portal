import { useQuery } from "@tanstack/react-query";
import JobCard from "../../list jobs page/job cards/job-main-card";
import { getCategoryJob } from "../../../api/category.api"; // Assuming you have an API call for fetching jobs by category
import { IJob } from "../../../types/job.types";
import { useSearchParams } from "react-router-dom";
import { Oval } from "react-loading-icons";
import { ICategory } from "../../../types/category.types";
import React from "react";

interface IProps{
  category:ICategory
}

const CategoryJobsDisplay:React.FC<IProps> = ({category}) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id"); // Get the category ID from query params

  const { data, isLoading } = useQuery({
    queryFn: () => getCategoryJob(categoryId!),
    queryKey: ["get_category_jobs", categoryId],
    enabled: !!categoryId, // Only fetch if categoryId exists
  });

 
  const handleJobClick = () => {
    return
  };

  return (
    <div className="mt-16">
      <div className="">
        <div className="">
          <h2 className="">
            Jobs in Category: {category?.name}
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <Oval stroke="#2c3e50" height="64" width="64" />
            </div>
          ) : (
            <div className="">
              {data?.data?.length ? (
                data.data.map((job: IJob) => <JobCard job={job} key={job._id} handleClick={handleJobClick}/>)
              ) : (
                <p>No jobs found for this category.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryJobsDisplay;
