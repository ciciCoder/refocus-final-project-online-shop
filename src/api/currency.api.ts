import axios from 'axios'
import dateformat from 'dateformat'

export interface Rates {
  USD: number
  EUR: number
  PHP: number
  IDR: number
  AUD: number
}

export interface CurrencyRate {
  success: boolean
  historical: boolean
  date: string
  timestamp: number
  base: string
  rates: Rates
}

export const fetchCurrencyRates = async () => {
  const params = {
    access_key: process.env.API_CURRENCY_ACCESS_KEY,
    symbols: 'USD,EUR,PHP,IDR,AUD',
  }
  const url = 'http://data.fixer.io/api/latest'
  const { data } = await axios.get<CurrencyRate>(url, { params })
  if (data.rates) {
    const { USD, EUR } = data.rates
    const USD_EUR_FACTOR = EUR / USD
    const keys = Object.keys(data.rates) as Array<keyof Rates>
    return keys.reduce((result, rate) => {
      result[rate] = data.rates[rate] * USD_EUR_FACTOR
      return result
    }, {} as Rates)
  }
  const USD = 1.113333
  const EUR = 1
  const USD_EUR_FACTOR = EUR / USD
  return {
    USD: 1,
    EUR: 1 * USD_EUR_FACTOR,
    PHP: 60.933116 * USD_EUR_FACTOR,
    IDR: 16748.253443 * USD_EUR_FACTOR,
    AUD: 1.654775 * USD_EUR_FACTOR,
  }
}
