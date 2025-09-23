import { LiaEdit } from "react-icons/lia";
import { IJob } from "../../types/job.types";
import React, { useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

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
      title: job.title,
      companyName: job.companyName,
      description: job.description,
      location: job.location,
      salary: job.salary,
      contactEmail: job.contactEmail,
      jobType: job.jobType,
      category: job.category.name,
      isFeatured: false,
    },
    resolver: yupResolver(updateJobSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
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

  type CategoryKey = keyof typeof categoryMapping;

  const onSubmit = (data: any) => {
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
            <div>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="border border-[#E9EBED] w-full md:w-[60vw] p-8 rounded-lg">
                    {/* Job Details Section */}
                    <div>
                      <p className="text-[#2C3E50] mb-3 font-semibold">
                        Job Details
                      </p>

                      {/* Job Title and Location */}
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex flex-col gap-1 w-full md:w-[48%]">
                          <label className="text-[#2c3e50] text-sm font-semibold">
                            Job Title
                          </label>
                          <div className="flex items-center gap-2 px-2 py-2 w-full bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150">
                            <input
                              id="title"
                              type="text"
                              placeholder="e.g. Senior Frontend Developer"
                              className="w-full rounded-md outline-none"
                              autoComplete="off"
                              {...methods.register("title")}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full md:w-[48%]">
                          <label className="text-[#2c3e50] text-sm font-semibold">
                            Location
                          </label>
                          <div className="flex items-center gap-2 px-2 py-2 w-full bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150">
                            <input
                              id="location"
                              type="text"
                              placeholder="e.g. San Francisco, CA or Remote"
                              className="w-full rounded-md outline-none"
                              autoComplete="off"
                              {...methods.register("location")}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Salary Range and Job Type */}
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex flex-col gap-1 w-full md:w-[48%]">
                          <label className="text-[#2c3e50] text-sm font-semibold">
                            Salary
                          </label>
                          <div className="flex items-center gap-2 px-2 py-2 w-full bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150">
                            <input
                              id="salary"
                              type="text"
                              placeholder="e.g. $60,000 - $90,000 or $80,000"
                              className="w-full rounded-md outline-none"
                              autoComplete="off"
                              {...methods.register("salary")}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full md:w-[48%]">
                          <label className="text-[#2c3e50] text-sm font-semibold">
                            Job Type
                          </label>
                          <div className="flex items-center gap-2 px-2 py-2 w-full bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150">
                            <div className="text-gray-500 w-full">
                              <select
                                id=""
                                className="outline-none w-full"
                                {...methods.register("jobType")}
                              >
                                <option value="" disabled selected>
                                  Select Job Type
                                </option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Casual">Casual</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact Email + Category */}
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex flex-col gap-1 w-full md:w-[48%]">
                          <label className="text-[#2c3e50] text-sm font-semibold">
                            Contact Email
                          </label>
                          <div className="flex items-center gap-2 px-2 py-2 w-full bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150">
                            <input
                              id="contactEmail"
                              type="text"
                              placeholder="Email you would like to be informed abot your posting on..."
                              className="w-full rounded-md outline-none"
                              autoComplete="off"
                              {...methods.register("contactEmail")}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full md:w-[48%]">
                          <label className="text-[#2c3e50] text-sm font-semibold">
                            Category
                          </label>
                          <div className="flex items-center gap-2 px-2 py-2 w-full bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150">
                            <div className="text-gray-500 w-full">
                              <select
                                id="category"
                                className="outline-none w-full"
                                {...methods.register("category")}
                              >
                                <option value="" disabled selected>
                                  Select Category that best fits your job
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
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <label className="text-[#2c3e50] text-sm font-semibold">
                          Job Description
                        </label>
                        <div className="flex rounded-md gap-2 bg-[#F3F3F5] w-full px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150">
                          <textarea
                            id="description"
                            placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                            className="w-full rounded-md outline-none pb-10 placeholder:whitespace-normal"
                            autoComplete="off"
                            {...methods.register("description")}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[#2c3e50] text-sm font-semibold">
                          Company Name
                        </label>
                        <div className="flex rounded-md gap-2 bg-[#F3F3F5] w-full px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150">
                          <input
                            id="companyName"
                            placeholder="Enter the company name you want displayed on your posting"
                            className="w-full rounded-md outline-none placeholder:whitespace-normal"
                            autoComplete="off"
                            {...methods.register("companyName")}
                          />
                        </div>
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
                    <button
                      className=" rounded-lg font-semibold text-sm text-white flex items-center space-x-2  p-2 justify-center hover:cursor-pointer bg-[#2c3e50]"
                      type="submit"
                    >
                      {isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditJobButton;
