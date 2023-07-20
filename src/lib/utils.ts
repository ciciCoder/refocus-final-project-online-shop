import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (
  number: number,
  currencyCode: string,
  locale: string = 'en-US',
) => {
  // Check if the input is a valid number
  if (isNaN(number)) {
    throw new Error('Invalid input. Please provide a valid number.')
  }

  // Format the number as currency based on the specified currency code and locale
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(number)
}
