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
    <div className="gap flex h-[140px] w-full items-center justify-between bg-ghost-white p-5">
      <div className="flex h-full w-[770px] items-center justify-between">
        <div className="flex items-center">
          <button onClick={onRemoveHandler}>
            <CloseIcon
              fill="royal-blue"
              stroke="royal-blue"
              className="mr-10"
            />
          </button>
          <div className="flex items-center gap-5">
            <div className="relative h-[100px] w-[140px] overflow-hidden rounded-[10px]">
              <Image src={data.thumbnail} alt="" fill sizes="inherit" />
            </div>
            <div className="flex flex-col gap-2.5">
              <h2 className="text-xl font-bold not-italic leading-[130%] tracking-[-0.4px] text-midnight-blue">
                {data.title}
              </h2>
              <div className="flex gap-2.5">
                <Chip text={data.brand} />
                <Chip text={data.category} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={onIncrementHandler}>
            <PlusVariant
              background="rgb(var(--light-gray))"
              foreground="rgb(var(--royal-blue))"
            />
          </button>
          <span className="text-xl font-normal not-italic leading-[140%] tracking-[-0.4px] text-dark-midnight-blue">
            {data.quantity}
          </span>
          <button onClick={onDecrementHandler}>
            <MinusVariant
              background="rgb(var(--light-gray))"
              foreground="rgb(var(--royal-blue))"
            />
          </button>
        </div>
      </div>

      <span className="text-xl font-semibold not-italic leading-[140%] tracking-[-0.4px] text-dark-midnight-blue">
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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold not-italic leading-[130%] text-[Arial] text-dark-midnight-blue">
          Shopping Bag
        </h1>
        <p className="text-base font-normal not-italic leading-[130%] text-grape">
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
      <div className="flex w-full justify-between">
        <div className="flex gap-2.5 text-xl font-semibold not-italic leading-[140%] tracking-[-0.4px] text-dark-midnight-blue">
          <span>Total:</span>
          <span>{formattedTotalAmount}</span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="btn rounded-full border border-solid border-royal-blue bg-transparent text-royal-blue"
          >
            Continue Shopping
          </Link>
          {isAuthenticated ? (
            <Link
              className="btn rounded-full bg-royal-blue text-white hover:text-white"
              href="/order-placed"
            >
              Place order
            </Link>
          ) : (
            <div className="flex items-center gap-5">
              <div className="btn rounded-full bg-lavender-gray text-white hover:text-white">
                Place order
              </div>
              <div className="text-sm font-normal not-italic leading-[130%] tracking-[-0.42px] text-grape">
                To place an order,{' '}
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
