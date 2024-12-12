import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance";
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
        //Handle intial state
       

        builder.addCase(initialStateAsync.fulfilled,(state,action)=>{
                 state.orders=action.payload.orders
        })
       
    }
})


export const orderReducer= orderSlice.reducer;
export const orderSelector =(state)=>state.orderReducer;