// import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ImageInput from "../inputs/image-input";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getApplicationByIdAPI } from "../../api/user.api";
import Oval from "react-loading-icons/dist/esm/components/oval";
// import { IApplicationResponse } from "../../types/application.types";

const ViewApplication = () => {
  const { id } = useParams();
  const methods = useForm({});
  const navigate = useNavigate();

  const { data: response, isLoading } = useQuery({
    queryFn: () => getApplicationByIdAPI(id!),
    queryKey: ["get_application_by_id", id],
    enabled: !!id,
  });
  const redirectBack = () => {
    navigate("/myApplications");
  };

  const application = response?.data;

  return isLoading ? (
    <div className="flex justify-center items-center col-span-4 h-screen">
      <Oval stroke="#2c3e50" height="64" width="64" />
    </div>
  ) : (
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
                      placeholder={application.firstName}
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
                      placeholder={application.lastName}
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
                      placeholder={application.contactEmail}
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
                      placeholder={application.phoneNumber}
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
                  placeholder={application.linkedinProfile ?? "https://www.linkedin.com/in/yourprofile"}
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
                  placeholder={application.relevantExperience}
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
                  placeholder={application.coverLetter}
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
                  placeholder={application.availability}
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
