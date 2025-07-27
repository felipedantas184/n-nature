import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: typeof window !== "undefined" && localStorage.getItem("easy-phone-cart") ? JSON.parse(localStorage.getItem("easy-phone-cart")) : [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id && item.selectedVariant.id === action.payload.selectedVariant.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    setQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      item.quantity = action.payload;
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id && item.selectedVariant.id === action.payload.selectedVariant.id);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id && item.selectedVariant.id === action.payload.selectedVariant.id);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload.id && item.selectedVariant.id === action.payload.selectedVariant.id);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  setQuantity,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;