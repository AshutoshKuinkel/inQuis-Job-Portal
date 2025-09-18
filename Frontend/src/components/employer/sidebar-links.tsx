import { Link, useLocation } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { LuBriefcase } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

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
  const location = useLocation();

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
    </div>
  );
};
