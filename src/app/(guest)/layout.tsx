import { fetchCurrencyRates } from '@/api/currency.api'
import Footer from '@/components/core/Footer'
import dynamic from 'next/dynamic'

interface GuestLayoutProps {
  children?: React.ReactNode
}

const Header = dynamic(() => import('@/components/core/Header'), { ssr: false })

export const revalidate = 86400

export default async function GuestLayout({ children }: GuestLayoutProps) {
  const currencyRates = await fetchCurrencyRates()

  return (
    <div className="min-h-[100vh]">
      <div className="h-header bg-midnight-blue">
        <Header rates={currencyRates} />
      </div>
      <main className="relative min-h-main py-[60px]">
        <div className="m-auto w-app-max">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
