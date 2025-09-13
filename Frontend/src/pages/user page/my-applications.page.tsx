
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import { useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ChangePageButtons } from "../../components/user page components/change-page-buttons";
import ViewMyApplications from "../../components/application/list-job-applications";

const MyApplicationsPage = () => {
  const navigate = useNavigate();
  const redirectBack = () => {
    navigate(-1);
  };
  return (
    <div className="">
      {/* Page Header */}
      <div className="border border-gray-300 flex flex-col pl-6 pb-5 sm:pb-0 sm:pl-44 sm:pt-8 sm:h-[15vh] gap-4">
        <div
          onClick={redirectBack}
          className="flex items-center space-x-2 sm:space-x-0 hover:bg-gray-200 hover:rounded-md p-2 text-xs mb-1 hover:cursor-pointer w-[5rem] font-semibold mt-3 sm:mt-0"
        >
          <FaArrowLeftLong className="text-[#2c3e50]" />
          <button className=" text-[#2c3e50] sm:px-3 rounded-md hover:cursor-pointer">
            Back
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-[#2c3e50] font-semibold">My Profile</h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
        {/* Signup Sign in button replica */}
        <ChangePageButtons />

        {/* Job Cards with Application status + buttons to veiw update & withdraw*/}
        <ViewMyApplications/>
      
      </div>
    </div>
  );
};

const page = withAuth(MyApplicationsPage, [Role.SEEKER]);
export default page;
