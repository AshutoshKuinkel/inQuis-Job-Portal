import { BsPeople } from "react-icons/bs";
import { viewAllApplicationsAPI } from "../../api/employer.api";
import { useQuery } from "@tanstack/react-query";

const TotalApplicationsCard = () => {
  const currentPage = null;
  const { data, isLoading } = useQuery({
    queryFn: () => viewAllApplicationsAPI(currentPage),
    queryKey: ["view_all_Applications_API"],
  });
  return (
    <div className="border border-[#E9EBED] flex flex-col p-6 text-lg gap-6 rounded-lg">
      <div className="flex items-center gap-2 text-[#2c3e50]">
        <BsPeople size={22} />
        <p>Total Applications</p>
      </div>
      <div>
        <h1 className="text-2xl text-[#2c3e50] font-semibold">
          {isLoading ? "Loading..." : <p className="text-4xl text-[#2c3e50] font-semibold">{data?.pagination?.total ?? 0}</p>}
        </h1>
        <p className="text-sm text-[#6C7B7F]">Across all jobs</p>
      </div>
    </div>
  );
};

export default TotalApplicationsCard;
