import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "../../Helper/backendApi";

export const getApplicants =  createAsyncThunk("getApplicants" ,  async(__ , {rejectWithValue})=>{
    try {
        const response =  await axios.get(`${BACKEND_API}/api/applications/get-applicants` , {
            withCredentials : true , 
        })
        return  response.data
    } catch (error) {
        console.log(error.response)
       return  rejectWithValue(error.response.data.message)
    }
})
 export const updateApplicationStatus =  createAsyncThunk("updateApplicationStatus", async (data , {rejectWithValue} )=>{
    
      try{
      let response =   await axios.patch(`${BACKEND_API}/api/applications/updateStatus` ,  data , {
        withCredentials : true
      })
      
      return response.data.message || " status update successful ! "
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.message)
      }
 })

const applicantsSlice =  createSlice({
    name : "applicants",
    initialState : {
        isLoading : false, 
        applicants : [] , 
        isError : false ,
    }, 
    reducers :{
        setApplicants : ( state , action )=>{
           state.applicants = action.payload
        }
    },
    extraReducers  :(builder)=>{
        builder.addCase(getApplicants.pending ,(state , action )=>{
              state.isLoading = true 
        }) 
        builder.addCase(getApplicants.fulfilled , ( state , action) =>{
            state.isLoading = false 
            state.applicants = action.payload
        })
        builder.addCase(getApplicants.rejected , (state , action)=>{
            state.isError  = true 
            state.isLoading = false
            state.applicants = action.payload
        })

        builder.addCase(updateApplicationStatus.fulfilled , (state , action)=>{
            state.isLoading = false 
            console.log(action.meta.arg)
            state.applicants  =  state.applicants.map((applicants)=>{
                    if( applicants._id === action.meta.arg.applicantId){
                          return { ...applicants , status : action.meta.arg.status }
                    }else {
                        return applicants
                    }
            })
        })
    }
})

export const { setApplicants } =  applicantsSlice.actions
export default applicantsSlice.reducer