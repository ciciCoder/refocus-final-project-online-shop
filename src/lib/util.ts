export const cx = (
  ...classNames: (string | boolean | undefined | null | number)[]
) => classNames.filter((className) => className).join(' ')

export const formatCurrency = (
  number: number,
  currencyCode: string,
  locale?: string,
) => {
  // Check if the input is a valid number
  if (isNaN(number)) {
    throw new Error('Invalid input. Please provide a valid number.')
  }

  // Default to the user's locale if not specified
  if (!locale) {
    locale = navigator.language || 'en-US'
  }

  // Format the number as currency based on the specified currency code and locale
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(number)
}
