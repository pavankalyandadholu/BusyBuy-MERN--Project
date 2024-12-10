import { createSlice } from "@reduxjs/toolkit";
import { userProfiles } from "../../DataBase/UserProfiles";
import  bcrypt from 'bcryptjs'

const initialState= {users:[...userProfiles],isLoggedIn:null}
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
        loginUser:(state,action)=>{
            const isUserExist= state.users.find(u=>{
                return u.email==action.payload.email});
    if(isUserExist){
        state.isLoggedIn=isUserExist
    }
        },
        logoutUser:(state)=>{
            state.isLoggedIn=null;
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
    }

})


 
export const userReducer= userSlice.reducer;

export const userActions= userSlice.actions;

export const userSelector=(state)=>state.userReducer

