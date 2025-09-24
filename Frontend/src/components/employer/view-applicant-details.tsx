import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { IApplicationResponse } from "../../types/application.types";
import { IoTimeOutline } from "react-icons/io5";
import { Check, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateStatusAPI } from "../../api/employer.api";
import toast from "react-hot-toast";

interface IProps {
  application: IApplicationResponse;
}
const ViewApplicantDetails: React.FC<IProps> = ({ application }) => {
  const [open, setOpen] = useState(false);

  const applicationId = application._id;
  const jobId = application.job?._id;

  const { mutate,isPending } = useMutation({
    mutationFn: ({
      applicationId,
      jobId,
      status,
    }: {
      applicationId: string;
      jobId: any;
      status: "ACCEPTED" | "REJECTED";
    }) => updateStatusAPI(applicationId, jobId, status),
    mutationKey: ["change_Application_status_API", applicationId, jobId],
    onSuccess: (response) => {
      toast.success(response?.message ?? "Status updated", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
      setTimeout(() => window.location.reload(), 500);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message ?? "Something went wrong", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
    },
  });

  const handleStatusChange = (status: "ACCEPTED" | "REJECTED") => {
    mutate({
      applicationId: application._id,
      jobId: application.job?._id,
      status,
    });
  };

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

                {application.status === "PENDING" && (
                  <div
                    className="border border-[#E9EBED] p-2 rounded-lg text-[#fff] bg-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-[#3a4753]"
                    onClick={() => handleStatusChange("ACCEPTED")}
                  >
                    <Check size={20} />
                    <button className="hover:cursor-pointer">{isPending ? 'Accepting...' : 'Accept'}</button>
                  </div>
                )}

                {application.status === "PENDING" && (
                  <div
                    className="border border-[#E9EBED] p-2 rounded-lg text-[#fff] bg-[#d4183d] hover:bg-[#cf2346] font-semibold text-sm flex items-center space-x-2 max-w-36 justify-center hover:cursor-pointer"
                    onClick={() => handleStatusChange("REJECTED")}
                  >
                    <X size={20} />
                    <button className="hover:cursor-pointer">{isPending ? 'Rejecting...' : 'Reject'}</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplicantDetails;
