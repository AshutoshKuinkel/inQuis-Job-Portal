import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { signupAPI } from "../../api/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export interface ISignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const signupSchema = yup.object({
  first_name: yup.string().required(`First Name is required.`),
  last_name: yup.string().required(`Last Name is required.`),
  email: yup
    .string()
    .required("Email is required.")
    .email("Invalid Email Format."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, `Password must be at least 8 characters.`),
  confirm_password: yup
    .string()
    .required("Confirm Password is required.")
    .oneOf([yup.ref("password")], "Passwords must match."),
});

const SignupForm = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "all",
  });

  const {mutate,isPending} = useMutation({
    mutationFn:signupAPI,
    onSuccess:(response)=>{
      toast.success(response?.message ?? "Successfully Registered", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
      setTimeout(()=>navigate('/login'),500)
    },
    onError:(error)=>{
      console.log(error);
      toast.error(error?.message ?? "Something went wrong", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
    },
  })

  const onSubmit = (data: ISignupData & { confirm_password: string }) => {
    const { confirm_password, ...formData } = data;
    mutate(formData)
  };

  return (
    <form
      className="mt-8 flex flex-col gap-1 max-w-xs sm:max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:flex-row gap-4 mb-3">
        <div className="flex flex-col gap-1">
          <label className="text-[#2c3e50] text-sm">First Name</label>
          <div
            className={
              errors.first_name
                ? "flex items-center gap-2 px-2 py-2 w-2xs sm:max-w-[14rem] bg-[#F3F3F5] rounded-md shadow-md border border-red-500 transition duration-150 hover:cursor-pointer"
                : "flex items-center gap-2 px-2 py-2 w-2xs sm:max-w-[14rem] bg-[#F3F3F5] rounded-md shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
            }
          >
            <FiUser />
            <input
              id="first_name"
              {...register("first_name")}
              type="text"
              placeholder="First name"
              className=" rounded-md outline-none"
              autoComplete="off"
            />
          </div>
          <p className="text-red-500 text-xs h-2">
            {errors.first_name ? errors.first_name.message : ""}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#2c3e50] text-sm">Last Name</label>
          <div
            className={
              errors.last_name
                ? "flex items-center gap-2 py-2 w-2xs sm:max-w-[9rem] bg-[#F3F3F5] rounded-md px-2 shadow-md border border-red-500 transition duration-150 hover:cursor-pointer"
                : "flex items-center gap-2 py-2 w-2xs sm:max-w-[9rem] bg-[#F3F3F5] rounded-md px-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
            }
          >
            <FiUser className=" sm:hidden"/>
            <input
              id="last_name"
              {...register("last_name")}
              type="text"
              placeholder="Last name"
              className=" rounded-md outline-none"
              autoComplete="off"
            />
          </div>
          <p className="flex flex-col text-red-500 text-xs h-2">
            {errors.last_name ? errors.last_name.message : ""}
          </p>
        </div>
      </div>

      <label className="text-[#2c3e50]">Email</label>
      <div
        className={
          errors.email
            ? "flex items-center gap-2 w-2xs sm:w-sm bg-[#F3F3F5] rounded-md px-2 py-2 shadow-md border border-red-500 transition duration-150 hover:cursor-pointer"
            : "flex items-center gap-2 w-2xs sm:w-sm bg-[#F3F3F5] rounded-md px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
        }
      >
        <MdOutlineMail />
        <input
          id="email"
          {...register("email")}
          type="text"
          placeholder="Enter your email"
          className="w-sm rounded-md outline-none"
        />
      </div>
      <p className="flex flex-col text-red-500 text-xs h-2">
        {errors.email ? errors.email.message : ""}
      </p>

      <label className="text-[#2c3e50] mt-3">Password</label>
      <div
        className={
          errors.password
            ? "flex items-center rounded-md gap-2 bg-[#F3F3F5] w-2xs sm:w-sm px-2 py-2 shadow-md border border-red-500 transition duration-150 hover:cursor-pointer"
            : "flex items-center rounded-md gap-2 bg-[#F3F3F5] w-2xs sm:w-sm px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
        }
      >
        <IoLockClosedOutline />
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Enter your password"
          className="w-sm rounded-md outline-none"
          autoComplete="off"
        />
      </div>
      <p className="flex flex-col text-red-500 text-xs h-2">
        {errors.password ? errors.password.message : ""}
      </p>

      <label id="confirm_password" className="text-[#2c3e50] mt-3">
        Confirm Password
      </label>
      <div
        className={
          errors.confirm_password
            ? "flex items-center rounded-md gap-2 bg-[#F3F3F5] w-2xs sm:w-sm px-2 py-2 shadow-md border border-red-500 transition duration-150 hover:cursor-pointer"
            : "flex items-center rounded-md gap-2 bg-[#F3F3F5] w-2xs sm:w-sm px-2 py-2 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer"
        }
      >
        <IoLockClosedOutline />
        <input
          type="password"
          placeholder="Confirm your password"
          className="w-sm rounded-md outline-none"
          autoComplete="off"
          id="confirm_password"
          {...register("confirm_password")}
        />
      </div>
      <p className="flex flex-col text-red-500 text-xs h-2">
        {errors.confirm_password ? errors.confirm_password.message : ""}
      </p>

      {/* sign in button */}
      <button disabled={isPending} 
      className="border bg-[#2c3e50] mt-5 w-2xs sm:w-sm text-white font-bold py-2 rounded-md hover:bg-[#3a4753] hover:cursor-pointer disabled:bg-[#3a4753] disabled:cursor-not-allowed">
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
