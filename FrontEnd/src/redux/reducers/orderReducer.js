import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { userActions } from "./userReducer";
const initialState= {
    
    orders:[]
}
export const initialStateAsync= createAsyncThunk('order/init',async(_,{rejectWithValue})=>{
    try {
        const resonse= await axiosInstance.get('/orders/')
        return resonse.data;
    } catch (error) {
        return rejectWithValue(error.resonse?.data?.message || "Someting went Wrong!")
    }
})
export const createOrderAsync=createAsyncThunk('order/create',async(_,{rejectWithValue})=>{
    try {
        const resonse = await axiosInstance.post('/orders/create')
        return resonse.data;
    } catch (error) {
        return rejectWithValue(error.resonse?.data?.message || "Someting went Wrong!")
        
    }
})

const orderSlice  = createSlice({
    name:"order",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //Handle logout fuctionality
        .addCase(userActions.logoutUser,(state,action)=>{
            state.orders=[]
        })
        //Handle intial state
       

        .addCase(initialStateAsync.fulfilled,(state,action)=>{
                 state.orders=action.payload.orders
        })
       
    }
})


export const orderReducer= orderSlice.reducer;
export const orderSelector =(state)=>state.orderReducer;