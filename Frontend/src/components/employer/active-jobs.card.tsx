import { useQuery } from "@tanstack/react-query";
import { getMyJobsAPI } from "../../api/employer.api";
import { LuBriefcase } from "react-icons/lu";

const ActiveJobsCard = () => {
  const currentPage = null;
  const { data, isLoading } = useQuery({
    queryFn: () => getMyJobsAPI(currentPage),
    queryKey: ["get_my_Jobs_API"],
  });

  const totalJobs = data?.pagination?.total ?? 0;

  return (
    <div>
      <div className="border border-[#E9EBED] flex flex-col p-6 text-lg gap-6 rounded-lg">
        <div className="flex items-center gap-2 text-[#2c3e50]">
          <LuBriefcase size={22} />
          <p>Active Jobs</p>
        </div>
        <div>
          <p className={`${isLoading ? "text-2xl" : "text-4xl"} text-[#2c3e50] font-semibold`}>
            {isLoading ? "Loading..." : totalJobs}
          </p>
          <p className="text-sm text-[#6C7B7F]">Currently Posted</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveJobsCard;
