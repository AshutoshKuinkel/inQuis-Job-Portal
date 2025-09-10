import { IoLocationOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { TbClockHour7 } from "react-icons/tb";
import { DollarSign } from "lucide-react";
import { BsArrowLeft } from "react-icons/bs";
import {Oval} from 'react-loading-icons'
import { useQuery } from "@tanstack/react-query";
import { getJobBYIdAPI } from "../../../api/job.api";
import React from "react";
import { useNavigate, useSearchParams } from "react-router";

interface IProps {
  jobId: string | null;
}

const DetailCard: React.FC<IProps> = ({ jobId }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const query = searchParams.get('query') ?? ''
  const location = searchParams.get('location') ?? ''
  const currentPage = searchParams.get('currentPage') ?? '1'

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getJobBYIdAPI(jobId!,query,location,currentPage),
    queryKey: ["job_id", jobId,query,location,currentPage],
    enabled: !!jobId,
  });

  const job = response?.data;

  if (!jobId) {
    return (
      <div className="text-[#2c3e50] pt-12 bg-[#FCFDFD]flex flex-col gap-3 p-6">
        <div className="flex items-center space-x-2">
          <BsArrowLeft size={24} />
          <h1 className="font-bold text-2xl">Select a Job</h1>
        </div>
        <p className="text-sm max-w-2xl text-[#6C7B7F] pl-8 mt-1">
          Display details here
        </p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center col-span-4 h-[300px]">
        <Oval stroke="#2c3e50" height="64" width="64" />
      </div>
    );
  }
    if (error) {
    return (
      <div className="flex justify-center items-center col-span-4 h-[300px] flex-col">
        <h1 className="font-bold text-2xl text-[#2c3e50]">Error Loading that Job :(</h1>
        <p className="text-sm max-w-2xl text-[#6C7B7F]">Something Went Wrong. Please Try Again With a Different ID.</p>
      </div>
    );
  }

  const handleApplyClick = ()=>{
    navigate(`/jobs/apply/${jobId}`)
  }

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
            <p>{job.category?.name || "Uncategorised"}</p>
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
          Posted:{" "}
          {new Date(job.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Apply + Build AI resume for Job button */}
      <div className="flex p-6 gap-2">
        <button className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer" onClick={handleApplyClick}>
          Apply Now
        </button>

        <button className="border border-[#2c3e50] p-2 rounded-lg hover:bg-[#ECEEF2] hover:cursor-pointer">
          Generate AI Resume for Job
        </button>
      </div>

      {/* Job Description */}
      <div className="p-6">
        {job.description.replace(/\\n/g,"\n").split("\n").map((line:any, index:any) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default DetailCard;
