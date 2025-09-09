import Logo from "../../assets/logo";

const Footer = () => {
  return (
    <div className="w-full bg-[#FBFBFC] sm:pb-10 p-5 sm:p-0">
      <div className="flex flex-col sm:flex-row justify-center items-baseline gap-7 sm:gap-20 text-[#2c3e50] ">
        {/* inQuis logo + slogan */}
        <div className="mt-6 space-y-2">
          <Logo />
          <p className="text-xs max-w-2xs text-[#2c3e50]">
            Your trusted partner in finding the perfect job opportunity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-48">
          {/* Job Seekers */}
          <div>
            <h2 className="font-bold">For Job Seekers</h2>
            <div className="flex flex-col gap-3 mt-3 text-xs hover:cursor-pointer">
              <span>Browse Jobs</span>
              <span>Update Profile</span>
              <span>View Profile</span>
              <span>Resume builder</span>
            </div>
          </div>

          {/* Employers */}
          <div>
            <h2 className="font-bold">For Employers</h2>
            <div className="flex flex-col gap-3 mt-3 text-xs hover:cursor-pointer">
              <span>Dashboard</span>
              <span>Post a Job</span>
              <span>My Jobs</span>
              <span>Selection tool</span>
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
      <hr className="mx-auto w-[90vw] sm:w-7xl mt-6 text-gray-300" />
      <p className="text-xs text-center mt-7 text-[#2c3e50]">
        © 2025 inQuis. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
