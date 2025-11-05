import { createSlice  , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BACKEND_API} from "../../backendApi" 


export const fetchUserInfo  =  createAsyncThunk("fetchUserInfo" , async () => {
  const data =   axios.get(`${BACKEND_API}/api/users/userInfo` , {
    withCredentials : true
  })
  return(await data).data
})

export const logoutUser = createAsyncThunk("logoutUser" , async () => {
    try {
      let res = axios.get(`${BACKEND_API}/api/users/logout` , {
            withCredentials : true
        })
        console.log((await res).data)
        return (await res).data
    } catch (error) {
        console.log(error)
        return ({msg : "server Error"})
    }
} ) 

const authSlice =  createSlice({
    name : "user" ,
    initialState : {
        isLoading : false ,
        userInfo : {} , 
        isError : false ,
    }, 
    reducers :{
        setCredentials :( state , action) =>{
            state.userInfo =   action.payload
        } ,
        logout :  ( state , action)=>{
            state.userInfo = {}
        } ,
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchUserInfo.pending , (state , action)=>{
                state.isLoading = true 
        })
        builder.addCase(fetchUserInfo.fulfilled , (state ,action) =>{
                state.isLoading = false , 
                state.userInfo = action.payload
        })
        builder.addCase(fetchUserInfo.rejected , (state  ,action)=>{
            state.isLoading = false
            console.log("Error "  +  action.payload)
            state.isError = action.payload
        })

        builder.addCase(logoutUser.pending , (state , action)=>{
                state.isLoading = true
        })
        builder.addCase(logoutUser.fulfilled , (state , action)=>{
                state.userInfo = {}
                state.isLoading = false
        })
        builder.addCase(logoutUser.rejected , (state , action)=>{
            state.isLoading = false
            state.isError = action.payload
        })
    }
})
export const {setCredentials , logout} = authSlice.actions
export default authSlice.reducer