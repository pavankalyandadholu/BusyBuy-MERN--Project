import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  bcrypt from 'bcryptjs'
import axiosInstance from "../../axiosInstance/axiosInstance";

export const registerAsync= createAsyncThunk('user/register',async (credentials,{rejectWithValue})=>{

    try{
        const response= await axiosInstance.post('/users/register',credentials);
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data?.message || "Registration getting Failed! ")
    }
})
 
export const loginAsync= createAsyncThunk('user/login',async (credentials,{rejectWithValue})=>{
    try {
        const response= await axiosInstance.post('/users/login',credentials);
        localStorage.setItem('token', response.data.token); // Store token in local storage
        return response.data; // Payload

        
        
    } catch (error) {
       
      return  rejectWithValue(error.response?.data?.message || "Login Failed.")
    }
})



const initialState= 
{
    user:null,
    token:localStorage.getItem('token') || null,
    loading:false,
    error:null,
    registrationSuccess: false,


}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        registerUser:(state,action)=>{
            const user=action.payload;
            const newPassword=  bcrypt.hashSync(user.password,12);
    user.password=newPassword;
    user.cart=[];
    user.orders=[];
    state.users.push(user);
        },
        logoutUser:(state)=>{
            state.user=null;
            state.token=null;
            localStorage.removeItem('token');
        },
        addtoCart:(state,action)=>{
            if(state.isLoggedIn){
                const index= state.users.findIndex((user)=>user.email==state.isLoggedIn.email);
                if(index!=-1){
                const cartItemIndex=  state.users[index].cart.findIndex((item)=>item.id==action.payload.product.id)
                if(cartItemIndex==-1){
                    state.users[index].cart.push({...action.payload.product,itemsCount:1})
                }else{
                    ++state.users[index].cart[cartItemIndex].itemsCount
                }
                }
              state.isLoggedIn=state.users[index]
            }

        },
        removeFromCart:(state,action)=>{
            if(state.isLoggedIn){
                const index= state.users.findIndex((user)=>user.email==state.isLoggedIn.email);
                if(index!=-1){
                const cartItemIndex=  state.users[index].cart.findIndex((item)=>item.id==action.payload.product.id)
                if(cartItemIndex !=-1){
                    if(state.users[index].cart[cartItemIndex].itemsCount>1)
                    --state.users[index].cart[cartItemIndex].itemsCount
                    else
                    state.users[index].cart.splice(cartItemIndex,1);

                }
                }
              state.isLoggedIn=state.users[index]
            }
        },
        completelyRemoveFromCart:(state,action)=>{
            if(state.isLoggedIn){
                const index= state.users.findIndex((user)=>user.email==state.isLoggedIn.email);
                if(index!=-1){
                const cartItemIndex=  state.users[index].cart.findIndex((item)=>item.id==action.payload.product.id)
                if(cartItemIndex !=-1){
                    state.users[index].cart.splice(cartItemIndex,1);

                }
                }
              state.isLoggedIn=state.users[index]
            }
        },
        submitOrder:(state)=>{
            if(state.isLoggedIn){
                const index= state.users.findIndex((user)=>user.email==state.isLoggedIn.email);
                if(index!=-1){
                        if(state.users[index].cart.length==0){
                            return;
                        }
                    const orders=state.users[index].cart.map(o=> ({title:o.title,itemsCount:o.itemsCount,price:o.price}));

                    state.users[index].orders.push({date:new Date().toLocaleDateString(),orders});
                    state.users[index].cart=[];

                }
              state.isLoggedIn=state.users[index]
            }
        }
    },
    extraReducers:(builder)=>{
        // For Logging
        builder.addCase(loginAsync.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        builder.addCase(loginAsync.fulfilled,(state,action)=>{
            state.loading=false;
          state.token=  action.payload.token;
          state.user=action.payload
        })
        builder.addCase(loginAsync.rejected,(state,action)=>{
            console.log("rejected.")
            state.loading=false;
            state.error=action.payload
        })
        //For Registration
        builder.addCase(registerAsync.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.registrationSuccess = false;
        })
        builder.addCase(registerAsync.fulfilled,(state)=>{
            state.loading=false;
            state.registrationSuccess = true;
        })
        builder.addCase(registerAsync.rejected,(state,action)=>{
            console.log("rejected.")
            state.loading=false;
            state.error=action.payload
        })
    }

})


 
export const userReducer= userSlice.reducer;

export const userActions= userSlice.actions;

export const userSelector=(state)=>state.userReducer

