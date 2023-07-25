import { Rates } from '@/api/currency.api'
import { useAppLocalStorage } from '@/hooks'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type CurrencyState = [keyof Rates, Rates[keyof Rates]]

const currencySlice = (() => {
  const LOCAL_STORAGE_KEY = 'currency'
  const defaultState: CurrencyState = ['USD', 1]
  const [localStorageCurrency, setLocalStorageCurrency] = useAppLocalStorage(
    LOCAL_STORAGE_KEY,
    defaultState,
  )
  return createSlice({
    name: 'currency',
    initialState: localStorageCurrency,
    reducers: {
      setCurrency(_, action: PayloadAction<CurrencyState>) {
        const { payload } = action
        setLocalStorageCurrency(payload)
        return payload
      },
    },
  })
})()

export const { setCurrency } = currencySlice.actions

export default currencySlice.reducer
