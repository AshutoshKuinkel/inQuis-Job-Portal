import Logo from "../../assets/logo";
import { Link } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLinks } from "../../components/auth components/auth-form-login-register.buttons";
import SignupForm from "../../components/auth components/signup.form";

const SignupCard = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen pb-10 pt-10 sm:pb-0 sm:pt-0">
        <Link to={"/"}>
          <div className="flex items-center mr-52 space-x-0.5 sm:space-x-0 sm:mr-72 hover:bg-gray-200 hover:rounded-md p-2 text-xs mb-1 hover:cursor-pointer">
            <FaArrowLeftLong className="text-[#2c3e50]" />
            <button className=" text-[#2c3e50] px-3 rounded-md">
              Back to Home
            </button>
          </div>
        </Link>

        <div className="flex flex-col justify-center items-center max-w-xs sm:max-w-md p-8 rounded-md shadow-2xl">
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
          <NavLinks />

          {/* form fields */}
          <SignupForm/>
          
        </div>

        <p className="text-xs sm:text-sm text-center mt-4 text-[#2c3e50]">
          © 2025 inQuis. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignupCard;
