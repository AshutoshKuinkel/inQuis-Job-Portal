import React, { useContext, useEffect, useState } from "react";
import type { IUser } from "../types/auth.types";
import { getProfile } from "../api/auth.api";

interface IContext {
  user: null | IUser;
  setUser: React.Dispatch<React.SetStateAction<null>>;
  // token:string | null,
  // setToken: React.Dispatch<React.SetStateAction<string | null>>,
  isLoading: boolean;
}

const inital_values = {
  user: null,
  setUser: () => {},
  // token:null,
  // setToken:()=>{},
  isLoading: true,
  logout: () => {},
};

const AuthContext = React.createContext<IContext>(inital_values);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  // const[token,setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getProfile();
        console.log(data)
        setUser(data);
      } catch (err) {
        console.log(err);
        setUser(null)
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser()
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook:
export const useAuth = () => {
  if (!AuthContext) {
    console.log(`useAuth hook must be inside auth provider.`);
  }
  return useContext(AuthContext);
};

export default AuthProvider;
