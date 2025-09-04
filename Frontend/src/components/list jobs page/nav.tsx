import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { TbClockHour7 } from "react-icons/tb";
import { DollarSign } from "lucide-react";
import { BiCategoryAlt } from "react-icons/bi";

const ListJobsNav = () => {
  return (
    <div>
      {/* Search bar */}
      <div className="bg-white mt-0.5 w-4.5xl shadow-2xl py-5 rounded-lg px-8">
        <form className="flex gap-6 justify-center items-center">
          <div className=" flex items-center w-sm py-2 space-x-2 px-2 text-[#2c3e50] bg-[#FBFBFC] rounded-md">
            <CiSearch size={28} className="" />
            <input
              type="search"
              placeholder="Job title, keywords, or company"
              className="w-full outline-none"
            />
          </div>

          <div className=" flex items-center bg-[#FBFBFC] rounded-md py-1 space-x-2 px-2">
            <IoLocationOutline size={28} />
            <input
              type="search"
              placeholder="Location {City}"
              className="w-full outline-none"
            />
          </div>

          <div className=" flex items-center px-10 py-2 space-x-2 bg-[#2c3e50] text-white font-semibold rounded-md hover:cursor-pointer">
            <CiSearch size={28} />
            <button type="submit" className="text-md">
              Search Jobs
            </button>
          </div>
        </form>
        {/* Sort by buttons; highest/lowerst salary, latest/oldest */}
        <div className="flex justify-center mt-3 gap-2 items-center">
          <h1 className="text-[#2c3e50]">Sort By:</h1>

          <form className="flex gap-2">
            {/* Date posted */}
            <div className="flex items-center bg-[#E9EBED] p-2 text-xs text-[#2c3e50] rounded-md">
              <div className="flex items-center gap-1">
                <TbClockHour7 size={18} />
              </div>
              <select className="outline-none">
                <option selected>
                  <label> Date Posted</label>
                </option>
                <option>Latest</option>
                <option>Earlier</option>
              </select>
            </div>

            {/* Salary */}
            <div className="flex items-center bg-[#E9EBED] p-2 text-xs text-[#2c3e50] rounded-md">
              <div className="flex items-center gap-1">
                <DollarSign size={18} />
              </div>
              <select className="outline-none">
                <option selected>
                  <label> Salary Range</label>
                </option>
                <option>Highest</option>
                <option>Lowest</option>
              </select>
            </div>

            <div className="flex items-center bg-[#E9EBED] p-2 text-xs text-[#2c3e50] rounded-md">
              <div className="flex items-center gap-1">
                <BiCategoryAlt size={18} />
              </div>
              <select className="outline-none">
                <option selected>
                  <label> Category</label>
                </option>
                <option>Design</option>
                <option>Technology</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Mobile</option>
                <option>Security</option>
                <option>Healthcare</option>
                <option>Engineering</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListJobsNav;
