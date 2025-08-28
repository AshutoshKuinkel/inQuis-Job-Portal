import { Link } from "react-router";
import Logo from "../../assets/logo";
import { FiUser } from "react-icons/fi";
import { NavLinks } from "./nav-links";

const Header = () => {
  return (
    <div className="flex w-full justify-evenly py-3 border border-[#E9EBED] items-center">
      <div>
        {/* Logo */}
        <a href="/" className="cursor-pointer">
          <Logo />
        </a>
      </div>

      {/* Nav Links */}
      <NavLinks />

      {/* icon section */}
      <div className="flex space-x-6 items-center">
        <div className="flex flex-col items-center">
          <FiUser size={22}/>
          <p className="text-md text-[#2c3e50]">Ashutosh</p>
        </div>
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
