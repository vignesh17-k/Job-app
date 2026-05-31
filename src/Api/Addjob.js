import axios from "axios";
import { isDemoMode, addJob, resolveDemo } from "../mock/demoService";



const BASE_URL = process.env.REACT_APP_SERVER_URL



export const Addjobapi = async (job,token) => {
    if (isDemoMode()) {
        return resolveDemo(addJob(job))
    }
    return await axios.post(`${BASE_URL}/jobs`,job,{
            headers:{
                authorization:`Bearer ${token}` 
            }
        })
}