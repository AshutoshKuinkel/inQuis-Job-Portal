import { useQuery } from "@tanstack/react-query";
import ManageJobCard from "../../components/employer/manage-job.card";
import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import { GoPlus } from "react-icons/go";
import {useNavigate } from "react-router";
import { getMyJobsAPI } from "../../api/employer.api";
import { IJob } from "../../types/job.types";

const ManageJobs = () => {
  const navigate = useNavigate();
    const { data, isLoading } = useQuery({
    queryFn: getMyJobsAPI,
    queryKey: ["get_my_Jobs_API"],
  });

  const redirectToCreateJob = () => {
    navigate("/employer/createJob");
  };
  return (
    <div className="h-screen">
      <div className="grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="p-2 col-span-7">
          {/* Employer dashboard header */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col gap-1 p-8">
              <h1 className="text-3xl text-[#2c3e50] font-semibold">
                Manage Jobs
              </h1>
              <p className="text-[#6C7B7F]">
                View, edit, and delete your job postings
              </p>
            </div>
            <button
              className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer"
              onClick={redirectToCreateJob}
            >
              <div className="flex items-center gap-3">
                <GoPlus size={22} />
                <p>Create New Job</p>
              </div>
            </button>
          </div>

          {/* Job Cards section */}
          <div className="pl-8 pr-8">
            <div className="flex flex-col gap-6">
              {!isLoading && (data.data?.map((job:IJob)=>{
                return <ManageJobCard job={job} key={job._id}/>
              }))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = withAuth(ManageJobs, [Role.EMPLOYER]);
export default page;
