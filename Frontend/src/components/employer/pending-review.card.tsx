import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { viewApplicationStats } from "../../api/employer.api";
import { IApplicationResponse } from "../../types/application.types";

const PendingReviewsCard = () => {
  const { data: stats, isLoading } = useQuery({
    queryFn: viewApplicationStats,
    queryKey: ["view_Application_Stats"],
  });

  const pendingReviews = stats?.data?.filter(
    (application: IApplicationResponse) => application.status === "PENDING"
  ) ?? [];

  return (
    <div className="border border-[#E9EBED] xl:w-[25rem] flex flex-col p-6 text-lg gap-6 rounded-lg">
      <div className="flex items-center gap-2 text-[#2c3e50]">
        <Check size={22} />
        <p>Pending Reviews</p>
      </div>
      <div>
        <p className={`${isLoading ? "text-2xl" : "text-4xl"} text-[#2c3e50] font-semibold`}>
          {isLoading ? "Loading..." : pendingReviews.length}
        </p>
        <p className="text-sm text-[#6C7B7F]">Need your attention</p>
      </div>
    </div>
  );
};

export default PendingReviewsCard;
