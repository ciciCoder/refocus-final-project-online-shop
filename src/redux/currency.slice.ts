import { Rates } from '@/api/currency.api'
import { appLocalStorage } from '@/lib/utils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type CurrencyState = [keyof Rates, Rates[keyof Rates]]

const currencySlice = (() => {
  const LOCAL_STORAGE_KEY = 'currency'
  const defaultState: CurrencyState = ['USD', 1]
  const [getLocalStorageCurrency, setLocalStorageCurrency] = appLocalStorage(
    LOCAL_STORAGE_KEY,
    defaultState,
  )
  return createSlice({
    name: 'currency',
    initialState: defaultState,
    reducers: {
      initCurrency() {
        return getLocalStorageCurrency()
      },
      setCurrency(_, action: PayloadAction<CurrencyState>) {
        const { payload } = action
        setLocalStorageCurrency(payload)
        return payload
      },
    },
  })
})()

export const { setCurrency, initCurrency } = currencySlice.actions

export default currencySlice.reducer
