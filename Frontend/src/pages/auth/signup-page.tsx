import Logo from "../../assets/logo";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router";

const SignupCard = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center max-w-md p-8 rounded-md shadow-2xl">
          {/* Logo */}
          <Logo />

          {/* Card text */}
          <div className="text-center mt-3">
            <h1 className="text-[#2c3e50] text-xl">Welcome</h1>
            <p className="text-gray-500 text-sm max-w-xs">
              Sign in to your account or create a new one to get started.
            </p>
          </div>

          {/* Sign up/Sign in buttons */}
          <div className="mt-8 bg-[#F3F3F5] w-full max-w-md rounded-xl flex justify-evenly">
            <Link to={"/login"}>
              <button className="text-sm text-[#2c3e50] hover:cursor-pointer hover:bg-white hover:rounded-lg px-17 py-2 scale-93">
                Sign In
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="text-sm text-[#2c3e50] hover:cursor-pointer hover:bg-white hover:rounded-lg px-17 py-2 scale-93">
                Sign Up
              </button>
            </Link>
          </div>

          {/* form fields */}
          <form className="mt-8 flex flex-col gap-1">
            <div className="flex gap-4 mb-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[#2c3e50] text-sm">
                  First Name
                </label>
                <div className="flex items-center gap-2 px-2 py-1 max-w-[14rem] bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer">
                  <FiUser />
                  <input
                    type="text"
                    placeholder="First name"
                    className=" rounded-md outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[#2c3e50] text-sm">
                  Last Name
                </label>
                <div className="flex items-center gap-2 py-1 max-w-[9rem] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer">
                  <input
                    type="text"
                    placeholder="Last name"
                    className=" rounded-md outline-none"
                  />
                </div>
              </div>
            </div>

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

            <label htmlFor="" className="text-[#2c3e50] mt-3">
              Confirm Password
            </label>
            <div className="flex items-center rounded-md gap-2 bg-[#F3F3F5] w-sm px-2 py-1 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer">
              <IoLockClosedOutline />
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-sm rounded-md outline-none"
              />
            </div>
          </form>
          {/* sign in button */}
          <button className="border bg-[#2c3e50] mt-5 w-sm text-white font-bold py-2 rounded-md hover:grayscale-60 hover:cursor-pointer">
            Sign In
          </button>
        </div>

        <p className="text-sm text-center mt-4 text-[#2c3e50]">
          © 2025 inQuis. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignupCard;
