import FeaturedJobCard from "./featured-card";
import { IJob } from "../../../types/job.types";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedJobAPI } from "../../../api/featured-job.api";
import { Link } from "react-router";
import {Oval} from 'react-loading-icons'

const FeaturedSection = () => {
  const { data, isLoading } = useQuery({
    queryFn: getFeaturedJobAPI,
    queryKey: ["featured_Job_API"],
  });

  return (
    <div className="pb-20 px-4 sm:px-6 md:px-12 lg:px-20">
      {/* Title Section */}
      <div className="flex flex-col items-start justify-center  pt-12">
        <h1 className="text-3xl text-[#2e3c50] font-bold">Featured Jobs</h1>
        { isLoading ? '':
        <p className="text-sm text-[#6C7B7F] mt-1">6 jobs found</p>
        }
      </div>

      {/* Card Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {isLoading ? (
          <div className="flex justify-center items-center col-span-full h-[300px]">
            <Oval stroke="#2c3e50" height="64" width="64" />
          </div> 
        ) : (
          data?.data.map((featuredJob: IJob) => (
            <FeaturedJobCard featuredJob={featuredJob} key={featuredJob._id} />
          ))
        )}
      </div>

      {/* Load more jobs button */}
      { isLoading ? '' :
      <div className="flex justify-center items-center mt-12">
        <Link to={'/jobs'}>
          <button className="border border-gray-300 py-2 px-4 rounded-lg hover:bg-[#E9EBED] hover:cursor-pointer">
            Load More Jobs
          </button>
        </Link>
      </div> 
      }
    </div>
  );
};

export default FeaturedSection;
