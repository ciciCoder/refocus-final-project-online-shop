import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart.slice'
import currencySlice from './currency.slice'

const store = configureStore({
  reducer: {
    cart: cartSlice,
    currency: currencySlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
