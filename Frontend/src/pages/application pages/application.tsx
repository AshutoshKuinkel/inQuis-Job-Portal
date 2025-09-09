import { useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Upload, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

const JobApplicationPage = () => {
  const navigate = useNavigate();

  const redirectBack = () => {
    navigate(-1);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    console.log(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.size > 5 * 1024 * 1024) {
        console.log(
          "File size exceeds the 5MB limit. Please upload a smaller file."
        );
        return;
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="border border-gray-300 flex flex-col pl-6 pb-5 sm:pb-0 sm:pl-44 sm:pt-8 sm:h-[18vh] gap-4">
        <div
          onClick={redirectBack}
          className="flex items-center space-x-2 sm:space-x-0 hover:bg-gray-200 hover:rounded-md p-2 text-xs mb-1 hover:cursor-pointer w-[5rem] font-semibold mt-3 sm:mt-0"
        >
          <FaArrowLeftLong className="text-[#2c3e50]" />
          <button className=" text-[#2c3e50] sm:px-3 rounded-md hover:cursor-pointer">
            Back
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-[#2c3e50] font-semibold">
            Apply for Job title
          </h1>
          <p className="text-md text-gray-500">
            Submit your application to join Company Name
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center min-h-screen mt-12 mb-12">
        <div className="flex flex-col justify-center items-center w-[95vw] sm:w-3xl p-6 rounded-md border border-gray-200 shadow">
          {/* Card text */}
          <form className="flex flex-col gap-4">
            <div>
              <p className="text-[#2c3e50] font-semibold">Application Form</p>
              <p className="text-gray-500 text-sm">
                Please fill out all required fields to complete your
                application.
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
                <div
                  onClick={() => {
                    if (!inputRef) return null;
                    inputRef.current?.click();
                  }}
                  className="border-2 border-dashed border-gray-300 flex items-center justify-center mt-3 rounded-lg h-[8rem] hover:border-[#2c3e50] hover:cursor-pointer"
                >
                  <input
                    ref={inputRef}
                    id="resume"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <div className="text-[#6C7B7F] flex flex-col items-center gap-1">
                    <Upload size={40} />
                    <p>Click to Upload</p>
                    <p className="text-xs">PDF, DOC, or DOCX (max 5MB).</p>
                  </div>
                </div>
                {file && (
                  <div className="flex items-center gap-2 mt-4">
                    <p className="text-[#2c3e50]">{file.name}</p>
                    <button
                      onClick={handleRemoveFile}
                      className="text-red-500 text-xs font-semibold hover:underline hover:cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
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
                By submitting this application, you agree to our privacy policy
                and terms of service.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
