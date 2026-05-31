import axios from "axios"
import { isDemoMode, getStats, resolveDemo } from "../mock/demoService"

const BASE_URL = process.env.REACT_APP_SERVER_URL

  export const GetJobstats = async (token)=>{ 
     if (isDemoMode()) {
        return resolveDemo({ status: 200, data: getStats() })
     }
     return await axios.get(`${BASE_URL}/jobs/stats`,{
         headers:{
            authorization:`Bearer ${token}` 
         }
     })
  }