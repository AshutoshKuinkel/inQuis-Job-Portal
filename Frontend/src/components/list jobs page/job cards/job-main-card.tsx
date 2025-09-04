import { Building2, DollarSign } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import { IJob } from "../../../types/job.types";
import React from "react";

interface IProps {
  job: IJob;
  onClick: (id: string) => void;
}
const JobCard: React.FC<IProps> = ({ job, onClick }) => {
  return (
    <div
      onClick={() => onClick(job._id)}
      className="flex flex-col border border-[#E9EBED] w-md gap-y-4 p-4 rounded-lg hover:border hover:border-[#2e3c50] hover:cursor-pointer"
    >
      {/* Job Role + Company Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl text-[#2c3e50] font-bold">{job.title}</h1>
        <div className="flex space-x-1 items-center text-[#6c7b7f] text-sm">
          <Building2 size={16} />
          <p>{job.companyName}</p>
        </div>
      </div>

      {/* Category Section */}
      <div className="w-24 text-center bg-[#ECEEF2] rounded-lg py-1">
        <p className={`text-xs text-[#2e3c50] font-semibold`}>
          {job.category?.name || "Uncategorized"}
        </p>
      </div>

      {/* Description, line clamp 2 */}
      <div className="text-[#6c7b7f] line-clamp-2 text-xs">
        <p>{job.description}</p>
      </div>

      {/* Location + Salary Section */}
      <div className="flex space-x-3 items-center text-[#6c7b7f] text-sm">
        <div className="flex space-x-1 items-center">
          <IoLocationOutline />
          <p>{job.location}</p>
        </div>

        <div className="flex space-x-1 items-center">
          <DollarSign size={16} />
          <p>{job.salary}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
