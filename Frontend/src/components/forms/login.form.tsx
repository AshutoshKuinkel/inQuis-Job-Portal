
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";


const LoginForm = () => {


  return (
      <form className="mt-8 flex flex-col gap-1">
        <label htmlFor="" className="text-[#2c3e50]">
          Email
        </label>
        <div className="flex items-center gap-2 w-sm bg-[#F3F3F5] rounded-md px-2 py-1 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer">
          <MdOutlineMail />
          <input
            type="text"
            placeholder="Enter your email"
            className="w-sm rounded-md outline-none"
          />
        </div>

        <label htmlFor="" className="text-[#2c3e50] mt-3">
          Password
        </label>
        <div className="flex items-center rounded-md gap-2 bg-[#F3F3F5] w-sm px-2 py-1 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer">
          <IoLockClosedOutline />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-sm rounded-md outline-none"
          />
        </div>
      </form>
  );
};

export default LoginForm;
