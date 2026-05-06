import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MenuItem, CartItem } from '../../models/RestaurantModel'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<MenuItem>) => {
      const newItem: CartItem = { ...action.payload, cartId: Date.now() }
      state.items.push(newItem)
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.cartId !== action.payload)
    },
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
    clear: (state) => {
      state.items = []
    }
  }
})

export const { add, remove, open, close, clear } = cartSlice.actions
export default cartSlice.reducer
