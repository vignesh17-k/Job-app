import axios from "axios";
import { isDemoMode, deleteJob, resolveDemo } from "../mock/demoService";

const BASE_URL = process.env.REACT_APP_SERVER_URL



export const Deletejobapi = async (id,token) => {
    if (isDemoMode()) {
        const result = deleteJob(id)
        if (result instanceof Promise) return result
        return resolveDemo(result)
    }
    return await axios.delete(`${BASE_URL}/jobs/${id}`,{
            headers:{
                authorization:`Bearer ${token}` 
            }
        })
}