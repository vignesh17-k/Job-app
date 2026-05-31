import axios from "axios";
import { isDemoMode, demoRegister, resolveDemo } from "../mock/demoService";


const BASE_URL = process.env.REACT_APP_SERVER_URL


export const RegisterApi  = async (data)=>{
    if (isDemoMode()) {
        return resolveDemo(demoRegister(data))
    }
    return  await axios.post( `${BASE_URL}/auth/register`,data)
 }