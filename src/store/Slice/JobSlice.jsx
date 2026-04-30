import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API, showError , showSuccess } from "../../Helper/backendApi";

export const fetchJob = createAsyncThunk("fetchJob", async (__, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BACKEND_API}/api/data/getjob`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message || " Server Error ! try again later ")
    }
})
export  const fetchJobPosting =  createAsyncThunk("fetchJobPosting" ,  async( __ , {rejectWithValue})=>{
       try{
            let response =  await axios.get(`${BACKEND_API}/api/data/fetchJobPosting`, {
                withCredentials : true 
            })
            return response.data        
       }catch(error){
        return rejectWithValue(error.response.data.massage || " Server Error")
       }
})

export  const deleteJob  = createAsyncThunk("deleteJob" , async( jobId , { rejectWithValue})=>{
            try{
               const response =  await axios.delete(`${BACKEND_API}/api/data/deleteJob/${jobId}` , {
                withCredentials : true 
               })
               console.log(response.data)
               return response.data
            }catch(error){
                console.log(error)
                return rejectWithValue(error.response.data.massage || " something went wrong ! try again later ")
            }
})

const jobSlice = createSlice({
    name: "job",
    initialState: {
        isLoading: false,
        jobs: [],
        isError: false,
        jobPostings : []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJob.fulfilled, (state, action) => {
            state.isLoading = false
            state.jobs = action.payload
        })
        builder.addCase(fetchJob.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchJob.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload
        })
        builder.addCase(fetchJobPosting.pending , (state , action )=>{
            state.isLoading = true
        })
        builder.addCase(fetchJobPosting.fulfilled , (state , action)=>{
             state.isLoading = false
             state.jobPostings = action.payload
        })
        builder.addCase(fetchJobPosting.rejected , (state , action)=>{
             state.isLoading = false
             state.isError = action.payload
        })
        builder.addCase(deleteJob.pending , ( state , action)=>{
            state.isLoading = true
        })
        builder.addCase(deleteJob.fulfilled , (state , action )=>{
            state.isLoading = false 
            state.jobPostings = state.jobPostings.filter(job => job._id !== action.meta.arg)
            showSuccess(action.payload.message)
        })
        builder.addCase(deleteJob.rejected , ( state , action )=>{
                 state.isError = true 
                 state.isLoading = false   
                 showError(action.payload)
        })
    }
})
export default jobSlice.reducer
