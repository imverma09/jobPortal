import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/UserSlice";
import jobSlice from "./Slice/JobSlice"
import applicationSlice from "./Slice/ApplicationSlice"
const store = configureStore({
    reducer: {
        auth: authSlice,
        job: jobSlice,
        application: applicationSlice
    }
})
export default store