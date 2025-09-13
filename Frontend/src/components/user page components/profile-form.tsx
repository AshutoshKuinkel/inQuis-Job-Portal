import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { withAuth } from "../../hoc/with-auth.hoc";
import { everyone } from "../../types/enum.types";

const ProfileForm = () => {
  // Make onlick function so that when edit profile is clicked, all form fields become normal
  const { user } = useAuth();
  const [isEditProfileClicked, setIsEditProfileClicked] = useState(false);

  const handleEditProfileClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditProfileClicked(true);
  };
  return (
    <div className="flex justify-center items-center border border-[#E9EBED] sm:w-[65vw] rounded-xl mt-4">
      <form className="flex flex-col gap-4">
        {/* Personal Information */}
        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-[#2C3E50] mb-3 mt-6 sm:mb-9 sm:mt-6">
              Personal Information
            </p>
            {isEditProfileClicked ? (
              <button
                type="submit"
                className="border bg-[#2c3e50] p-2 rounded-lg text-white font-semibold text-sm hover:cursor-pointer hover:bg-[#3a4753]"
                onClick={handleEditProfileClick}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm hover:cursor-pointer hover:bg-gray-200"
                onClick={handleEditProfileClick}
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-[#2c3e50] text-sm font-semibold">
                First Name
              </label>
              <div
                className={
                  "flex items-center gap-2 px-2 py-2 w-[90vw] sm:w-[30vw]  bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  disabled={!isEditProfileClicked}
                  id="firstName"
                  type="text"
                  placeholder={user?.first_name}
                  className=" rounded-md outline-none  w-full"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#2c3e50] text-sm font-semibold">
                Last Name
              </label>
              <div
                className={
                  "flex items-center gap-2 py-2 w-[90vw] sm:w-[30vw] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  disabled={!isEditProfileClicked}
                  id="lastName"
                  type="text"
                  placeholder={user?.last_name}
                  className=" rounded-md outline-none w-full"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-[#2c3e50] text-sm font-semibold">
                Email
              </label>
              <div
                className={
                  "flex items-center gap-2 px-2 py-2 w-[90vw] sm:w-[30vw]  bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  disabled={!isEditProfileClicked}
                  id="email"
                  type="text"
                  placeholder={user?.email}
                  className=" rounded-md outline-none w-full"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#2c3e50] text-sm font-semibold">
                Password
              </label>
              <div
                className={
                  "flex items-center gap-2 py-2 w-[90vw] sm:w-[30vw] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  disabled={!isEditProfileClicked}
                  id="password"
                  type="password"
                  placeholder="********"
                  className=" rounded-md outline-none w-full"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const page = withAuth(ProfileForm, everyone);

export default page;
