import { useQuery } from "@tanstack/react-query";
import DetailCard from "./detail-card";
import JobCard from "./job-main-card";
import { getAllJobsAPI } from "../../../api/job.api";
import { IJob } from "../../../types/job.types";
import { useNavigate, useParams } from "react-router";

const JobDisplay = () => {

  const navigate = useNavigate()
  const {id: selectedJobId} = useParams()

  const {data} = useQuery({
    queryFn:getAllJobsAPI,
    queryKey:['get_all_jobs']
  })

  const handleJobClick=(id:string)=>{
    navigate(`/jobs/${id}`)
  }

  return (
    <div className="flex justify-center mt-16">
      <div className="grid grid-cols-3 gap-3">
        {/* Cards */}
        <div className="col-span-1">
          <div className="flex flex-col gap-3">
            {data?.data.map((job:IJob)=>(
              <JobCard job={job} key={job._id} handleClick={handleJobClick}/>
            ))}
          </div>
        </div>

        {/* Detail Section */}
        <div className="col-span-2 border max-w-4xl h-screen sticky top-0">
          <div className="h-full overflow-hidden hover:overflow-auto"
           style={{ scrollbarGutter: "stable" }}
          >
            <DetailCard jobId={selectedJobId ?? null}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDisplay;
