import { useQuery } from "@tanstack/react-query";
import DetailCard from "./detail-card";
import JobCard from "./job-main-card";
import { getAllJobsAPI } from "../../../api/job.api";
import { IJob } from "../../../types/job.types";
import { useState } from "react";

const JobDisplay = () => {
  
  const {data} = useQuery({
    queryFn:getAllJobsAPI,
    queryKey:['get_all_jobs']
  })

  const [clickedjobId,setclickedJobId] = useState<string|null>(null)

  const handleclickedJob=(id:string)=>{
    setclickedJobId(id)
  }

  return (
    <div className="flex justify-center mt-16">
      <div className="grid grid-cols-3 gap-3">
        {/* Cards */}
        <div className="col-span-1">
          <div className="flex flex-col gap-3">
            {data?.data.map((job:IJob)=>(
              <JobCard job={job} key={job._id} onClick={handleclickedJob}/>
            ))}
          </div>
        </div>

        {/* Detail Section */}
        <div className="col-span-2 border max-w-4xl h-screen sticky top-0">
          <div className="h-full overflow-hidden hover:overflow-auto"
           style={{ scrollbarGutter: "stable" }}
          >
            <DetailCard id={clickedjobId}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDisplay;
