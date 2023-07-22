import { fetchCurrencyRates } from '@/api/currency.api'
import ClientGuestLayout from '@/components/ClientGuestLayout'
import Footer from '@/components/core/Footer'
import Header from '@/components/core/Header'

interface GuestLayoutProps {
  children?: React.ReactNode
}

export const revalidate = 86400

export default async function GuestLayout({ children }: GuestLayoutProps) {
  const currencyRates = await fetchCurrencyRates()

  return <ClientGuestLayout rates={currencyRates}>{children}</ClientGuestLayout>
}
