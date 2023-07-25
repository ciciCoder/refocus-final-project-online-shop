'use client'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { CartItem, clearCart } from '@/redux/cart.slice'
import { useAuth0 } from '@auth0/auth0-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

function OrderPlacedCard({ data }: { data: CartItem }) {
  return (
    <div className="flex h-[80px] w-full items-center gap-5 rounded-[10px] bg-ghost-white p-2.5">
      <div className="relative h-[60px] w-[84px] overflow-hidden rounded-[10px] border border-solid border-light-gray">
        <Image src={data.thumbnail} sizes="inherit" fill alt="" />
      </div>
      <div className="justify-center-center flex flex-col gap-2.5">
        <h3 className="text-base font-bold not-italic leading-[130%] text-dark-midnight-blue">
          {data.title}
        </h3>
        <span className="text-xs font-normal not-italic leading-[130%] text-grape">
          {data.quantity} {data.quantity > 1 ? 'items' : 'item'}
        </span>
      </div>
    </div>
  )
}

function OrderPlacedDetails() {
  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const [cachedCart, setCachedCart] = useState<CartItem[]>([])
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated || !cart.length) {
      redirect('/')
    }
  }, [])

  useEffect(() => {
    if (cart.length) {
      setCachedCart([...cart])
      // dispatch(clearCart())
    }
  }, [cart, dispatch])

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold not-italic leading-[130%] text-[Arial] text-dark-midnight-blue sm:text-4xl">
          The order is placed
        </h1>
        <p className="w-full text-sm font-normal not-italic leading-[130%] text-grape sm:w-[510px] sm:text-xl">
          Thank you for ordering. We will ship it in 1–2 days and send you a
          follow-up email to track the delivery.
        </p>
      </div>
      <div className="flex w-full flex-col gap-2.5 sm:w-[500px]">
        {cachedCart.map((cartItem) => (
          <OrderPlacedCard key={cartItem.id} data={cartItem} />
        ))}
      </div>
      <div>
        <Link
          href="/"
          className="btn rounded-full border border-solid border-royal-blue bg-transparent text-royal-blue hover:bg-ghost-white active:text-royal-blue"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

interface OrderPlacedProps {}
export default function OrderPlaced({}: OrderPlacedProps) {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
      <OrderPlacedDetails />
      <div className="relative mt-5 h-[176px] w-[176px] sm:h-[360px] sm:w-[360px]">
        <Image
          fill
          alt=""
          src="/placed-order-image.svg"
          sizes="inherit"
          priority={true}
        />
      </div>
    </div>
  )
}
