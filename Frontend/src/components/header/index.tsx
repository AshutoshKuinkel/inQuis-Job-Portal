import { Link } from "react-router";
import Logo from "../../assets/logo";
import { FiUser } from "react-icons/fi";
import { NavLinks } from "./nav-links";
import { logoutAPI } from "../../api/auth.api";
import toast from "react-hot-toast";

// Handle Logout
const handleLogout = async () => {
  try {
    await logoutAPI(); // Call the logout API
    localStorage.removeItem("user"); // Remove user from localStorage
    localStorage.removeItem("token");
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

const Header = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

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
          <FiUser size={22} />
          <p className="text-md text-[#2c3e50]">
            {user ? user.first_name : "Guest"}
          </p>
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
