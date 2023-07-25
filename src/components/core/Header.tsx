'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react'
import ChevronDown from '../icons/ChevronDown'
import { useAppSelector } from '@/hooks'
import { Rates } from '@/api/currency.api'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import { useDispatch } from 'react-redux'
import { setCurrency } from '@/redux/currency.slice'
import Link from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'
import UserIcon from '../icons/UserIcon'
import ShoppingCartItems from '../ui/ShoppingCartItems'
import join from 'join-path'

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
        'flex h-header-xs w-full bg-midnight-blue sm:h-header sm:items-center',
        className,
      )}
      {...attrs}
    >
      <div className="m-auto flex w-app-max-xs items-end justify-between sm:w-app-max-sm sm:items-center lg:w-app-max">
        <Link href="/">
          <Image
            src={join(process.env.NEXT_PUBLIC_BASE_PATH, '/Logo.svg')}
            width={140}
            alt="logo"
            height={20}
          />
        </Link>
        <div className="flex h-[48px] items-end gap-10 sm:items-center">
          {isAuthenticated ? (
            <div className="hidden items-center gap-5 sm:flex">
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
              className="btn btn-pill  hidden border border-solid border-royal-blue bg-transparent text-royal-blue hover:opacity-50 active:opacity-100 sm:flex"
              onClick={() => loginWithRedirect()}
            >
              Sign in
            </button>
          )}

          <div className="relative hidden items-center sm:flex">
            <Link href="/shopping-bag">
              <ShoppingCartItems count={cartItems} />
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
