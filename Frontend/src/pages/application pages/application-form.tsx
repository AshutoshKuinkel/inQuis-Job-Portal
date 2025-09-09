import { MdOutlineMail } from "react-icons/md";

const ApplicationForm = () => {
  return (
    <form className=" mt-3 flex flex-col gap-1 max-w-xs sm:max-w-md">
      <div>
        <hr className="text-gray-300 mb-3" />
      </div>

      <label className="text-[#2c3e50]">Contact Email</label>
      <div
        className={`flex items-center gap-2 w-2xs sm:w-sm bg-[#F3F3F5] rounded-md px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer`}
      >
        <MdOutlineMail />
        <input
          type="text"
          placeholder="Enter your email"
          className="w-sm rounded-md outline-none"
          id="email"
        />
      </div>

      <label className="text-[#2c3e50] mt-3">Resume</label>
      <div
        className={`flex items-center gap-2 w-2xs sm:w-sm bg-[#F3F3F5] rounded-md px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer`}
      >
        <input
          type="file"
          className="w-sm rounded-md outline-none"
          autoComplete="off"
        />
      </div>

      <label className="text-[#2c3e50] mt-3">Cover Letter</label>
      <div
        className={`flex items-center gap-2 w-2xs sm:w-sm bg-[#F3F3F5] rounded-md px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer`}
      >
        <input
          type="file"
          className="w-sm rounded-md outline-none"
          autoComplete="off"
        />
      </div>

      {/* sign in button */}
      <button
        className="border bg-[#2c3e50] mt-5 w-2xs sm:w-sm text-white font-bold py-2 rounded-md hover:bg-[#3a4753] hover:cursor-pointer  disabled:bg-[#3a4753] disabled:cursor-not-allowed"
        type="submit"
      >
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
