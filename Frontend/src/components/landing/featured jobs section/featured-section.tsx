import FeaturedJobCard from "./featured-card"

const FeaturedSection = () => {
  return (
    <div>
      {/* Title Section */}
      <div className='flex flex-col items-start justify-center pl-72 pt-12'>
        <h1 className='text-3xl text-[#2e3c50] font-bold'>Featured Jobs</h1>
        <p className='text-sm text-[#6C7B7F]'>6 jobs found</p>
      </div>

      {/* Card Section */}
      <div className="sm:px-72 mt-10">
        <FeaturedJobCard/>
      </div>
    </div>
  )
}

export default FeaturedSection
