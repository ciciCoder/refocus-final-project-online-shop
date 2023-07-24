'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useMemo } from 'react'
import ShoppingCart from '../icons/ShoppingCart'
import ChevronDown from '../icons/ChevronDown'
import { useAppSelector } from '@/hooks'
import { Rates } from '@/api/currency.api'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import { useDispatch } from 'react-redux'
import { setCurrency } from '@/redux/currency.slice'
import Link from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'
import UserIcon from '../icons/UserIcon'
import Cookies from 'js-cookie'

export function HeaderCurrenyPopover({
  rates,
  children,
}: {
  rates: Rates
  children?: React.ReactNode
}) {
  const [currency] = useAppSelector((state) => state.currency)
  const dispatch = useDispatch()

  const currencyTypes = useMemo(
    () => Object.keys(rates) as Array<keyof Rates>,
    [rates],
  )

  const setCurrencyHandler = (key: keyof Rates) => () => {
    dispatch(setCurrency([key, rates[key]]))
  }
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden border border-solid border-light-gray p-0">
        <ul className="list-none">
          {currencyTypes.map((key) => {
            return (
              <li
                key={key}
                className={cn(
                  'h-full w-full cursor-pointer px-4 py-2 duration-500 hover:bg-royal-blue hover:text-white',
                  key === currency &&
                    'bg-royal-blue text-white hover:bg-opacity-50',
                )}
                onClick={setCurrencyHandler(key)}
              >
                {key}
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  rates: Rates
}
export default function Header({ rates, className, ...attrs }: HeaderProps) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const cart = useAppSelector((state) => state.cart)
  const [currency] = useAppSelector((state) => state.currency)
  const cartItems = cart.length

  return (
    <header
      className={cn(
        'flex h-header w-full items-center bg-midnight-blue',
        className,
      )}
      {...attrs}
    >
      <div className="m-auto flex w-app-max items-center justify-between">
        <Link href="/">
          <Image src="/Logo.svg" width={140} alt="logo" height={20} />
        </Link>
        <div className="flex h-[48px] items-center gap-10">
          {isAuthenticated ? (
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2.5">
                {user?.picture ? (
                  <div className="relative h-6 w-6 overflow-hidden rounded-full">
                    <Image src={user.picture} alt="" sizes="inherit" fill />
                  </div>
                ) : (
                  <UserIcon />
                )}

                <span className="text-base font-bold not-italic leading-[100%] tracking-[-0.16px] text-slate-blue">
                  {user?.name}
                </span>
              </div>
              <button
                className="btn btn-pill border border-solid border-royal-blue bg-transparent text-royal-blue hover:opacity-50 active:opacity-100"
                onClick={() => logout()}
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              className="btn btn-pill border border-solid border-royal-blue bg-transparent text-royal-blue hover:opacity-50 active:opacity-100"
              onClick={() => loginWithRedirect()}
            >
              Sign in
            </button>
          )}

          <div className="relative flex items-center">
            <Link href="/shopping-bag">
              <ShoppingCart
                width={24}
                height={24}
                className="fill-slate-blue"
              />
              {!!cartItems && (
                <div className="absolute right-0 top-0 flex h-2.5 w-2.5 items-center justify-center overflow-hidden rounded-full bg-white text-center text-[6px] font-semibold not-italic leading-[100%] tracking-[-0.06px]">
                  {cartItems}
                </div>
              )}
            </Link>
          </div>
          <HeaderCurrenyPopover rates={rates}>
            <div className="flex gap-[5px]">
              <span className="text-base font-bold not-italic leading-[100%] tracking-[-0.16px] text-slate-blue">
                {currency}
              </span>
              <ChevronDown
                className="stroke-royal-blue"
                width={12}
                height={12}
              />
            </div>
          </HeaderCurrenyPopover>
        </div>
      </div>
    </header>
  )
}
