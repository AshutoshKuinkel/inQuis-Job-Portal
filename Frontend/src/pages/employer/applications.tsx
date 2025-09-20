import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";

const Applications = () => {
  return (
    <div className="">
      <div className="grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="p-2 col-span-7">
          {/* Employer dashboard header */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col gap-1 p-8">
              <h1 className="text-3xl text-[#2c3e50] font-semibold">
                All Applications
              </h1>
              <p className="text-[#6C7B7F]">
                Review and manage all job applications
              </p>
            </div>
          </div>

          {/* Applications cards */}
        </div>
      </div>
    </div>
  );
};

const page = withAuth(Applications, [Role.EMPLOYER]);
export default page;
