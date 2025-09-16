import { useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import ApplicationForm from "../../components/application/application-form";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";

const JobApplicationPage = () => {
  const navigate = useNavigate();

  const redirectBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="border border-gray-300 flex flex-col pl-3 sm:pl-8 pb-5 xl:h-[18vh] gap-4">
        <div
          onClick={redirectBack}
          className="flex items-center space-x-2 sm:space-x-0 hover:bg-gray-200 hover:rounded-md p-2 text-xs mb-1 hover:cursor-pointer w-[5rem] font-semibold mt-3 sm:mt-2"
        >
          <FaArrowLeftLong className="text-[#2c3e50]" />
          <button className=" text-[#2c3e50] sm:px-3 rounded-md hover:cursor-pointer">
            Back
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-[#2c3e50] font-semibold">
            Thank your for choosing inQuis.
          </h1>
          <p className="text-md text-gray-500">
            Submit your application and we'll notify the employer.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center min-h-screen mt-12 mb-12 w-full">
        <div className="flex flex-col justify-center items-center w-[95vw] md:w-3xl p-6 rounded-md border border-gray-200 shadow">
          
          {/* Application Form */}
          <ApplicationForm/>
          
        </div>
      </div>
    </div>
  );
};

const page = withAuth(JobApplicationPage,[Role.SEEKER])
export default page
