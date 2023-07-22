import { Product } from '@/api/product.api'
import { appLocalStorage } from '@/lib/utils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartItem extends Product {
  quantity: number
}

const cartSlice = (() => {
  const LOCAL_STORAGE_KEY = 'cart'
  const defaultCart = [] as CartItem[]
  const [getLocalStorageCart, setLocalStorageCart] = appLocalStorage(
    LOCAL_STORAGE_KEY,
    defaultCart,
  )

  return createSlice({
    name: 'cart',
    initialState: defaultCart,
    reducers: {
      initCart() {
        return [...getLocalStorageCart()]
      },
      addToCart(state, action: PayloadAction<Product>) {
        state.push({ ...action.payload, quantity: 1 })
        setLocalStorageCart(state)
      },
      removeFromCart(state, action: PayloadAction<CartItem['id']>) {
        const filteredState = state.filter((item) => item.id !== action.payload)
        setLocalStorageCart(filteredState)
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
        setLocalStorageCart(mappedState)
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
        setLocalStorageCart(mappedState)
        return mappedState
      },
    },
  })
})()

export const {
  addToCart,
  removeFromCart,
  decrementCartItem,
  incrementCartItem,
  initCart,
} = cartSlice.actions

export default cartSlice.reducer
