import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance";

// Async thunk to fetch initial cart state from the server
export const initialStateAsync = createAsyncThunk(
  "cart/initialState",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart/");
      console.log(response.data.cartItems,"cart items")
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
      console.log(response.data)

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
      const response = await axiosInstance.post(`/cart/remove/${productId}`);
      return response.data; // Updated cart data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from cart."
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
  reducers: {
    reduceFromCart(state, action) {
      const productId = action.payload;
      const existingItem = state.cart.find((item) => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1; // Reduce quantity by 1
      } else {
        state.cart = state.cart.filter((item) => item.id !== productId); // Remove item if quantity is 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.cart = action.payload; // Update cart with server response
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle removeFromCart
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Update cart with server response
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reduceFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cartReducer;
