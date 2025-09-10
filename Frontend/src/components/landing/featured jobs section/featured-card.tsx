import { Building2,DollarSign } from "lucide-react";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IJob } from "../../../types/job.types";
import { useNavigate } from "react-router";

interface IProps{
  featuredJob:IJob
}

const CategoryTextColoring = {
  Technology: 'text-blue-500',
  Design: 'text-purple-500',
  Marketing: 'text-green-500',
  Sales: 'text-orange-500',
  Mobile: 'text-pink-500',
  Security: 'text-red-500',
  Healthcare: 'text-teal-500',
  Engineering: 'text-indigo-500',
}

const FeaturedJobCard:React.FC<IProps> = ({featuredJob}) => {
  const navigate = useNavigate()
  const textColor = CategoryTextColoring[featuredJob.category.name as keyof typeof CategoryTextColoring]

  const handleApplyClick = ()=>{
    navigate(`/jobs/apply/${featuredJob._id}`)
  }
  return (
    <div className="flex flex-col border border-[#E9EBED] w-[90vw] sm:w-md gap-y-4 p-4 rounded-lg">
      {/* Job Role + Company Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl text-[#2c3e50] font-bold">{featuredJob.title}</h1>
        <div className="flex space-x-1 items-center text-[#6c7b7f] text-sm">
          <Building2 size={16}/>
          <p>{featuredJob.companyName}</p>
        </div>
      </div>

      {/* Category Section */}
      <div className="w-24 text-center bg-[#ECEEF2] rounded-lg py-1">
        <p className={`text-xs ${textColor} font-semibold`}>{featuredJob.category.name}</p>
      </div>

      {/* Description, line clamp 2 */}
      <div className="text-[#6c7b7f] line-clamp-2 text-xs">
        <p>
          {featuredJob.description}
        </p>
      </div>

      {/* Location + Salary Section */}
      <div className="flex space-x-3 items-center text-[#6c7b7f] text-sm">
        <div className="flex space-x-1 items-center">
          <IoLocationOutline />
          <p className="text-xs sm:text-sm">{featuredJob.location}</p>
        </div>

        <div className="flex space-x-1 items-center">
          <DollarSign size={16}/>
          <p className="text-xs sm:text-sm">{featuredJob.salary}</p>
        </div>
      </div>

      {/* Apply Now button */}
      <div>
        <button className="bg-[#2c3e50] text-white font-semibold w-full py-2 rounded-lg hover:cursor-pointer hover:bg-[#3a4753]" onClick={handleApplyClick}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default FeaturedJobCard;
