import { useState } from "react";
import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import EmployerProfileForm from "../../components/employer/employer-profile-form";
import { LiaCalendar } from "react-icons/lia";
import { EmployerProfileButton } from "../../components/employer/profile-button";
import { useAuth } from "../../context/auth-context";

const Profile = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200
          w-60 p-4 z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Hamburger (Mobile) */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none"
            aria-label="Open sidebar"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className="border-b border-[#E9EBED] mb-6">
          <h1 className="text-[#2c3e50] text-3xl font-semibold">
            Employer Profile
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-6">
          {/* Profile Button */}
          <EmployerProfileButton />

          {/* Profile Form */}
          <EmployerProfileForm />

          {/* Account Info */}
          <div className="flex flex-col border border-[#E9EBED] w-full sm:w-[65vw] rounded-xl p-6 gap-4">
            <p className="text-[#2c3e50] font-semibold">Account Information</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <LiaCalendar size={20} />
              <p>
                Member since{" "}
                {new Date(user?.createdAt!).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const page = withAuth(Profile, [Role.EMPLOYER]);
export default page;
