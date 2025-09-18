import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import EmployerProfileForm from "../../components/employer/employer-profile-form";
import { LiaCalendar } from "react-icons/lia";
import { EmployerProfileButton } from "../../components/employer/profile-button";
import { useAuth } from "../../context/auth-context";

const Profile = () => {
  const {user} = useAuth()
  return (
    <div className="">
      <div className="grid grid-cols-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="p-2 col-span-7">
          <div className="border-b border-[#E9EBED]">
            <h1 className="text-[#2c3e50] text-3xl p-10 font-semibold">Employer Profile</h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 mt-6 ">
            {/* Profile Button */}
            <EmployerProfileButton />

            {/* Profile Form, Create a new one of this for employer api */}
            <EmployerProfileForm/>

            {/* Account info section */}
            <div className="flex flex-col border border-[#E9EBED] w-[95vw] sm:w-[65vw] rounded-xl p-6 gap-4 ">
              <p className="text-[#2c3e50]">Account Information</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <LiaCalendar size={20} />
                <p>
                  Member since{" "}
                  {new Date(user?.createdAt!).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = withAuth(Profile, [Role.EMPLOYER]);
export default page;
