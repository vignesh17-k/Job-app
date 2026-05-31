import axios from "axios";
import { isDemoMode, filterJobs, resolveDemo } from "../mock/demoService";


const BASE_URL = process.env.REACT_APP_SERVER_URL


export const FilterApi = async ({status,jobType,sort,page,search},token)=>{
     if (isDemoMode()) {
        return resolveDemo({ status: 200, data: filterJobs({ status, jobType, sort, page, search }) })
     }
     let url = `${BASE_URL}/jobs?status=${status}&jobType=${jobType}&sort=${sort}&page=${page}`
     if(search){
          url = url + `&search=${search}`
     }
    return  await axios.get(url,{
         headers:{
            authorization:`Bearer ${token}` 
         }
    })
 }