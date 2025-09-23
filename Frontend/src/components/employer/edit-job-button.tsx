import { LiaEdit } from "react-icons/lia";
import { IJob } from "../../types/job.types";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateMyJobAPI } from "../../api/employer.api";

interface IProps {
  job: IJob;
}

const EditJobButton: React.FC<IProps> = ({ job }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: withdraw, isPending } = useMutation({
    mutationFn: () => updateMyJobAPI(job._id),
    mutationKey: ["update_my_job_API", job._id],
    onSuccess: (response) => {
      toast.success(response?.message ?? "Job Deleted", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
      setOpen(false);
      setTimeout(() => navigate(-1), 500);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    withdraw();
  };
  return (
    <div>
      <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-gray-200"
        onClick={handleOpen}
      >
        <LiaEdit size={20} />
        <button className="hover:cursor-pointer">Edit</button>
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
              Edit Job Posting
            </h1>
            
            {/* form */}
            <p>Add form from create Job but this time with default values</p>

            <div className="flex justify-end gap-3 mr-[.5rem] mt-3">
              <button
                className="border border-[#E9EBED] rounded-lg text-gray-500 font-semibold text-sm flex items-center space-x-2 p-2 justify-center hover:cursor-pointer hover:bg-gray-200"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className=" rounded-lg font-semibold text-sm text-white flex items-center space-x-2  p-2 justify-center hover:cursor-pointer bg-[#2c3e50]"
                onClick={handleClick}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditJobButton;