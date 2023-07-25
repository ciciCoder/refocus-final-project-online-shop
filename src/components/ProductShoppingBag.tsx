'use client'

import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  CartItem,
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
} from '@/redux/cart.slice'
import CloseIcon from './icons/CloseIcon'
import Image from 'next/image'
import Chip from './icons/Chip'
import PlusVariant from './icons/PlusVariant'
import MinusVariant from './icons/MinusVariant'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { useMemo } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export function ProductShoppingBagItem({ data }: { data: CartItem }) {
  const [currencyCode, currencyFactor] = useAppSelector(
    (state) => state.currency,
  )
  const dispatch = useAppDispatch()
  const amount = data.price * data.quantity

  const formattedAmount = formatCurrency(amount * currencyFactor, currencyCode)

  const onIncrementHandler = () => {
    dispatch(incrementCartItem(data.id))
  }

  const onDecrementHandler = () => {
    if (data.quantity === 1) {
      dispatch(removeFromCart(data.id))
      return
    }
    dispatch(decrementCartItem(data.id))
  }

  const onRemoveHandler = () => {
    dispatch(removeFromCart(data.id))
  }
  return (
    <div className="flex h-[90px] w-full items-center justify-between rounded-[10px] bg-ghost-white p-5 lg:h-[140px]">
      <div className="flex h-full w-[770px] items-center justify-between">
        <div className="flex w-full flex-row-reverse items-center gap-2.5 lg:flex-row">
          <button onClick={onRemoveHandler}>
            <CloseIcon
              fill="royal-blue"
              stroke="royal-blue"
              className="mr-0 lg:mr-10"
            />
          </button>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-wrap items-center gap-2.5 lg:w-full lg:flex-nowrap lg:gap-5">
              <div className="relative h-[53px] w-[53px] overflow-hidden rounded-[10px] border border-solid border-light-gray lg:h-[100px] lg:w-[140px]">
                <Image src={data.thumbnail} alt="" fill sizes="inherit" />
              </div>
              <div className="flex flex-col justify-between gap-2.5 lg:w-full lg:flex-row lg:gap-0">
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-sm font-bold not-italic leading-[130%] tracking-[-0.4px] text-midnight-blue lg:text-xl">
                    {data.title}
                  </h2>
                  <div className="hidden gap-2.5 lg:flex">
                    <Chip text={data.brand} />
                    <Chip text={data.category} />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 lg:gap-5">
                  <button onClick={onIncrementHandler}>
                    <PlusVariant
                      className="h-5 w-5 lg:h-6 lg:w-6"
                      background="rgb(var(--light-gray))"
                      foreground="rgb(var(--royal-blue))"
                    />
                  </button>
                  <span className="text-sm font-normal not-italic leading-[140%] tracking-[-0.4px] text-dark-midnight-blue lg:text-xl">
                    {data.quantity}
                  </span>
                  <button onClick={onDecrementHandler}>
                    <MinusVariant
                      width={20}
                      height={20}
                      background="rgb(var(--light-gray))"
                      foreground="rgb(var(--royal-blue))"
                    />
                  </button>
                </div>
              </div>
            </div>
            <span className="text-sm font-semibold not-italic leading-[140%] tracking-[-0.4px] text-grape lg:hidden">
              {formattedAmount}
            </span>
          </div>
        </div>
      </div>
      <span className="hidden text-xl font-semibold not-italic leading-[140%] tracking-[-0.4px] text-dark-midnight-blue lg:block">
        {formattedAmount}
      </span>
    </div>
  )
}

interface ProductShoppingBagProps {}

export default function ProductShoppingBag({}: ProductShoppingBagProps) {
  const cart = useAppSelector((state) => state.cart)
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const [currencyCode, currencyFactor] = useAppSelector(
    (state) => state.currency,
  )

  const totalAmount = useMemo(
    () =>
      cart.reduce((total, { price, quantity }) => total + price * quantity, 0),
    [cart],
  )

  const formattedTotalAmount = formatCurrency(
    totalAmount * currencyFactor,
    currencyCode,
  )

  return (
    <div className="flex flex-col gap-5 lg:gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold not-italic leading-[130%] text-[Arial] text-dark-midnight-blue lg:text-4xl">
          Shopping Bag
        </h1>
        <p className="text-sm font-normal not-italic leading-[130%] text-grape lg:text-base">
          {cart.length} items in the shopping bag
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {!!cart.length ? (
          cart.map((cartItem) => (
            <ProductShoppingBagItem key={cartItem.id} data={cartItem} />
          ))
        ) : (
          <h2 className="text-4xl font-bold not-italic leading-[130%] text-[Arial] text-dark-midnight-blue">
            Empty...
          </h2>
        )}
      </div>
      <div className="flex w-full flex-col justify-between gap-2.5 lg:flex-row">
        <div className="flex gap-2.5 text-sm font-semibold not-italic leading-[140%] tracking-[-0.4px] text-dark-midnight-blue lg:text-xl">
          <span>Total:</span>
          <span>{formattedTotalAmount}</span>
        </div>
        <div className="flex flex-col-reverse items-center gap-2.5 lg:flex-row lg:gap-5">
          <Link
            href="/"
            className="btn w-full rounded-full border border-solid border-royal-blue bg-transparent text-royal-blue lg:w-auto"
          >
            Continue Shopping
          </Link>
          {isAuthenticated ? (
            <Link
              className="btn w-full rounded-full bg-royal-blue text-white hover:text-white lg:w-auto"
              href="/order-placed"
            >
              Place order
            </Link>
          ) : (
            <div className="flex w-full flex-col-reverse gap-2.5 lg:w-auto lg:flex-row lg:items-center lg:gap-5 ">
              <div className="btn w-full rounded-full bg-lavender-gray text-white hover:text-white lg:w-auto">
                Place order
              </div>
              <div className="text-sm font-normal not-italic leading-[130%] tracking-[-0.42px] text-grape ">
                <span>To place an order, </span>
                <button
                  className="text-royal-blue underline"
                  onClick={() => loginWithRedirect()}
                >
                  sign in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
