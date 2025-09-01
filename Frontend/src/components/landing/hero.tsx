import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <div className="flex flex-col bg-[#F9F9FA] justify-center items-center pb-10">
      {/* Ttile + Slogan section */}
      <div className="text-[#2c3e50] mt-20 text-center flex flex-col gap-6">
        <h1 className="font-bold text-5xl">Find Your Dream Job</h1>
        <p className="text-lg max-w-2xl text-[#6C7B7F]">
          Discover thousands of job opportunities from top companies. Your next
          career move is just a search away.
        </p>
      </div>

      {/* Card Section */}
      <div className="bg-white mt-14 w-4.5xl shadow-2xl py-5 rounded-lg px-8">
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
            <IoLocationOutline size={28}/>
            <input
              type="search"
              placeholder="Location {City}"
              className="w-full outline-none"
            />
          </div>

          <div className=" flex items-center px-10 py-2 space-x-2 bg-[#2c3e50] text-white font-semibold rounded-md hover:cursor-pointer">
            <CiSearch size={28}/>
            <button type="submit" className="text-md">Search Jobs</button>
          </div>
        </form>
      </div>

      {/* Stats section */}
      <div className="flex gap-10 justify-center">
        <div className="text-[#2c3e50] mt-18 flex flex-col items-baseline justify-center">
          <h1 className="font-bold text-3xl">50K+</h1>
          <p className="text-lg max-w-2xl text-[#6C7B7F]">Active Jobs</p>
        </div>

        <div className="text-[#2c3e50] mt-18 flex flex-col items-baseline justify-center">
          <h1 className="font-bold text-3xl">25K+</h1>
          <p className="text-lg max-w-2xl text-[#6C7B7F]">Companies</p>
        </div>

        <div className="text-[#2c3e50] mt-18 flex flex-col items-baseline justify-center">
          <h1 className="font-bold text-3xl">100K+</h1>
          <p className="text-lg max-w-2xl text-[#6C7B7F]">Job Seekers</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
