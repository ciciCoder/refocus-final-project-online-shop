'use client'

import { useAppDispatch } from '@/hooks'
import { initCart } from '@/redux/cart.slice'
import { useEffect } from 'react'
import Header from './core/Header'
import Footer from './core/Footer'
import { Rates } from '@/api/currency.api'

interface ClientGuestLayoutProps {
  children: React.ReactNode
  rates: Rates
}
export default function ClientGuestLayout({
  children,
  rates,
}: ClientGuestLayoutProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initCart())
  }, [])

  return (
    <div className="min-h-[100vh]">
      <Header rates={rates} />
      <main className="min-h-main py-[60px]">
        <div className="m-auto w-app-max">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
