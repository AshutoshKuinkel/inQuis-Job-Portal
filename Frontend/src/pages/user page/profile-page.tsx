
import { withAuth } from "../../hoc/with-auth.hoc";
import { everyone } from "../../types/enum.types";
import { useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProfileForm from "../../components/user page components/profile-form";
import { ChangePageButtons } from "../../components/user page components/change-page-buttons";
import { LiaCalendar } from "react-icons/lia";
import { useAuth } from "../../context/auth-context";

const ProfilePage = () => {
  const navigate = useNavigate();
  const redirectBack = () => {
    navigate(-1);
  };
  const {user} = useAuth()
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

      <div className="flex flex-col justify-center items-center gap-5">
        {/* Signup Sign in button replica */}
        <ChangePageButtons />

        {/* Form with fName,LName,email,password */}
        <ProfileForm />

        {/* Account info section */}
        <div className="flex flex-col border border-[#E9EBED] sm:w-[65vw] rounded-xl p-6 gap-4">
          <p className="text-[#2c3e50]">Account Information</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <LiaCalendar size={20}/>
            <p>Member since{" "}
          {new Date(user?.createdAt!).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          </div> 
        </div>
      </div>
    </div>
  );
};

const page = withAuth(ProfilePage, everyone);
export default page;
