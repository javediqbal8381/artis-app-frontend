import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  checkoutInfo: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      if(!state.cartItems.includes(action.payload)) {
        state.cartItems = [...state.cartItems, action.payload]
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i !== action.payload)
    },
    storecheckoutProductsInfo: (state, action) => {
      state.checkoutInfo = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtoCart, removeFromCart,storecheckoutProductsInfo } = cartSlice.actions

export default cartSlice.reducer