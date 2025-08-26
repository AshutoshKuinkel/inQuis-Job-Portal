import { Link } from "react-router"
import Logo from "../../assets/logo"
import LoginForm from "../../components/forms/login.form"



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
        <Link to={'/login'}><button className="text-sm text-[#2c3e50] hover:cursor-pointer hover:bg-white hover:rounded-lg px-17 py-2 scale-93">Sign In</button></Link>
        <Link to={'/signup'}><button className="text-sm text-[#2c3e50] hover:cursor-pointer hover:bg-white hover:rounded-lg px-17 py-2 scale-93">Sign Up</button></Link>
      </div>

      {/* form*/}
      <LoginForm />
      
    </div>

    <p className="text-sm text-center mt-4 text-[#2c3e50]">© 2025 inQuis. All rights reserved.</p>
    </div>
    

    
  )
}

export default LoginCard
