import { LiaEdit } from "react-icons/lia";
import { IJob } from "../../types/job.types";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateMyJobAPI } from "../../api/employer.api";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateJobSchema } from "../../schema/employer/updateJobSchema";

interface IProps {
  job: IJob;
}

const EditJobButton: React.FC<IProps> = ({ job }) => {
  const [open, setOpen] = useState(false);

  const categoryMapping: {
    Design: string;
    Technology: string;
    Marketing: string;
    Sales: string;
    Mobile: string;
    Security: string;
    Healthcare: string;
    Engineering: string;
  } = {
    Design: "68b14b0a6999f67b788c748f",
    Technology: "68b14f17db96eaa1930367ff",
    Marketing: "68b14f1fdb96eaa193036802",
    Sales: "68b14f22db96eaa193036805",
    Mobile: "68b14f28db96eaa193036808",
    Security: "68b14f2cdb96eaa19303680b",
    Healthcare: "68b14f32db96eaa19303680e",
    Engineering: "68b14f39db96eaa193036811",
  };

  const methods = useForm({
    defaultValues: {
      title: job.title || "",
      companyName: job.companyName || "",
      description: job.description || "",
      location: job.location || "",
      salary: job.salary || "",
      contactEmail: job.contactEmail || "",
      jobType: job.jobType || "",
      category: job.category.name || "",
      isFeatured: false,
    },
    resolver: yupResolver(updateJobSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => updateMyJobAPI(job._id, data),
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  type CategoryKey = keyof typeof categoryMapping;

  const onSubmit = (data: any) => {
    console.log(data);
    const categoryId = categoryMapping[data.category as CategoryKey];
    if (categoryId) {
      data.category = categoryId;
    } else {
      toast.error("Invalid Category", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
    }
    console.log(data);
    mutate(data);
  };
  return (
    <div>
      <div
        className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-gray-200"
        onClick={handleOpen}
      >
        <LiaEdit size={20} />
        <button className="hover:cursor-pointer">Edit</button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 md:px-10">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={handleClose}
          ></div>

          {/* Modal content */}
          <div className="relative w-full max-w-[90vw] md:max-w-[60vw] max-h-[90vh] overflow-y-auto bg-gray-100 rounded-lg p-4 sm:p-6">
            <h1 className="text-[#2c3e50] font-semibold text-lg sm:text-xl mb-4">
              Edit Job Posting
            </h1>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Container for Form Fields */}
                <div className="space-y-6">
                  {/* Job Title and Location */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full md:w-1/2">
                      <label className="text-sm font-semibold text-[#2c3e50]">
                        Job Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        className="w-full px-3 py-2 bg-[#F3F3F5] rounded-md shadow-md outline-none"
                        placeholder="e.g. Senior Frontend Developer"
                        {...methods.register("title")}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-1/2">
                      <label className="text-sm font-semibold text-[#2c3e50]">
                        Location
                      </label>
                      <input
                        id="location"
                        type="text"
                        className="w-full px-3 py-2 bg-[#F3F3F5] rounded-md shadow-md outline-none"
                        placeholder="e.g. Remote or City, Country"
                        {...methods.register("location")}
                      />
                    </div>
                  </div>

                  {/* Salary and Job Type */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full md:w-1/2">
                      <label className="text-sm font-semibold text-[#2c3e50]">
                        Salary
                      </label>
                      <input
                        id="salary"
                        type="text"
                        className="w-full px-3 py-2 bg-[#F3F3F5] rounded-md shadow-md outline-none"
                        placeholder="e.g. $80,000"
                        {...methods.register("salary")}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-1/2">
                      <label className="text-sm font-semibold text-[#2c3e50]">
                        Job Type
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-[#F3F3F5] rounded-md shadow-md outline-none"
                        {...methods.register("jobType")}
                      >
                        <option value="" disabled>
                          Select Job Type
                        </option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Casual">Casual</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Email and Category */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full md:w-1/2">
                      <label className="text-sm font-semibold text-[#2c3e50]">
                        Contact Email
                      </label>
                      <input
                        id="contactEmail"
                        type="email"
                        className="w-full px-3 py-2 bg-[#F3F3F5] rounded-md shadow-md outline-none"
                        placeholder="e.g. email@example.com"
                        {...methods.register("contactEmail")}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-1/2">
                      <label className="text-sm font-semibold text-[#2c3e50]">
                        Category
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-[#F3F3F5] rounded-md shadow-md outline-none"
                        {...methods.register("category")}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="Design">Design</option>
                        <option value="Technology">Technology</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Security">Security</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Engineering">Engineering</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-[#2c3e50]">
                      Job Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 bg-[#F3F3F5] rounded-md shadow-md outline-none resize-none min-h-[100px]"
                      placeholder="Describe the role, responsibilities, and expectations..."
                      {...methods.register("description")}
                    ></textarea>
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-[#2c3e50]">
                      Company Name
                    </label>
                    <input
                      className="w-full px-3 py-2 bg-[#F3F3F5] rounded-md shadow-md outline-none"
                      placeholder="Company name to display"
                      {...methods.register("companyName")}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="border border-[#E9EBED] rounded-lg px-4 py-2 text-gray-500 font-semibold text-sm hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#2c3e50] text-white font-semibold text-sm rounded-lg px-4 py-2 hover:bg-[#1f2d3a]"
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditJobButton;
