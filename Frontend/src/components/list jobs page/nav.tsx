import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { TbClockHour7 } from "react-icons/tb";
import { DollarSign } from "lucide-react";
import { BiCategoryAlt } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { getAllJobsAPI } from "../../api/job.api";
import { useSearchParams } from "react-router";
import React, { useState } from "react";

// Fix sort by salary error. Maybe convert salary range to a certain currency and then arrange?

const ListJobsNav = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const location = searchParams.get("location") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const currentPage = searchParams.get("currentPage") || 1;

  const [jobQuery, setJobQuery] = useState(query);
  const [jobLocation, setJobLocation] = useState(location);
  const [jobSort, setJobSort] = useState(sortBy);

  const {} = useQuery({
    queryFn: () => getAllJobsAPI(currentPage, query, location,sortBy),
    queryKey: ["get_all_jobs", query, location, currentPage,sortBy],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      query: jobQuery,
      location: jobLocation,
      currentPage: "1",
    });
  };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setJobSort(value)
    setSearchParams({
      query: jobQuery,
      location: jobLocation,
      currentPage: "1",
      sortBy: value
    });
  };
  return (
    <div>
      {/* Search bar */}
      <div className="bg-white mt-0.5 w-4.5xl shadow-2xl py-5 rounded-lg px-8">
        <form
          onSubmit={handleSearch}
          className="flex gap-6 justify-center items-center"
        >
          <div className=" flex items-center w-sm py-2 space-x-2 px-2 text-[#2c3e50] bg-[#FBFBFC] rounded-md">
            <CiSearch size={28} className="" />
            <input
              type="search"
              placeholder="Job title, keywords, or company"
              className="w-full outline-none"
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
            />
          </div>

          <div className=" flex items-center bg-[#FBFBFC] rounded-md py-1 space-x-2 px-2">
            <IoLocationOutline size={28} />
            <input
              type="search"
              placeholder="Location {City}"
              className="w-full outline-none"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
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

          <form className="flex gap-2" onSubmit={handleSearch}>
            {/* Date posted */}
            <div className="flex items-center bg-[#E9EBED] p-2 text-xs text-[#2c3e50] rounded-md">
              <div className="flex items-center gap-1">
                <TbClockHour7 size={18} />
              </div>
              <select className="outline-none"
              value={jobSort}
              onChange={handleSort}
              >
                <option defaultValue={"defaultvalue"}>Date Posted</option>
                <option value='latest'>Latest</option>
                <option value='oldest'>Earlier</option>
              </select>
            </div>

            {/* Salary */}
            <div className="flex items-center bg-[#E9EBED] p-2 text-xs text-[#2c3e50] rounded-md">
              <div className="flex items-center gap-1">
                <DollarSign size={18} />
              </div>
              <select className="outline-none"
                value={jobSort}
                onChange={handleSort}
              >
                <option defaultValue={"defaultvalue"}>Salary Range</option>
                <option value="highestSalary">Highest</option>
                <option value="lowestSalary">Lowest</option>
              </select>
            </div>

            <div className="flex items-center bg-[#E9EBED] p-2 text-xs text-[#2c3e50] rounded-md">
              <div className="flex items-center gap-1">
                <BiCategoryAlt size={18} />
              </div>
              <select className="outline-none">
                <option defaultValue={"defaultvalue"}>Category</option>
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
