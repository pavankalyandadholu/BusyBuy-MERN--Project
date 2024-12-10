import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState={
    products:[]
}

export const initialStateAsync= createAsyncThunk('products',()=>{
    return fetch('https://fakestoreapi.com/products').then(res=>res.json());
    
})


const productsSlice= createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(initialStateAsync.fulfilled,(state,action)=>{
            state.products=[action.payload]
        })
    }

})

export const productsReducer= productsSlice.reducer;
export const productsSelector= (state)=>state.productsReducer.products
