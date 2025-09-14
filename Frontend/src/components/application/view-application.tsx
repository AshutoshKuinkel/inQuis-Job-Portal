// import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ImageInput from "../inputs/image-input";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";

const ViewApplication = () => {
  const methods = useForm({});
  const navigate = useNavigate();

  const redirectBack = () => {
    navigate('/myApplications');
  };
  return (
    <div className=" min-h-screen">
      <div className="flex flex-col justify-center items-center sm:mt-10 sm:mb-10 ">
        <FormProvider {...methods}>
          <form className="flex flex-col gap-4 border border-[#E9EBED] p-3 rounded-xl">
            <div
              onClick={redirectBack}
              className="flex items-center space-x-2 sm:space-x-0 hover:bg-gray-200 hover:rounded-md p-2 text-xs mb-1 hover:cursor-pointer w-[5rem] font-semibold mt-3 sm:mt-0"
            >
              <FaArrowLeftLong className="text-[#2c3e50]" />
              <button className=" text-[#2c3e50] sm:px-3 rounded-md hover:cursor-pointer">
                Back
              </button>
            </div>

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

              <label className="text-[#2c3e50] mt-3 font-semibold">
                LinkedIn Profile (Optional)
              </label>
              <div
                className={
                  "flex items-center rounded-md gap-2 bg-[#F3F3F5] w-[90vw] sm:w-full px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  id="linkedinProfile"
                  type="text"
                  placeholder="https://www.linkedin.com/in/yourprofile"
                  className=" sm:w-sm rounded-md outline-none w-full"
                  autoComplete="off"
                />
              </div>

              <hr className="text-[#E9EBED] w-full mt-6" />
            </div>

            {/* Resume */}
            <div>
              <p className="text-[#2C3E50]">Resume</p>
              <ImageInput
                id="resume"
                name="resume"
                label="Upload Resume"
                required
              />
              <hr className="text-[#E9EBED] w-full mt-6" />
            </div>

            {/* Additonal Information */}
            <p className="text-[#2C3E50]">Additional Information</p>
            <div className="flex flex-col gap-2">
              <label className="text-[#2c3e50] font-semibold text-sm">
                Relevant Experience
              </label>
              <div
                className={
                  "flex rounded-md gap-2 bg-[#F3F3F5] w-smsm:w-sm px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  id="relevantExperience"
                  type="text"
                  placeholder="Briefly describe your relevant experience for this role..."
                  className="w-full rounded-md outline-none pb-10 placeholder:whitespace-normal sm:placeholder:whitespace-normal"
                  autoComplete="off"
                />
              </div>

              <label className="text-[#2c3e50] mt-3 font-semibold text-sm">
                Cover Letter
              </label>
              <div
                className={
                  "flex rounded-md gap-2 bg-[#F3F3F5] w-smsm:w-sm px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                }
              >
                <input
                  id="coverLetter"
                  type="text"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="w-full rounded-md outline-none pb-10 placeholder:whitespace-normal sm:placeholder:whitespace-normal"
                  autoComplete="off"
                />
              </div>

              <label className="text-[#2c3e50] mt-3 font-semibold text-sm">
                Availability
              </label>
              <div
                className={
                  "flex rounded-md gap-2 bg-[#F3F3F5] w-smsm:w-sm px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer mb-10"
                }
              >
                <input
                  id="availability"
                  type="text"
                  placeholder="When are you available to start?"
                  className="w-full rounded-md outline-none "
                  autoComplete="off"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ViewApplication;
