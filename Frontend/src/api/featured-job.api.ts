import api from './'

export const getFeaturedJobAPI = async()=>{
  try{
    const response = await api.get('/getFeaturedJobs')
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}