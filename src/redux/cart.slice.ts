import { Product } from '@/api/product.api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartItem extends Product {
  quantity: number
}

function getInitialState() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const result = localStorage.getItem('cart')
    if (!result) return []
    const cart = JSON.parse(result) as CartItem[]
    if (!Array.isArray(cart))
      throw new Error(`${typeof cart} is incomaptible with type Cart[]`)
    return cart
  }
  return []
}

const setLocalCart = (() => {
  // let timeout: NodeJS.Timeout
  return function (cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart))
    // clearTimeout(timeout)
    // timeout = setTimeout(() => {
    // }, 100)
  }
})()

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    initCart() {
      return [...getInitialState()]
    },
    addToCart(state, action: PayloadAction<Product>) {
      state.push({ ...action.payload, quantity: 1 })
      setLocalCart(state)
    },
    removeFromCart(state, action: PayloadAction<CartItem['id']>) {
      const filteredState = state.filter((item) => item.id !== action.payload)
      setLocalCart(filteredState)
      return filteredState
    },
    incrementCartItem(state, action: PayloadAction<CartItem['id']>) {
      const mappedState = state.map((item) => {
        if (item.id !== action.payload) return item
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      })
      setLocalCart(mappedState)
      return mappedState
    },
    decrementCartItem(state, action: PayloadAction<CartItem['id']>) {
      const mappedState = state.map((item) => {
        if (item.id !== action.payload) return item
        return {
          ...item,
          quantity: item.quantity - 1,
        }
      })
      setLocalCart(mappedState)
      return mappedState
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  decrementCartItem,
  incrementCartItem,
  initCart,
} = cartSlice.actions

export default cartSlice.reducer
