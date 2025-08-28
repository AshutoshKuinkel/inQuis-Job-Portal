import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router";

export const ClientLayout = ()=>{
  return(
    <div className="h-full w-full">
      {/* Header section */}
      <Header />

      {/* Page section */}
      <Outlet/>

      {/* Footer section */}
      <Footer/>
      
    </div>
  )
}

export default ClientLayout