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

  const { mutate,isPending } = useMutation({
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

  const onSubmit = (data: ICreateJob) => {
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
                          placeholder="e.g. $60,000 - $90,000 | $80,000"
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
                        <input
                          id="jobType"
                          type="text"
                          placeholder="Make a drop down of this for all job types"
                          className="w-full rounded-md outline-none"
                          autoComplete="off"
                          {...methods.register("jobType")}
                        />
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
                        <input
                          id="jobType"
                          type="text"
                          placeholder="Make a drop down of all categories for this"
                          className="w-full rounded-md outline-none"
                          autoComplete="off"
                          {...methods.register("category")}
                        />
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
                        placeholder="Enter the company name you want to be displayed on your posting"
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
                  <button type='submit' className="border bg-[#2c3e50] mt-2 w-full text-white font-bold py-2 rounded-md hover:bg-[#3a4753] hover:cursor-pointer disabled:bg-[#3a4753] disabled:cursor-not-allowed">
                    {isPending? 'Creating Posting...' : 'Create Job Posting'}
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
