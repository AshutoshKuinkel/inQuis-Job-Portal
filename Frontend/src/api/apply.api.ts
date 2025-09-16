import axios from "axios";
import { IApplicationData } from "../types/application.types";

export const applicationAPI = async (id: string, data: IApplicationData) => {
  try {
    const response = await axios.post(`https://inquis-portal.onrender.com/jobs/apply/${id}`, data,{
      withCredentials:true
    });
    console.log(response)
    return response.data;
  } catch (err: any) {
    throw err.response?.data;
  }
};
