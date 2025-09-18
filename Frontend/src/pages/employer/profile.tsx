import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import ProfileForm from "../../components/user page components/profile-form";
import { LiaCalendar } from "react-icons/lia";
import { EmployerProfileButton } from "../../components/employer/profile-button";

const Profile = () => {
  return (
    <div className="">
      <div className="grid grid-cols-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="p-2 col-span-7 place-items-center">
          <div className="flex flex-col justify-center items-center gap-4 mt-6 ">
            {/* Profile Button */}
            <EmployerProfileButton />

            {/* Profile Form, Create a new one of this for employer api */}
            <ProfileForm />

            {/* Account info section */}
            <div className="flex flex-col border border-[#E9EBED] w-[95vw] sm:w-[65vw] rounded-xl p-6 gap-4 ">
              <p className="text-[#2c3e50]">Account Information</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <LiaCalendar size={20} />
                <p>
                  Member since{" "}
                  {/* {new Date(user?.createdAt!).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} */}
                  January 2024
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
