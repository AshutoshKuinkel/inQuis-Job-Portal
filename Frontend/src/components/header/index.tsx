import { Link } from "react-router";
import Logo from "../../assets/logo";
import { FiUser } from "react-icons/fi";
import { NavLinks } from "./nav-links";
import { logoutAPI } from "../../api/auth.api";
import toast from "react-hot-toast";
import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";
import { useAuth } from "../../context/auth-context";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user, setUser} = useAuth();

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logoutAPI(); // Call the logout API
      localStorage.removeItem("user"); // Remove user from localStorage
      // localStorage.removeItem("token");
      setUser(null);
      // setToken(null);
      toast.success("Successfully Signed Out", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
      setTimeout(() => {
        window.location.reload(); // Reload the page after a small delay
      }, 500); // Reload the page to reflect the changes
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex w-full justify-between sm:justify-evenly py-3 border border-[#E9EBED] items-center">
      <div className="ml-2 sm:ml-0">
        {/* Logo */}
        <a href="/" className="cursor-pointer">
          <Logo />
        </a>
      </div>

      {/* Nav Links */}
      <NavLinks />

      {/* icon section */}
      <div className="flex space-x-4 sm:space-x-6 items-center">
        <div className="flex flex-col items-center">
          <FiUser size={22} />
          <p className="text-md text-[#2c3e50]">
            {user ? user.first_name : "Guest"}
          </p>
        </div>

        {/* Hamburger icon */}
        <div className="block sm:hidden">
          <Hamburger
            direction="right"
            size={20}
            toggled={isMenuOpen}
            toggle={handleMenuToggle}
          />
        </div>

        {/* Hamburger Menu styling */}
        <div
          className={`absolute w-full top-[60px] left-0 bg-white ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col justify-center items-center gap-6 mt-5 text-gray-500 text-sm pb-5">
            {/* Find Jobs */}
            <Link
              to={"/jobs"}
              className="hover:cursor-pointer"
              onClick={handleLinkClick}
            >
              Find Jobs
            </Link>

            {/* About us */}
            <Link
              to={"/about"}
              className="hover:cursor-pointer"
              onClick={handleLinkClick}
            >
              About Us
            </Link>

            {/* Register as Employer */}
            <Link
              to={"/employer/createJob"}
              className="hover:cursor-pointer"
              onClick={handleLinkClick}
            >
              Resgiter as Employer
            </Link>

            {/* Sign In/Sign Out button */}
            {user ? (
              <Link to={"/"} onClick={handleLinkClick}>
                <button
                  onClick={handleLogout}
                  className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer"
                >
                  Sign Out
                </button>
              </Link>
            ) : (
              <Link to={"/login"} onClick={handleLinkClick}>
                <button className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="hidden sm:block">
          {user ? (
            <Link to={"/"}>
              <button
                onClick={handleLogout}
                className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer"
              >
                Sign Out
              </button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
