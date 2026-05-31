import axios from "axios"
import { isDemoMode, demoLogin, resolveDemo } from "../mock/demoService"


const BASE_URL = process.env.REACT_APP_SERVER_URL

 export const LoginApi = async (data)=>{
   if (isDemoMode()) {
     return resolveDemo(demoLogin())
   }
   return  await axios.post( `${BASE_URL}/auth/login`,data)
 
}