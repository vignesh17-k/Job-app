import axios from "axios"
import { isDemoMode, updateUser, resolveDemo } from "../mock/demoService"


const BASE_URL = process.env.REACT_APP_SERVER_URL


  export const Updateuserapi = async (user,token)=>{ 
     if (isDemoMode()) {
        return resolveDemo(updateUser(user))
     }
     return await axios.patch(`${BASE_URL}/auth/updateUser`,user,{
        headers :{
            authorization:`Bearer ${token}` 
        }
     })
  }