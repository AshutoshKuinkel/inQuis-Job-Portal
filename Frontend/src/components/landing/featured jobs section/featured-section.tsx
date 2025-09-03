import FeaturedJobCard from "./featured-card"
import { IJob } from "../../../types/job.types"
import { useQuery } from "@tanstack/react-query"
import { getFeaturedJobAPI } from "../../../api/featured-job.api"

const FeaturedSection = () => {

  const {data} = useQuery({
    queryFn:getFeaturedJobAPI,
    queryKey:['featured_Job_API']
  })

  return (
    <div className="pb-40">
      {/* Title Section */}
      <div className='flex flex-col items-start justify-center pl-72 pt-12'>
        <h1 className='text-3xl text-[#2e3c50] font-bold'>Featured Jobs</h1>
        <p className='text-sm text-[#6C7B7F]'>6 jobs found</p>
      </div>

      {/* Card Section */}
      <div className="sm:px-64 mt-6 grid grid-cols-3 gap-4">
        {(data?.data.map((featuredJob:IJob)=>(
          <FeaturedJobCard featuredJob={featuredJob} key={featuredJob._id}/>
        )))}
      </div>
    </div>
  )
}

export default FeaturedSection
