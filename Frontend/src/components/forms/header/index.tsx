import { Link } from "react-router";
import Logo from "../../../assets/logo";
import { FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <div className="flex w-full justify-evenly py-3 border items-center">
      <div>
        {/* Logo */}
        <a href="/" className="cursor-pointer">
          <Logo />
        </a>
      </div>

      <div className="flex items-baseline space-x-8">
        {/* nav links */}
        <div className="space-x-5 text-gray-500 text-sm hover:cursor-pointer">
          <span className="hover:text-[#2c3e50]">Find Jobs</span>
          <span className="hover:text-[#2c3e50]">About Us</span>
          <span className="hover:text-[#2c3e50]">Post a Job</span>
        </div>
      </div>

      {/* icon section */}
      <div className="flex space-x-6 items-center">
        <FiUser />
        <Link to={"/login"}>
          <button className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
