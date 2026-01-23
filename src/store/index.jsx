import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./Slice/UserSlice";
 import jobSlice from "./Slice/JobSlice"
const store =  configureStore({
    reducer :{
        auth : authSlice , 
        job : jobSlice
    }
})
export default  store