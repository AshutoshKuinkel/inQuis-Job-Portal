import { IoLocationOutline } from "react-icons/io5";
import { DollarSign } from "lucide-react";
import { AiOutlineEye } from "react-icons/ai";
import { IJob } from "../../types/job.types";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { viewApplicantsforJobAPI } from "../../api/employer.api";
import DeleteJobButton from "./delete-job-button";
import EditJobButton from "./edit-job-button";
import { Link } from "react-router";

interface IProps {
  job: IJob;
}

const ManageJobCard: React.FC<IProps> = ({ job }) => {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const handleLgScreen = () => {
      setIsLg(window.innerWidth > 1023);
    };

    window.addEventListener("resize", handleLgScreen);
    handleLgScreen();

    return () => window.removeEventListener("resize", handleLgScreen);
  }, []);
  const { data, isLoading } = useQuery({
    queryFn: () => viewApplicantsforJobAPI(job._id),
    queryKey: ["view_applicants_for_job_API", job._id],
  });

  return (
    <div className="border p-4 sm:p-6 rounded-xl border-[#E9EBED] border-l-8">
      {/* Header Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Job Title + Status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h1 className="text-base sm:text-lg md:text-xl text-[#2c3e50] font-bold line-clamp-1">
            {job.title}
          </h1>
          <div className="w-fit px-3 text-center bg-[#2c3e50] rounded-lg py-1">
            <p className="text-[10px] sm:text-xs text-white font-semibold">
              active
            </p>
          </div>
        </div>

        {/* Action Buttons - Desktop only */}
        {isLg && (
          <div className="hidden md:flex flex-row items-center gap-2">
            <Link to="/employer/applications">
              <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-medium text-xs sm:text-sm flex items-center gap-2 justify-center hover:bg-gray-100">
                <AiOutlineEye size={18} />
                <span>View {!isLoading && `(${data.pagination.total})`}</span>
              </div>
            </Link>
            <EditJobButton job={job} />
            <DeleteJobButton job={job} />
          </div>
        )}
      </div>

      {/*Location & Salary */}
      <div className="flex flex-wrap gap-4 items-center text-[#6c7b7f] text-xs sm:text-sm mt-4">
        <div className="flex items-center gap-1">
          <IoLocationOutline />
          <p>{job.location}</p>
        </div>

        <div className="flex items-center gap-1">
          <DollarSign size={14} />
          <p>{job.salary}</p>
        </div>
      </div>

      {/* Posted Date & Job Type */}
      <div className="text-[#6c7b7f] text-xs sm:text-sm mt-3">
        <p>
          Posted{" "}
          {new Date(job.createdAt!).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="flex items-center gap-2 mt-1 font-semibold">
          <span className="text-[#2c3e50]">●</span>
          <span>{job.jobType}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 text-[#6c7b7f] text-sm line-clamp-2">
        {job.description}
      </div>

      {/* Applications Count */}
      <div className="mt-6 text-[#6c7b7f] text-sm">
        <p>{!isLoading && data.pagination.total} applications</p>
      </div>

      {/* Action Buttons - Mobile only at the bottom */}
      {!isLg && (
        <div className="mt-6 flex justify-between gap-2">
          <Link to="/employer/applications" className="flex-1">
            <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-100">
              <AiOutlineEye size={18} />
              <span>View {!isLoading && `(${data.pagination.total})`}</span>
            </div>
          </Link>
          <div className="flex-1">
            <EditJobButton job={job} />
          </div>
          <div className="flex-1">
            <DeleteJobButton job={job} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobCard;
