import axios from "axios";
import { isDemoMode, filterJobs, resolveDemo } from "../mock/demoService";


const BASE_URL = process.env.REACT_APP_SERVER_URL



export const Alljobapi = async (token) => {
    if (isDemoMode()) {
        return resolveDemo({
            status: 200,
            data: filterJobs({ status: "all", jobType: "all", sort: "latest", page: 1, search: "" }),
        })
    }
    return await axios.get(`${BASE_URL}/jobs`,{
            headers:{
                authorization:`Bearer ${token}` 
            }
        })
}