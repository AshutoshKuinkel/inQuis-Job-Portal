import { Building2,DollarSign } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";

const FeaturedJobCard = () => {
  return (
    <div className="flex flex-col border border-[#E9EBED] w-md gap-y-4 p-4 rounded-lg">
      {/* Job Role + Company Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl text-[#2c3e50] font-bold">Senior Frontend Developer</h1>
        <div className="flex space-x-1 items-center text-[#6c7b7f] text-sm">
          <Building2 size={16}/>
          <p>TechCorp Inc.</p>
        </div>
      </div>

      {/* Category Section */}
      <div className="w-24 text-center bg-[#ECEEF2] rounded-lg py-1">
        <p className="text-sm text-[#2c3e50] font-semibold">Technology</p>
      </div>

      {/* Description, line clamp 2 */}
      <div className="text-[#6c7b7f] line-clamp-2 text-xs">
        <p>
          We're looking for a senior frontend developer to join our team and
          help build the next generation of web applications using React,...
        </p>
      </div>

      {/* Location + Salary Section */}
      <div className="flex space-x-3 items-center text-[#6c7b7f] text-sm">
        <div className="flex space-x-1 items-center">
          <IoLocationOutline />
          <p>San Fransisco, CA</p>
        </div>

        <div className="flex space-x-1 items-center">
          <DollarSign size={16}/>
          <p>$120k - $160k</p>
        </div>
      </div>

      {/* Apply Now button */}
      <div>
        <button className="bg-[#2c3e50] text-white font-semibold w-full py-2 rounded-lg hover:cursor-pointer hover:bg-[#3a4753]">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default FeaturedJobCard;
