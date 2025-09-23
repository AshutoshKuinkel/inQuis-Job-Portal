import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import { Check } from "lucide-react";
import TotalApplicationsCard from "../../components/employer/total-applications.card";
import RecentApplicationCards from "../../components/employer/recent-application.cards";
import ActiveJobsCard from "../../components/employer/active-jobs.card";
import { useQuery } from "@tanstack/react-query";
import {viewRecentApplicationsAPI } from "../../api/employer.api";
import { IApplicationResponse } from "../../types/application.types";

const EmployerDashboard = () => {

  const { data, isPending } = useQuery({
    queryFn:viewRecentApplicationsAPI,
    queryKey: ["view_recent_Applications_API"],
  });

  return (
    <div className="h-screen">
      <div className="grid grid-cols-8 h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="col-span-6">
          {/* Employer dashboard header */}
          <div className="flex flex-col gap-1 p-8">
            <h1 className="text-3xl text-[#2c3e50] font-semibold">
              Employer Dashboard
            </h1>
            <p className="text-[#6C7B7F]">
              Manage your job postings and applications
            </p>
          </div>

          {/* Job Stats */}
          <div className="grid grid-cols-3 place-items-center">
            <ActiveJobsCard />

            <TotalApplicationsCard />

            <div className="border border-[#E9EBED] xl:w-[25rem] flex flex-col p-6 text-lg gap-6 rounded-lg">
              <div className="flex items-center gap-2 text-[#2c3e50]">
                <Check size={22} />
                <p>Pending Reviews</p>
              </div>
              <div>
                <p className="text-4xl text-[#2c3e50] font-semibold">2</p>
                <p className="text-sm text-[#6C7B7F]">Need your attention</p>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="p-8">
            <div className="border border-[#E9EBED] rounded-lg p-6">
              <p className="text-[#2c3e50] text-lg">Recent Applications</p>

              {/* Recent Application Cards */}
              {!isPending &&
                data.data.map((application: IApplicationResponse) => {
                  return (
                    <RecentApplicationCards
                      application={application}
                      key={application._id}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = withAuth(EmployerDashboard, [Role.EMPLOYER]);
export default page;
