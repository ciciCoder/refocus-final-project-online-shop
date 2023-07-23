import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (
  amount: number,
  currencyCode: string,
  locale: string = 'en-US',
) => {
  // Check if the input is a valid number
  if (isNaN(amount)) {
    throw new Error('Invalid input. Please provide a valid amount.')
  }

  // Format the amount as currency based on the specified currency code and locale
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(amount)
}

export const calculateOriginalPrice = (
  price: number,
  discountPercentage: number,
) => {
  return price * (1 + discountPercentage / 100)
}
