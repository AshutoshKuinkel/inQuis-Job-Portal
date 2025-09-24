import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { IApplicationResponse } from "../../types/application.types";
import { IoTimeOutline } from "react-icons/io5";
import { Check, X } from "lucide-react";

interface IProps {
  application: IApplicationResponse;
}
const ViewApplicantDetails: React.FC<IProps> = ({ application }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div
        className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 justify-center hover:cursor-pointer hover:bg-gray-200"
        onClick={handleOpen}
      >
        <button className="hover:cursor-pointer">View Details</button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center ">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={handleClose}
          ></div>
          <div className="rounded-lg p-5 flex flex-col gap-2 z-10 bg-gray-100">
            <h1 className="text-[#2c3e50] font-semibold text-xl">
              {`Application details : ${application.firstName} ${application.lastName}`}
            </h1>

            {/* form */}
            <div>
              <div className="border border-[#E9EBED] w-full md:w-[40vw] p-8 rounded-lg">
                <div className="flex flex-col gap-2">
                  <div className="text-[#2c3e50] flex items-center gap-2">
                    <FiPhone />
                    <p>{application.phoneNumber}</p>
                  </div>

                  <div className="text-[#2c3e50] flex items-center gap-2">
                    <IoTimeOutline />
                    <p>Availabilty: {application.availability}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <label className="text-[#2c3e50] font-semibold text-sm">
                    Relevant Experience
                  </label>
                  <div
                    className={
                      "flex rounded-md gap-2 bg-[#F3F3F5] w-smsm:w-sm px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                    }
                  >
                    <textarea
                      id="relevantExperience"
                      placeholder={application.relevantExperience}
                      className="w-full rounded-md outline-none pb-10 placeholder:whitespace-normal md:placeholder:whitespace-normal disabled:cursor-not-allowed"
                      autoComplete="off"
                      disabled
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
                    <textarea
                      id="coverLetter"
                      placeholder={application.coverLetter}
                      className="w-full rounded-md outline-none pb-10 placeholder:whitespace-normal md:placeholder:whitespace-normal disabled:cursor-not-allowed"
                      autoComplete="off"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mr-[.5rem] mt-3">
                <button
                  className="border border-[#E9EBED] rounded-lg text-gray-500 font-semibold text-sm flex items-center space-x-2 p-2 justify-center hover:cursor-pointer hover:bg-gray-200"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <div className="border border-[#E9EBED] p-2 rounded-lg text-[#fff] bg-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-[#3a4753]">
                  <Check size={20} />
                  <button className="hover:cursor-pointer">Accept</button>
                </div>

                <div className="border border-[#E9EBED] p-2 rounded-lg text-[#fff] bg-[#d4183d] hover:bg-[#cf2346] font-semibold text-sm flex items-center space-x-2 max-w-36 justify-center hover:cursor-pointer">
                  <X size={20} />
                  <button className="hover:cursor-pointer">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplicantDetails;
