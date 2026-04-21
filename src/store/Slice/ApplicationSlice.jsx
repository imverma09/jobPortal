import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API  , showSuccess , showError } from "../../Helper/backendApi"

export const fetchApplication = createAsyncThunk("fetchApplication", async (  ) => {
    try {
        const res = await axios.get(`${BACKEND_API}/api/applications/my-applications`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return ({ msg: "server Error" })
    }
})


export const fetchSavedJob = createAsyncThunk("fetchSavedJob", async () => {
    try {
        const res = await axios.get(`${BACKEND_API}/api/saveJob`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.log(error)
        return ({ msg: "server Error" })
    }
})

export const toggleSaveJob = createAsyncThunk("toggleSaveJob", async (jobId) => {
    try {
        const res = await axios.post(`${BACKEND_API}/api/saveJob`, { jobId }, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.log(error)
        return ({ msg: "server Error" })
    }
})


const applicationSlice = createSlice({
    name: "application",
    initialState: {
        isLoading: false,
        application: [],
        isError: false,
        savedJob: [],
    },
    reducers: {
        setApplication: (state, action) => {
            state.application = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApplication.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchApplication.fulfilled, (state, action) => {
            state.isLoading = false,
                state.application = action.payload
        })
        builder.addCase(fetchApplication.rejected, (state, action) => {
            state.isLoading = false
            console.log("Error " + action.payload)
            state.isError = action.payload
        })
        builder.addCase(fetchSavedJob.fulfilled, (state, action) => {
            state.isLoading = false
            console.log("saved job " + action.payload)
            state.savedJob = action.payload
        })
        builder.addCase(fetchSavedJob.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchSavedJob.rejected, (state, action) => {
            state.isLoading = false
            console.log("Error " + action.payload)
            state.isError = action.payload
        })
        builder.addCase( toggleSaveJob.pending , ( state  , action)=>{
            // console.log(action.payload)
        })
        builder.addCase(toggleSaveJob.fulfilled , (state , action)=>{  
             let id = action.meta.arg._id
             state.savedJob = state.savedJob.filter((job)=> job.jobId._id !== id)
             showSuccess(action.payload.message)
        })
        builder.addCase(toggleSaveJob.rejected , (state , action)=>{
            console.log(action.payload)
            showError(action.payload.message)
        })
    }
})

export const { setApplication } = applicationSlice.actions
export default applicationSlice.reducer