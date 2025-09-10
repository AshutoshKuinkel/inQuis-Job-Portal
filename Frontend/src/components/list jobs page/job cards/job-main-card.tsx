import { Building2, DollarSign } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import { IJob } from "../../../types/job.types";
import React from "react";
import { useNavigate } from "react-router";

interface IProps {
  job: IJob;
  handleClick: (id: string) => void;
}

const CategoryTextColoring = {
  Technology: "text-blue-500",
  Design: "text-purple-500",
  Marketing: "text-green-500",
  Sales: "text-orange-500",
  Mobile: "text-pink-500",
  Security: "text-red-500",
  Healthcare: "text-teal-500",
  Engineering: "text-indigo-500",
};

const JobCard: React.FC<IProps> = ({ job, handleClick }) => {
  const navigate = useNavigate()
  const textColor =
    CategoryTextColoring[
      job.category.name as keyof typeof CategoryTextColoring
    ];

    const handleApplyClick = ()=>{
      navigate(`/jobs/apply/${job._id}`)
    }
  return (
    <div
      onClick={() => handleClick(job._id)}
      className="flex flex-col border border-[#E9EBED] w-md gap-y-4 p-4 rounded-lg hover:border hover:border-[#2e3c50] hover:cursor-pointer"
    >
      {/* Job Role + Company Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl text-[#2c3e50] font-bold line-clamp-1">{job.title}</h1>
        <div className="flex space-x-1 items-center text-[#6c7b7f] text-sm">
          <Building2 size={16} />
          <p>{job.companyName}</p>
        </div>
      </div>

      {/* Category Section */}
      <div className="w-24 text-center bg-[#ECEEF2] rounded-lg py-1">
        <p className={`text-xs ${textColor} font-semibold`}>
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
          <p className="">{job.salary}</p>
        </div>
      </div>
      {/* Apply Now button */}
      <div>
        <button className="bg-[#2c3e50] text-white font-semibold w-full py-2 rounded-lg hover:cursor-pointer hover:bg-[#3a4753]" onClick={handleApplyClick}>
          Quick Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
