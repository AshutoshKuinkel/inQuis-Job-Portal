import { Upload} from "lucide-react";

const ApplicationForm = () => {

  
  return (
    <div>
      <form className="flex flex-col gap-4">
        <div>
          <p className="text-[#2c3e50] font-semibold">Application Form</p>
          <p className="text-gray-500 text-sm">
            Please fill out all required fields to complete your application.
          </p>
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
                  id="first_name"
                  type="text"
                  placeholder="First name"
                  className=" rounded-md outline-none"
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
                  id="last_name"
                  type="text"
                  placeholder="Last name"
                  className=" rounded-md outline-none"
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
                  id="contact_email"
                  type="text"
                  placeholder="Enter your email"
                  className=" rounded-md outline-none"
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
                  id="phone"
                  type="text"
                  placeholder="e.g 1234567890"
                  className=" rounded-md outline-none"
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
              id="linkedin_profile"
              type="text"
              placeholder="https://www.linkedin.com/in/yourprofile"
              className="w-2xs sm:w-sm rounded-md outline-none"
              autoComplete="off"
            />
          </div>

          <hr className="text-[#E9EBED] w-full mt-6" />
        </div>

        {/* Resume */}
        <div>
          <p className="text-[#2C3E50]">Resume</p>
          <div className="flex flex-col">
            <label className="text-[#2c3e50] mt-3 font-semibold text-sm">
              Upload Resume
            </label>
            <div className="border-2 border-dashed border-gray-300 flex items-center justify-center mt-3 rounded-lg h-[8rem] hover:border-[#2c3e50] hover:cursor-pointer">
              <input
                id="resume"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
              <div className="text-[#6C7B7F] flex flex-col items-center gap-1">
                <Upload size={40} />
                <p>Click to Upload</p>
                <p className="text-xs">PDF, DOC, or DOCX (max 5MB).</p>
              </div>
            </div>
          </div>
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
              id="relevant_experience"
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
              id="cover_letter"
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
              "flex rounded-md gap-2 bg-[#F3F3F5] w-smsm:w-sm px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
            }
          >
            <input
              id="availability"
              type="text"
              placeholder="When are you available to start?"
              className="w-full rounded-md outline-none"
              autoComplete="off"
            />
          </div>

          {/* Submit application button */}
          <button className="border bg-[#2c3e50] mt-5 w-full text-white font-bold py-2 rounded-md hover:bg-[#3a4753] hover:cursor-pointer disabled:bg-[#3a4753] disabled:cursor-not-allowed">
            Submit Application
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this application, you agree to our privacy policy and
            terms of service.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
