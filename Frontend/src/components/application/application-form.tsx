import { FormProvider, useForm } from "react-hook-form";
import ImageInput from "../inputs/image-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { applicationSchema } from "../../schema/application.schema";
import { useMutation } from "@tanstack/react-query";
import { applicationAPI } from "../../api/apply.api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
// import { IApplicationData } from "../../types/application.types";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      contactEmail: "",
      phoneNumber: "",
      linkedinProfile: "",
      relevantExperience: "",
      coverLetter: "",
      availability: "",
    },
    resolver: yupResolver(applicationSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => applicationAPI(jobId!, data),
    mutationKey: ["application_API"],
    onSuccess: (response) => {
      console.log(response);
      toast.success(response?.message ?? "Application Submitted", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
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

  const onSubmit = (data: any) => {
    const {
      firstName,
      lastName,
      contactEmail,
      phoneNumber,
      linkedinProfile,
      resume,
      relevantExperience,
      coverLetter,
      availability,
    } = data;

    if (!jobId) {
      toast.error("Job ID missing. Please Select another Job.", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("contactEmail", contactEmail);
    formData.append("phoneNumber", phoneNumber);
    formData.append("linkedinProfile", linkedinProfile);
    formData.append("relevantExperience", relevantExperience);
    formData.append("coverLetter", coverLetter);
    formData.append("availability", availability);
    if (resume instanceof File) {
      formData.append("resume", resume);
    }
    mutate(formData);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div>
            <p className="text-[#2c3e50] font-semibold">Application Form</p>
            <p className="text-gray-500 text-sm">
              Please fill out all required fields to complete your application.
            </p>
          </div>

          {/* Personal Information */}
          <div>
            <p className="text-[#2C3E50] mb-3">Personal Information</p>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-[#2c3e50] text-sm font-semibold">
                  First Name
                </label>
                <div
                  className={
                    "flex items-center gap-2 px-2 py-2 w-[90vw] md:w-[22rem]  bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                  }
                >
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className=" rounded-md outline-none  w-full"
                    autoComplete="off"
                    {...methods.register("firstName")}
                  />
                </div>
                <p className="text-red-500 text-xs h-2">
                  {methods.formState.errors.firstName?.message}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#2c3e50] text-sm font-semibold">
                  Last Name
                </label>
                <div
                  className={
                    "flex items-center gap-2 py-2 w-[90vw] md:w-[22rem] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                  }
                >
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className=" rounded-md outline-none w-full"
                    autoComplete="off"
                    {...methods.register("lastName")}
                  />
                </div>
                <p className="text-red-500 text-xs h-2">
                  {methods.formState.errors.lastName?.message}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-[#2c3e50] text-sm font-semibold">
                  Contact Email
                </label>
                <div
                  className={
                    "flex items-center gap-2 px-2 py-2 w-[90vw] md:w-[22rem]  bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                  }
                >
                  <input
                    id="contactEmail"
                    type="text"
                    placeholder="Enter your email"
                    className=" rounded-md outline-none w-full"
                    autoComplete="off"
                    {...methods.register("contactEmail")}
                  />
                </div>
                <p className="text-red-500 text-xs">
                  {methods.formState.errors.contactEmail?.message}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#2c3e50] text-sm font-semibold">
                  Phone Number
                </label>
                <div
                  className={
                    "flex items-center gap-2 py-2 w-[90vw] md:w-[22rem] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                  }
                >
                  <input
                    id="phoneNumber"
                    type="text"
                    placeholder="e.g 1234567890"
                    className=" rounded-md outline-none w-full"
                    autoComplete="off"
                    {...methods.register("phoneNumber")}
                  />
                </div>
                <p className="text-red-500 text-xs h-2">
                  {methods.formState.errors.phoneNumber?.message}
                </p>
              </div>
            </div>

            <label className="text-[#2c3e50] mt-3 font-semibold">
              LinkedIn Profile (Optional)
            </label>
            <div
              className={
                "flex items-center rounded-md gap-2 bg-[#F3F3F5] w-[90vw] md:w-full px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
              }
            >
              <input
                id="linkedinProfile"
                type="text"
                placeholder="https://www.linkedin.com/in/yourprofile"
                className=" md:w-sm rounded-md outline-none w-full"
                autoComplete="off"
                {...methods.register("linkedinProfile")}
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
              <textarea
                id="relevantExperience"
                placeholder="Briefly describe your relevant experience for this role..."
                className="w-full rounded-md outline-none pb-10 placeholder:whitespace-normal md:placeholder:whitespace-normal"
                autoComplete="off"
                {...methods.register("relevantExperience")}
              />
            </div>
            <p className="text-red-500 text-xs h-2">
              {methods.formState.errors.relevantExperience?.message}
            </p>

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
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                className="w-full rounded-md outline-none pb-10 placeholder:whitespace-normal md:placeholder:whitespace-normal"
                autoComplete="off"
                {...methods.register("coverLetter")}
              />
            </div>
            <p className="text-red-500 text-xs h-2">
              {methods.formState.errors.coverLetter?.message}
            </p>

            <label className="text-[#2c3e50] mt-3 font-semibold text-sm">
              Availability
            </label>
            <div
              className={
                "flex rounded-md gap-2 bg-[#F3F3F5] w-smsm:w-sm px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
              }
            >
              <input
                id="availability"
                type="text"
                placeholder="When are you available to start?"
                className="w-full rounded-md outline-none"
                autoComplete="off"
                {...methods.register("availability")}
              />
            </div>
            <p className="text-red-500 text-xs h-2">
              {methods.formState.errors.availability?.message}
            </p>

            {/* Submit application button */}
            <button className="border bg-[#2c3e50] mt-5 w-full text-white font-bold py-2 rounded-md hover:bg-[#3a4753] hover:cursor-pointer disabled:bg-[#3a4753] disabled:cursor-not-allowed">
              {isPending ? "Submitting Application..." : "Submit Application"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this application, you agree to our privacy policy
              and terms of service.
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ApplicationForm;
