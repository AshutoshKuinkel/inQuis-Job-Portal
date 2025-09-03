import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

const HeroCard = () => {
  return (
    <div>
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
    </div>
  )
}

export default HeroCard
