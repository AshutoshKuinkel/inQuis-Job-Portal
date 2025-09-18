import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileSchema } from "../../schema/userProfile.schema";
import { updateEmployerProfileAPI } from "../../api/employer.api";
// import { IProfileData } from "../../types/user.types";

const EmployerProfileForm = () => {
  // Make onlick function so that when edit profile is clicked, all form fields become normal
  const { user } = useAuth();
  const [isEditProfileClicked, setIsEditProfileClicked] = useState(false);

  const methods = useForm({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      password: "",
    },
    resolver: yupResolver(userProfileSchema),
    mode: "all",
  });

  const { mutate,isPending } = useMutation({
    mutationFn: updateEmployerProfileAPI,
    mutationKey: ["update_employer_profile"],
    onSuccess: (response) => {
      toast.success(response?.message ?? "Application Submitted", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
      setTimeout(() => window.location.reload(), 1200);
    },
    onError: (err) => {
      toast.success(err?.message ?? "Application Submitted", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
      console.log(err);
    },
  });

  const handleEditProfileClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditProfileClicked(true);
  };

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center border border-[#E9EBED] sm:w-[65vw] rounded-xl mt-4 p-2">
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {/* Personal Information */}
          <div>
            <div className="flex items-baseline justify-between">
              <p className="text-[#2C3E50] mb-3 mt-6 sm:mb-9 sm:mt-6">
                Personal Information
              </p>
              {isEditProfileClicked ? (
                <button
                  type="submit"
                  className="border bg-[#2c3e50] p-2 rounded-lg text-white font-semibold text-sm hover:cursor-pointer hover:bg-[#3a4753]"
                >
                  {isPending? 'Saving Changes...':'Save Changes'}
                </button>
              ) : (
                <button
                  className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm hover:cursor-pointer hover:bg-gray-200"
                  onClick={handleEditProfileClick}
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-[#2c3e50] text-sm font-semibold">
                  First Name
                </label>
                <div
                  className={
                    "flex items-center gap-2 px-2 py-2 w-[90vw] sm:w-[30vw]  bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                  }
                >
                  <input
                    disabled={!isEditProfileClicked}
                    id="first_name"
                    type="text"
                    placeholder={user?.first_name}
                    className={` rounded-md outline-none  w-full ${
                      isEditProfileClicked
                        ? "text-[#2c3e50]"
                        : "text-gray-500 cursor-not-allowed"
                    }`}
                    autoComplete="off"
                    {...methods.register("first_name")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#2c3e50] text-sm font-semibold">
                  Last Name
                </label>
                <div
                  className={
                    "flex items-center gap-2 py-2 w-[90vw] sm:w-[30vw] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                  }
                >
                  <input
                    disabled={!isEditProfileClicked}
                    id="last_name"
                    type="text"
                    placeholder={user?.last_name}
                    className={` rounded-md outline-none  w-full ${
                      isEditProfileClicked
                        ? "text-[#2c3e50]"
                        : "text-gray-500 cursor-not-allowed"
                    }`}
                    autoComplete="off"
                    {...methods.register("last_name")}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-[#2c3e50] text-sm font-semibold">
                  Email
                </label>
                <div
                  className={
                    "flex items-center gap-2 px-2 py-2 w-[90vw] sm:w-[30vw]  bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                  }
                >
                  <input
                    disabled={!isEditProfileClicked}
                    id="email"
                    type="text"
                    placeholder={user?.email}
                    className={` rounded-md outline-none  w-full ${
                      isEditProfileClicked
                        ? "text-[#2c3e50]"
                        : "text-gray-500 cursor-not-allowed"
                    }`}
                    autoComplete="off"
                    {...methods.register("email")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#2c3e50] text-sm font-semibold">
                  Password
                </label>
                <div
                  className={
                    "flex items-center gap-2 py-2 w-[90vw] sm:w-[30vw] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
                  }
                >
                  <input
                    disabled={!isEditProfileClicked}
                    id="password"
                    type="password"
                    placeholder="********"
                    className={` rounded-md outline-none  w-full ${
                      isEditProfileClicked
                        ? "text-[#2c3e50]"
                        : "text-gray-500 cursor-not-allowed"
                    }`}
                    autoComplete="off"
                    {...methods.register("password")}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const page = withAuth(EmployerProfileForm, [Role.EMPLOYER]);

export default page;
