

import api from "./index";

//get all categories:
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error:any) {
    throw error.response.data
  }
};

//get job by categories:
export const getCategoryJob = async (id:string) => {
  try {
    const response = await api.get(`/field/${id}`);
    return response.data;
  } catch (error:any) {
    throw error.response.data
  }
};
