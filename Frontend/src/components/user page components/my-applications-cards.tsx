import { Building2, DollarSign } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import { IoTrashOutline } from "react-icons/io5";
import React from "react";
import { IJob } from "../../types/job.types";
import { IApplicationResponse } from "../../types/application.types";

interface IProps{
  job:IJob
  application:IApplicationResponse
}

const MyApplicationCards:React.FC<IProps> = ({job,application}) => {
  return (
    <div>
      <div className="border p-6 rounded-xl border-[#E9EBED] mt-6 border-l-8">
        <div className="flex flex-col space-y-3">
          <div className="flex items-baseline space-x-3">
            <h1 className="text-xl text-[#2c3e50] font-bold line-clamp-1">
              {job.title}
            </h1>
            {/* Category Section */}
            <div className="w-24 text-center bg-[#ECEEF2] rounded-lg py-1">
              <p className={`text-xs text-[#2c3e50] font-semibold`}>{application.status}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-1 items-center text-[#6c7b7f] text-sm">
              <Building2 size={16} />
              <p>{job.companyName}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-gray-200">
                <AiOutlineEye size={20} />
                <button className="hover:cursor-pointer">View</button>
              </div>

              <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-gray-200">
                <LiaEdit size={20} />
                <button className="hover:cursor-pointer">Edit</button>
              </div>

              <div className="border border-[#E9EBED] p-2 rounded-lg text-red-500 font-semibold text-sm flex items-center space-x-2 max-w-36 justify-center hover:cursor-pointer hover:bg-gray-200">
                <IoTrashOutline size={20} />
                <button className="hover:cursor-pointer">Withdraw</button>
              </div>
            </div>
          </div>
        </div>

        {/* Location + Salary Section */}
        <div className="flex space-x-3 items-center text-[#6c7b7f] text-sm mt-2">
          <div className="flex space-x-1 items-center">
            <IoLocationOutline />
            <p>{job.location}</p>
          </div>

          <div className="flex space-x-1 items-center">
            <DollarSign size={16} />
            <p className="">{job.salary}</p>
          </div>

          <div className="flex space-x-1 items-center text-gray-500">
            <CiCalendar size={20} className="text-gray-600" />
            <p>Applied {new Date(application.createdAt).toLocaleDateString("en-GB")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplicationCards;
