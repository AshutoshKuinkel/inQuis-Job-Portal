import { IApplicationData } from "../types/application.types";
import api from "./";

export const applicationAPI = async (id: string, data: IApplicationData) => {
  try {
    const response = await api.post(`/jobs/apply/${id}`, data);
    return response.data;
  } catch (err: any) {
    console.log("ERR FULL:", err);
    console.log("ERR RESPONSE:", err.response?.data);
    console.log("ERR MESSAGE:", err.message);

    throw err; // rethrow the full Axios error, not just err.response.data
  }
};
