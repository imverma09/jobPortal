import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./Slice/UserSlice";
 
const store =  configureStore({
    reducer :{
        auth : authSlice
    }
})
export default  store