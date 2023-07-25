import { fetchCurrencyRates } from '@/api/currency.api'
import Footer from '@/components/core/Footer'
import HeaderExt from '@/components/core/HeaderExt'
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
      <div className="sticky top-0 z-50 flex flex-col bg-white sm:relative">
        <Header rates={currencyRates} />
        <HeaderExt />
      </div>
      <main className="relative min-h-main-xs pb-[60px] pt-0 sm:min-h-main sm:pt-[60px]">
        <div className="m-auto w-app-max-xs sm:w-app-max-sm lg:w-app-max">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
