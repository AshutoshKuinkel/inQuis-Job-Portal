import { IoLocationOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { TbClockHour7 } from "react-icons/tb";
import { DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getJobBYIdAPI } from "../../../api/job.api";
import React from "react";

interface IProps {
  jobId: string | null;
}

const DetailCard: React.FC<IProps> = ({ jobId }) => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getJobBYIdAPI(jobId!),
    queryKey: ["job_id", jobId],
    enabled: !!jobId,
  });

  const job = response?.data;

  if (!jobId) return <div>Select a job to see its details.</div>;
  if (isLoading) return <div>Loading job details...</div>;
  if (error) return <div>Error loading job.</div>;

  return (
    <div className="tracking-widest">
      {/* Title + Location + Company + Job Type + salary + days posted ago */}
      <div>
        <div className="flex flex-col justify-center p-6 gap-1">
          <h1 className="text-4xl font-semibold text-[#2c3e50]">{job.title}</h1>
          <p className="text-2xl text-[#6c7b7f]">{job.companyName}</p>
        </div>

        <div className="pl-6 flex flex-col gap-2 justify-center text-[#2c3e50]">
          {/* Location  */}
          <div className="flex items-center space-x-2">
            <IoLocationOutline size={18} />
            <p>{job.location}</p>
          </div>

          {/* Category */}
          <div className="flex items-center space-x-2">
            <BiCategoryAlt />
            <p>Category</p>
          </div>

          {/* Job Type */}
          <div className="flex items-center space-x-2">
            <TbClockHour7 />
            <p>{job.jobType}</p>
          </div>

          {/* Salary */}
          <div className="flex items-center space-x-2">
            <DollarSign size={18} />
            <p>{job.salary}</p>
          </div>
        </div>
      </div>

      {/* Posted ago */}
      <div className="mt-6 pl-6 text-[#6c7b7f]">
        <p>
          {new Date(job.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Apply + Build AI resume for Job button */}
      <div className="flex p-6 gap-2">
        <button className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer">
          Apply Now
        </button>

        <button className="border border-[#2c3e50] p-2 rounded-lg hover:bg-[#ECEEF2] hover:cursor-pointer">
          Generate AI Resume for Job
        </button>
      </div>

      {/* Job Description */}
      <div className="p-6">
        <p>{job.description}</p>
      </div>
    </div>
  );
};

export default DetailCard;
