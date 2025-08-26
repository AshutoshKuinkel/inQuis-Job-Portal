
import { useForm } from "react-hook-form";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";


const LoginForm = () => {

  const {register,handleSubmit,watch} = useForm({
    defaultValues:{
    email:'',
    password:''
    }
  })

  console.log(watch('email'))
  console.log(watch('password'))

  const onSubmit = (data:any)=>{
    console.log(data)
  }

  return (
      <form className="mt-8 flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-[#2c3e50]">
          Email
        </label>
        <div className="flex items-center gap-2 w-sm bg-[#F3F3F5] rounded-md px-2 py-1 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer">
          <MdOutlineMail />
          <input
            type="text"
            placeholder="Enter your email"
            className="w-sm rounded-md outline-none"
            id="email" 
            {...register('email')}
          />
        </div>

        <label className="text-[#2c3e50] mt-3">
          Password
        </label>
        <div className="flex items-center rounded-md gap-2 bg-[#F3F3F5] w-sm px-2 py-1 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer">
          <IoLockClosedOutline />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-sm rounded-md outline-none"
            autoComplete="off"
            id="password" 
            {...register('password')}
          />
        </div>

        {/* sign in button */}
        <button className="border bg-[#2c3e50] mt-5 w-sm text-white font-bold py-2 rounded-md hover:grayscale-60 hover:cursor-pointer" type="submit">Sign In</button>
      </form>
  );
};

export default LoginForm;
