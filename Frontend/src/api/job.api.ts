import api from './index'

export const getAllJobsAPI = async(currentPage:any,query:string,location:string,sortBy?:string)=>{
  try{
  const response = await api.get(`/jobs`,{
    params:{
      currentPage,
      query,
      location,
      sortBy
    }
  })
  return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const getJobBYIdAPI = async(id:string,currentPage:any,query:string,location:string)=>{
  try{
    const response = await api.get(`/jobs/${id}`,{
      params:{
        currentPage,
        query,
        location
      }
    })
    return response.data
  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}