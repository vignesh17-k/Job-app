import axios from "axios"
import { isDemoMode, updateJob, resolveDemo } from "../mock/demoService"


const BASE_URL = process.env.REACT_APP_SERVER_URL


  
  export const Editjobapi = async (Job,JobId,token)=>{ 
     if (isDemoMode()) {
        const result = updateJob(Job, JobId)
        if (result instanceof Promise) return result
        return resolveDemo(result)
     }
     return await axios.patch(`${BASE_URL}/jobs/${JobId}`,Job,{
        headers :{
            authorization:`Bearer ${token}` 
        }
     })
  }