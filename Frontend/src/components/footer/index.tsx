import Logo from "../../assets/logo";

const Footer = () => {
  return (
    <div className="max-w-[100vw] bg-[#FBFBFC] sm:pb-10 p-5 sm:p-0">
      <div className="flex flex-col sm:flex-row justify-center items-baseline gap-7 sm:gap-5 md:gap-12 lg:gap-20 text-[#2c3e50] ">
        {/* inQuis logo + slogan */}
        <div className="mt-6 space-y-2">
          <Logo />
          <p className="text-xs max-w-2xs sm:max-w-[12rem] lg:max-w-[12rem] xl:max-w-2xs text-[#2c3e50]">
            Your trusted partner in finding the perfect job opportunity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 md:gap-20 lg:gap-30 xl:gap-48 max-w-[100vw]">
          {/* Job Seekers */}
          <div>
            <h2 className="font-bold">For Job Seekers</h2>
            <div className="flex flex-col gap-3 mt-3 text-xs hover:cursor-pointer">
              <a href="/jobs"><span>Browse Jobs</span></a>
              <a href="/profile"><span>Update Profile</span></a>
              <a href="/profile"><span>View Profile</span></a>
              <a href="/jobs"><span>Resume Scorer</span></a>
            </div>
          </div>

          {/* Employers */}
          <div>
            <h2 className="font-bold">For Employers</h2>
            <div className="flex flex-col gap-3 mt-3 text-xs hover:cursor-pointer">
              <a href="/myDashboard"><span>Dashboard</span></a>
              <a href="/employer/createJob"><span>Post a Job</span></a>
              <a href="/employer/manageJobs"><span>My Jobs</span></a>
              <a href="/employer/applications"><span>View Applications</span></a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h2 className="font-bold">Company</h2>
            <div className="flex flex-col gap-3 mt-3 text-xs hover:cursor-pointer">
              <span>About Us</span>
              <span>Privacy Policy</span>
              <span>Contact</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="mx-auto w-[90vw] xl:w-[75rem] mt-6 text-gray-300" />
      <p className="text-xs text-center mt-7 text-[#2c3e50]">
        © 2025 inQuis. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
