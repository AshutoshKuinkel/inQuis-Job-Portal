import { useQuery } from "@tanstack/react-query";
import { getMyJobsAPI } from "../../api/employer.api";
import { LuBriefcase } from "react-icons/lu";

const ActiveJobsCard = () => {
  const currentPage = null
  const { data, isLoading } = useQuery({
    queryFn: () => getMyJobsAPI(currentPage),
    queryKey: ["get_my_Jobs_API"],
  });

  return (
    <div>
      <div className="border border-[#E9EBED] xl:w-[25rem] flex flex-col p-6 text-lg gap-6 rounded-lg">
        <div className="flex items-center gap-2 text-[#2c3e50]">
          <LuBriefcase size={22} />
          <p>Active Jobs</p>
        </div>
        <div>
          <p className="text-4xl text-[#2c3e50] font-semibold">
            {!isLoading && data.pagination.total}
          </p>
          <p className="text-sm text-[#6C7B7F]">Currently Posted</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveJobsCard;
