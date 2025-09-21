import { FormProvider, useForm } from "react-hook-form";
import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { createJobSchema } from "../../schema/employer/postJobSchema";
import { ICreateJob } from "../../types/employer/create-job";
import { useMutation } from "@tanstack/react-query";
import { createJobAPI } from "../../api/employer.api";
import toast from "react-hot-toast";

const CreateJob = () => {
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
      title: "",
      companyName: "",
      description: "",
      location: "",
      salary: "",
      jobType: "Full-Time",
      category: "",
      isFeatured: false,
    },
    resolver: yupResolver(createJobSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createJobAPI,
    mutationKey: ["create_job_API"],
    onSuccess: (response) => {
      toast.success(response?.message ?? "Job Successfully Posted", {
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

  type CategoryKey = keyof typeof categoryMapping;

  const onSubmit = (data: ICreateJob) => {
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
    <div className="h-screen">
      <div className="grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="p-4 col-span-7">
          {/* Employer dashboard header */}
          <div className="flex flex-col gap-1 p-8 mb-4">
            <h1 className="text-3xl text-[#2c3e50] font-semibold">
              Create New Job Posting
            </h1>
            <p className="text-[#6C7B7F]">
              Fill out the details for your new job posting
            </p>
          </div>

          {/* Form */}
          <div className="flex items-center justify-center">
            <FormProvider {...methods}>
              <form
                className="border border-[#E9EBED] w-full md:w-[60vw] p-8 rounded-lg"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
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
                      <p className="text-red-500 text-xs h-2">
                        {methods.formState.errors.title?.message}
                      </p>
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
                      <p className="text-red-500 text-xs h-2">
                        {methods.formState.errors.location?.message}
                      </p>
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
                      <p className="text-red-500 text-xs h-2">
                        {methods.formState.errors.salary?.message}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 w-full md:w-[48%]">
                      <label className="text-[#2c3e50] text-sm font-semibold">
                        Job Type
                      </label>
                      <div className="flex items-center gap-2 px-2 py-2 w-full bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150">
                        <div className="text-gray-500 w-full">
                          <select
                            id="jobType"
                            aria-placeholder="Select Job Type"
                            className="outline-none w-full"
                            {...methods.register("jobType")}
                          >
                            <option value="" disabled selected>
                              Select Job Type
                            </option>
                            <option value="FULL_TIME">Full-Time</option>
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
                      <p className="text-red-500 text-xs h-2">
                        {methods.formState.errors.contactEmail?.message}
                      </p>
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
                      <p className="text-red-500 text-xs h-2">
                        {methods.formState.errors.category?.message}
                      </p>
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
                    <p className="text-red-500 text-xs h-2">
                      {methods.formState.errors.description?.message}
                    </p>
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
                    <p className="text-red-500 text-xs h-2">
                      {methods.formState.errors.companyName?.message}
                    </p>
                  </div>
                  <hr className="text-[#E9EBED] w-full" />

                  {/* Submit application button */}
                  <button
                    type="submit"
                    className="border bg-[#2c3e50] mt-2 w-full text-white font-bold py-2 rounded-md hover:bg-[#3a4753] hover:cursor-pointer disabled:bg-[#3a4753] disabled:cursor-not-allowed"
                  >
                    {isPending ? "Creating Posting..." : "Create Job Posting"}
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = withAuth(CreateJob, [Role.EMPLOYER]);
export default page;
