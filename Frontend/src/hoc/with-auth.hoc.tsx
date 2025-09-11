import { ComponentType } from "react";
import { useAuth } from "../context/auth-context";
import { Oval } from "react-loading-icons";
import { Navigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { Role } from "../types/enum.types";

export function withAuth<T>(Component: ComponentType<T>,roles:Role[]) {
  return function ProtectedComponent(props: any) {
    const { isLoading, user } = useAuth();
    const location = useLocation()
    if (isLoading) {
      return (
        <div className="flex justify-center items-center col-span-4 h-screen">
          <Oval stroke="#2c3e50" height="64" width="64" />
        </div>
      );
    }

    //authentication logic
    if (!user) {
      setTimeout(toast.error("Please login to view this.", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      }),500)
      return <Navigate to={"/login"} state={{from:location.pathname}} />;
    }

    //role based access
    if(roles && !roles.includes(user.role)){
      setTimeout(toast.error("Unauthorised. Please try with a different account.", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      }),500)
      return <Navigate to={'/login'} state={{from:location.pathname}}/>
    }
    return <Component {...props} />;
  };
}
