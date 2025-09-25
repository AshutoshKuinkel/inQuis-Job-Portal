import Logo from "../assets/logo";
import EmployerSignupForm from "../components/auth components/employer-signup.form";

const EmployerRegistrationForm = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen pb-10 pt-10 sm:pb-0 sm:pt-0">
        <div className="flex flex-col justify-center items-center max-w-xs sm:max-w-md p-8 rounded-md shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Logo />
            <p className="text-sm text-gray-500">Employer</p>
          </div>

          {/* Card text */}
          <div className="text-center mt-3">
            <h1 className="text-[#2c3e50] text-xl">Welcome</h1>
            <p className="text-gray-500 text-sm max-w-xs">
              Complete the form to register as an employer.
            </p>
          </div>

          {/* form fields */}
          <EmployerSignupForm/>
        </div>

        <p className="text-xs sm:text-sm text-center mt-4 text-[#2c3e50]">
          © 2025 inQuis. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default EmployerRegistrationForm;
