import React from "react";
import { withAuth } from "../../hoc/with-auth.hoc";
import { everyone } from "../../types/enum.types";

const ProfileForm = () => {
  return (
    <div className="flex justify-center items-center border border-[#E9EBED]">
      <form className="flex flex-col gap-4">
        {/* Personal Information */}
        <div>
          <p className="text-[#2C3E50] mb-3">Personal Information</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-[#2c3e50] text-sm font-semibold">
                First Name
              </label>
              <div
                className={
                  "flex items-center gap-2 px-2 py-2 w-[90vw] sm:w-[22rem]  bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
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
                  "flex items-center gap-2 py-2 w-[90vw] sm:w-[22rem] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  className=" rounded-md outline-none w-full"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-[#2c3e50] text-sm font-semibold">
                Contact Email
              </label>
              <div
                className={
                  "flex items-center gap-2 px-2 py-2 w-[90vw] sm:w-[22rem]  bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  id="contactEmail"
                  type="text"
                  placeholder="Enter your email"
                  className=" rounded-md outline-none w-full"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#2c3e50] text-sm font-semibold">
                Phone Number
              </label>
              <div
                className={
                  "flex items-center gap-2 py-2 w-[90vw] sm:w-[22rem] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="e.g 1234567890"
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
