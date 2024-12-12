import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { createOrderAsync } from "./orderReducer";
import { userActions } from "./userReducer";
// Async thunk to fetch initial cart state from the server
export const initialStateAsync = createAsyncThunk(
  "cart/initialState",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart/");
      return response.data.cartItems; // Assume response.data contains the cart items
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong!"
      );
    }
  }
);

// Async thunk to add an item to the cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cart/add", product);
      return response.data; // Updated cart data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart."
      );
    }
  }
);

// Async thunk to remove an item from the cart
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/remove`, { productId });
      return response.data; // Updated cart data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from cart."
      );
    }
  }
);

// Async thunk to reduce quantity of an item in the cart
export const reduceFromCartAsync = createAsyncThunk(
  "cart/reduceFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/reduce`, { productId });
      return response.data; // Updated cart data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reduce item quantity."
      );
    }
  }
);

// Initial state
const initialState = {
  cart: [],
  loading: false,
  error: null,
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Handle Logout Functionality
    .addCase(userActions.logoutUser,(state,action)=>{
      state.cart=[];
      state.loading=false;
      state.error=false;
    })
      // Handle initial cart state
      .addCase(initialStateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initialStateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Assume payload contains initial cart items
      })
      .addCase(initialStateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle addToCart
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const item = state.cart.find(
          (item) => item.productDetails.id === action.payload.cart.productDetails.id
        );
        if (item) {
          item.itemQuantity += 1;
        } else {
          state.cart.push(action.payload.cart);
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle reduceFromCart
      .addCase(reduceFromCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reduceFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const item = state.cart.find(
          (item) => item.productDetails.id === action.payload.cart.productDetails.id
        );
        if (item) {
          if (item.itemQuantity > 1) {
            item.itemQuantity -= 1;
          } else {
            state.cart = state.cart.filter(
              (cartItem) => cartItem.productDetails.id !==action.payload.cart.productDetails.id
            );
          }
        }
      })
      .addCase(reduceFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        console.log("rejected")
        state.error = action.payload;
      })

      // Handle removeFromCart
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter(
          (item) => item.productDetails.id !== action.payload.product.productDetails.id
        );
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle submit Order
      .addCase(createOrderAsync.fulfilled,(state)=>{
        state.cart=[]
      })

  },
});

export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cartReducer;
