import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { getAllJobsAPI } from "../../../api/job.api";
import { useNavigate, useSearchParams } from "react-router";
import React, { useState } from "react";

const HeroCard = () => {

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const location = searchParams.get('location') || ''
  const currentPage = searchParams.get('currentPage') || '1'

  const [jobQuery,setJobQuery] = useState(query)
  const [jobLocation,setJobLocation] = useState(location)
  
  const {} = useQuery({
    queryFn:()=>getAllJobsAPI(currentPage,query,location),
    queryKey:['get_all_jobs',query,location,currentPage]
  })

  const handleSearch = (e:React.FormEvent)=>{
    e.preventDefault()
    navigate(`/jobs/?query=${jobQuery}&location=${jobLocation}&currentPage=${currentPage}`)
  }

  return (
    <div>
      <div className="bg-white mt-14 w-4.5xl shadow-2xl py-5 rounded-lg px-8">
        <form className="flex gap-6 justify-center items-center" onSubmit={handleSearch}>
          <div className=" flex items-center w-sm py-2 space-x-2 px-2 text-[#2c3e50] bg-[#FBFBFC] rounded-md">
            <CiSearch size={28} className="" />
            <input
              type="search"
              placeholder="Job title, keywords, or company"
              className="w-full outline-none"
              value={jobQuery}
              onChange={(e)=>setJobQuery(e.target.value)}
            />
          </div>

          <div className=" flex items-center bg-[#FBFBFC] rounded-md py-1 space-x-2 px-2">
            <IoLocationOutline size={28}/>
            <input
              type="search"
              placeholder="Location {City}"
              className="w-full outline-none"
              value={jobLocation}
              onChange={(e)=>setJobLocation(e.target.value)}
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
