

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
export const getCategoryJob = async (id:string,currentPage:number | null) => {
  try {
    const response = await api.get(`/jobs/field/${id}?currentPage=${currentPage}`);
    return response.data;
  } catch (error:any) {
    throw error.response.data
  }
};
