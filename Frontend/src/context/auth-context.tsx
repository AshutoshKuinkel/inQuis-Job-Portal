import React, { useContext, useEffect, useState } from "react";
import type { IUser } from "../types/auth.types";

interface IContext {
  user: null | IUser
  setUser: React.Dispatch<React.SetStateAction<null>>,
  token:string | null,
  setToken: React.Dispatch<React.SetStateAction<string | null>>,
  isLoading:boolean,
  logout:()=> void
}

const inital_values = {
  user:null,
  setUser:()=>{},
  token:null,
  setToken:()=>{},
  isLoading:true,
  logout:()=>{}
}


const AuthContext = React.createContext<IContext>(inital_values)


const AuthProvider:React.FC<{children:React.ReactNode}> = ({children}) => {

  const [user,setUser] = useState(null)
  const[token,setToken] = useState<string | null>(null)
  const[isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    try{
      const data = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if(data && token){
      setUser(JSON.parse(data))
      setToken(token)
    }
    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false)
    }
  },[])

  const logout = (cb=()=>{})=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
    cb()
  }

  return (
    <AuthContext.Provider value={{user,setUser,token,setToken,isLoading,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

//custom hook:
export const useAuth = ()=>{

  if(!AuthContext){
    console.log(`useAuth hook must be inside auth provider.`)
  }
  return useContext(AuthContext)
}

export default AuthProvider