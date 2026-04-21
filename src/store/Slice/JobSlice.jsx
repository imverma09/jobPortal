import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "../../Helper/backendApi";

export const fetchJob = createAsyncThunk("fetchJob", async (__, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BACKEND_API}/api/data/getjob`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


const jobSlice = createSlice({
    name: "job",
    initialState: {
        isLoading: false,
        jobs: [],
        isError: false,
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
            console.log("job Fetch Error" + action.payload)
            state.isError = action.payload
        })
    }
})
export default jobSlice.reducer
