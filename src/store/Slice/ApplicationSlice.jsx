import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API  , showSuccess , showError } from "../../Helper/backendApi"

export const fetchApplication = createAsyncThunk("fetchApplication", async ( __ ,  { rejectWithValue }  ) => {
    try {
        const res = await axios.get(`${BACKEND_API}/api/applications/my-applications`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue({ msg: "server Error" })
    }
})


export const fetchSavedJob = createAsyncThunk("fetchSavedJob", async ( __ ,  { rejectWithValue }  ) => {
    try {
        const res = await axios.get(`${BACKEND_API}/api/saveJob`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue({ msg: "server Error" })
    }
})

export const toggleSaveJob = createAsyncThunk("toggleSaveJob", async (jobId, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${BACKEND_API}/api/saveJob`, { jobId }, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.log(error)
        return rejectWithValue({ msg: "server Error" })
    }
}) 
export  const deleteApplication =  createAsyncThunk("deleteApplication" ,async ( applicationId , {rejectWithValue})=>{
    try{ 
         let response =  await axios.delete(`${BACKEND_API}/api/applications/${applicationId}` , {
            withCredentials : true, 
         })
         console.log(response.data)
         return  response.data
    }catch(error){
         return rejectWithValue(error.response.data.message || "Server Error !")
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
            state.application = []
            state.isError = action.payload.msg
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
            console.log(action.payload)
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
        builder.addCase(deleteApplication.pending , (state , action)=>{
            state.isLoading = true 
        })
        builder.addCase(deleteApplication.fulfilled , (state , action)=>{
            state.isLoading = false 
            state.application = state.application.filter(app => app._id !== action.meta.arg)
            showSuccess(action.payload.message)
        })
        builder.addCase(deleteApplication.rejected , (state , action)=>{
            state.isLoading = false
            showError(action.payload.message)
        })
    }
})

export const { setApplication } = applicationSlice.actions
export default applicationSlice.reducer