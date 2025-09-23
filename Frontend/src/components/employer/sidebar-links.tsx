import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { LuBriefcase } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { logoutAPI } from "../../api/auth.api";
import { useAuth } from "../../context/auth-context";
import toast from "react-hot-toast";

const links: { label: string; link: string; icon: any }[] = [
  {
    label: "Overview",
    icon: <GrOverview />,
    link: "/myDashboard",
  },
  {
    label: "Manage Jobs",
    icon: <LuBriefcase />,
    link: "/employer/manageJobs",
  },
  {
    label: "Create Job",
    icon: <FaPlus />,
    link: "/employer/createJob",
  },
  {
    label: "Applications",
    icon: <BsPeople />,
    link: "/employer/applications",
  },
  {
    label: "Profile",
    icon: <FiUser />,
    link: "/employer/profile",
  },
];

export const SidebarLinks = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const location = useLocation();
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
        navigate("/");
      }, 500);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full px-2">
      {links.map((item) => {
        const isActive = location.pathname === item.link;

        return (
          <Link
            key={item.link}
            to={item.link}
            className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium text-sm ${
              isActive
                ? "bg-[#2c3e50] text-white"
                : "text-[#2c3e50] hover:bg-gray-200"
            } transition`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
      {/* Sign In / Sign Out Button */}
      <div className="mt-auto">
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/login">
            <button className="w-full border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer">
              Sign In
            </button>
          </Link>
        )}
      </div>
      {/* Back to Site Button */}
      <Link to={'/'}>
        <button className="border border-[#d1d2d3] text-gray-700 p-2 rounded-lg hover:bg-gray-50 hover:cursor-pointer w-full">
          Back to Site
        </button>
      </Link>
    </div>
  );
};
