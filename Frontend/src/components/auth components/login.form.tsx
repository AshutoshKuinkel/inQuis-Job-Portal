import { useForm } from "react-hook-form";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ILoginData } from "../../types/auth.types";
import { loginSchema } from "../../schema/auth.schema";
import { loginAPI } from "../../api/auth.api";



const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async(data: ILoginData) => {
    console.log(data);
    loginAPI(data)
  };

  return (
    <form
      className="mt-8 flex flex-col gap-1 max-w-xs sm:max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="text-[#2c3e50]">Email</label>
      <div
        className={`${
          errors.email
            ? "flex items-center gap-2 w-2xs sm:w-sm bg-[#F3F3F5] rounded-md px-2 py-2 shadow-md border border-red-500 transition duration-150 hover:cursor-pointer"
            : "flex items-center gap-2 w-2xs sm:w-sm bg-[#F3F3F5] rounded-md px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
        }`}
      >
        <MdOutlineMail />
        <input
          type="text"
          placeholder="Enter your email"
          className="w-sm rounded-md outline-none"
          id="email"
          {...register("email")}
        />
      </div>
      <p className="text-red-500 text-xs h-2">
        {errors.email ? errors.email.message : ""}
      </p>

      <label className="text-[#2c3e50] mt-3">Password</label>
      <div
        className={`${
          errors.password
            ? "flex items-center gap-2 w-2xs sm:w-sm bg-[#F3F3F5] rounded-md px-2 py-2 shadow-md border border-red-500 transition duration-150 hover:cursor-pointer"
            : "flex items-center gap-2 w-2xs sm:w-sm bg-[#F3F3F5] rounded-md px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
        }`}
      >
        <IoLockClosedOutline />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-sm rounded-md outline-none"
          autoComplete="off"
          id="password"
          {...register("password")}
        />
      </div>
      <p className="text-red-500 text-xs h-1.5">
        {errors.password ? errors.password.message : ""}
      </p>

      {/* sign in button */}
      <button
        className="border bg-[#2c3e50] mt-5 w-2xs sm:w-sm text-white font-bold py-2 rounded-md hover:bg-[#3a4753] hover:cursor-pointer"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;