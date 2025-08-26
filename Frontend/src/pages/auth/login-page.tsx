import Logo from "../../assets/logo"
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";


const LoginCard = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center max-w-md p-6 rounded-md shadow-2xl">
      {/* Logo */}
      <Logo />

      {/* Card text */}
      <div className="text-center mt-3">
        <h1 className="text-[#2c3e50] text-xl">Welcome</h1>
        <p className="text-gray-500 text-sm max-w-xs">Sign in to your account or create a new one to get started.</p>
      </div>

      {/* Sign up/Sign in buttons */}
      <div className="mt-8 bg-[#F3F3F5] w-full max-w-sm rounded-xl flex justify-evenly"> 
        <button className="text-sm text-[#2c3e50] hover:cursor-pointer hover:bg-white hover:rounded-lg px-17 py-2 scale-93">Sign In</button>
        <button className="text-sm text-[#2c3e50] hover:cursor-pointer hover:bg-white hover:rounded-lg px-17 py-2 scale-93">Sign Up</button>
      </div>

      {/* email,password fields */}
      <form className="mt-8 flex flex-col gap-1">
        <label htmlFor="" className="text-[#2c3e50]">Email</label>
        <div className="flex items-center gap-2 w-sm bg-[#F3F3F5] rounded-md px-2 py-1 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer">
          <MdOutlineMail/>
          <input type="text" placeholder="Enter your email" className="w-sm rounded-md outline-none" />
        </div>

        <label htmlFor="" className="text-[#2c3e50] mt-3">Password</label>
        <div className="flex items-center rounded-md gap-2 bg-[#F3F3F5] w-sm px-2 py-1 shadow-md focus-within:ring-2 focus-within:text-[#2c3e50] transition duration-150 hover:cursor-pointer">
          <IoLockClosedOutline />
          <input type="password" placeholder="Enter your password" className="w-sm rounded-md outline-none" />
        </div>
        
      </form>
      {/* sign in button */}
      <button className="border bg-[#2c3e50] mt-5 w-sm text-white font-bold py-2 rounded-md hover:grayscale-60 hover:cursor-pointer">Sign In</button>
    </div>

    <p className="text-sm text-center mt-4 text-[#2c3e50]">© 2025 inQuis. All rights reserved.</p>
    </div>
    

    
  )
}

export default LoginCard
