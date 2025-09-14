import { useQuery } from "@tanstack/react-query";
import { viewMyApplicationsAPI } from "../../api/user.api";
import MyApplicationCards from "../user page components/my-applications-cards";

const ViewMyApplications = () => {
  const { data } = useQuery({
    queryFn: viewMyApplicationsAPI,
    queryKey: ["my_applications"],
  });

  return (
    <div className="flex flex-col border border-[#E9EBED] w-[60vw] p-6 rounded-lg">
      <div>
        <p className="text-[#2c3e50]">Job Applications</p>
        <p className="text-gray-500 text-sm">
          Track and manage your job applications
        </p>
      </div>
      {/* Jobs Applied to Cards */}
      {data?.data.map((application:any) =>
        application.job ? (
          <MyApplicationCards job={application.job} key={application._id} />
        ) : null
      )}
    </div>
  );
};

export default ViewMyApplications;
