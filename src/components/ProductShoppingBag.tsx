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
    <div className="flex h-[90px] w-full items-center justify-between rounded-[10px] bg-ghost-white p-5 sm:h-[140px]">
      <div className="flex h-full w-[770px] items-center justify-between">
        <div className="flex w-full flex-row-reverse items-center justify-between sm:flex-row">
          <button onClick={onRemoveHandler}>
            <CloseIcon
              fill="royal-blue"
              stroke="royal-blue"
              className="mr-0 sm:mr-10"
            />
          </button>
          <div className="flex flex-wrap items-center gap-2.5 sm:w-full sm:gap-5">
            <div className="relative h-[53px] w-[53px] overflow-hidden rounded-[10px] border border-solid border-light-gray sm:h-[100px] sm:w-[140px]">
              <Image src={data.thumbnail} alt="" fill sizes="inherit" />
            </div>
            <div className="flex flex-col gap-2.5 sm:w-full sm:flex-row sm:justify-between sm:gap-0">
              <div className="flex flex-col gap-2.5">
                <h2 className="text-sm font-bold not-italic leading-[130%] tracking-[-0.4px] text-midnight-blue sm:text-xl">
                  {data.title}
                </h2>
                <div className="hidden gap-2.5 sm:flex">
                  <Chip text={data.brand} />
                  <Chip text={data.category} />
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-5">
                <button onClick={onIncrementHandler}>
                  <PlusVariant
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    background="rgb(var(--light-gray))"
                    foreground="rgb(var(--royal-blue))"
                  />
                </button>
                <span className="text-sm font-normal not-italic leading-[140%] tracking-[-0.4px] text-dark-midnight-blue sm:text-xl">
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
            <span className="text-sm font-semibold not-italic leading-[140%] tracking-[-0.4px] text-grape sm:hidden">
              {formattedAmount}
            </span>
          </div>
        </div>
      </div>
      <span className="hidden text-xl font-semibold not-italic leading-[140%] tracking-[-0.4px] text-dark-midnight-blue sm:block">
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
    <div className="flex flex-col gap-5 sm:gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold not-italic leading-[130%] text-[Arial] text-dark-midnight-blue sm:text-4xl">
          Shopping Bag
        </h1>
        <p className="text-sm font-normal not-italic leading-[130%] text-grape sm:text-base">
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
      <div className="flex w-full flex-col justify-between gap-2.5 sm:flex-row">
        <div className="flex gap-2.5 text-sm font-semibold not-italic leading-[140%] tracking-[-0.4px] text-dark-midnight-blue sm:text-xl">
          <span>Total:</span>
          <span>{formattedTotalAmount}</span>
        </div>
        <div className="flex flex-col-reverse items-center gap-2.5 sm:flex-row sm:gap-5">
          <Link
            href="/"
            className="btn w-full rounded-full border border-solid border-royal-blue bg-transparent text-royal-blue sm:w-auto"
          >
            Continue Shopping
          </Link>
          {isAuthenticated ? (
            <Link
              className="btn w-full rounded-full bg-royal-blue text-white hover:text-white sm:w-auto"
              href="/order-placed"
            >
              Place order
            </Link>
          ) : (
            <div className="flex w-full flex-col-reverse gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-5 ">
              <div className="btn w-full rounded-full bg-lavender-gray text-white hover:text-white sm:w-auto">
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
