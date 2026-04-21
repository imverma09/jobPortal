import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API, showError , showSuccess } from "../../Helper/backendApi"

export const fetchUserInfo = createAsyncThunk("fetchUserInfo", async (_, { rejectWithValue }) => {
    try {
        const data = await axios.get(`${BACKEND_API}/api/users/userInfo`, {
            withCredentials: true
        })
        return data.data
    } catch (error) {
        if (error?.response?.status === 400) {
            return rejectWithValue({ status: error.response.status, msg: "Unauthorized" })
        }
        return rejectWithValue({ msg: "server Error" })
    }
})

export const updateProfile = createAsyncThunk("updateProfile", async (updateData , {rejectWithValue}) => {
    try {
        const data = await axios.put(`${BACKEND_API}/api/users/updateProfile`, updateData, {
            withCredentials: true
        })
        showSuccess(data.data.message)
        return data.data
    } catch (error) {
        if (error?.response?.status === 400) {
            // showError(error.response.data.error)
            return rejectWithValue({ status: error.response.status, msg: "Unauthorized" })
         }
        return  rejectWithValue({ msg: "server Error" })
    }
})


export const logoutUser = createAsyncThunk("logoutUser", async () => {
    try {
        let res = axios.get(`${BACKEND_API}/api/users/logout`, {
            withCredentials: true
        })
        console.log((await res).data)
        localStorage.removeItem("userID")
        return (await res).data
    } catch (error) {
        console.log(error)
        return ({ msg: "server Error" })
    }
})

const authSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        userInfo: {},
        isError: false,
        isAuthenticated: null
    },
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            state.isAuthenticated = true
        },
        logout: (state, action) => {
            state.userInfo = {}
            state.isAuthenticated = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.isLoading = false,
                state.userInfo = action.payload,
                state.isAuthenticated = true
        })
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = action.payload,
                state.isAuthenticated = false
        })

        builder.addCase(logoutUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.userInfo = {},
             state.isLoading = false,
                state.isAuthenticated = false
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = action.payload
        })
        
        builder.addCase(updateProfile.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false
            // console.log(action.meta.arg)
            state.userInfo = action.meta.arg
            // state.userInfo = action.payload
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload
        })
    }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
