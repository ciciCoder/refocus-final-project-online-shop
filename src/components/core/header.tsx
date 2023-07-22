'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import ShoppingCart from '../icons/ShoppingCart'
import ChevronDown from '../icons/ChevronDown'
import { useAppSelector } from '@/hooks'

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
export default function Header({ className, ...attrs }: HeaderProps) {
  const cart = useAppSelector((state) => state.cart)
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
        <Image src="/Logo.svg" width={140} alt="logo" height={20} />
        <div className="flex h-[48px] items-center gap-10">
          <button className="btn btn-pill border border-solid border-royal-blue bg-transparent text-royal-blue hover:opacity-50 active:opacity-100">
            Sign in
          </button>
          <div className="relative flex items-center">
            <ShoppingCart width={24} height={24} className="fill-slate-blue" />
            {!!cartItems && (
              <div className="absolute right-0 top-0 flex h-2.5 w-2.5 items-center justify-center overflow-hidden rounded-full bg-white text-center text-[6px] font-semibold not-italic leading-[100%] tracking-[-0.06px]">
                {cartItems}
              </div>
            )}
          </div>
          <div className="flex gap-[5px]">
            <span className="text-base font-bold not-italic leading-[100%] tracking-[-0.16px] text-slate-blue">
              USD
            </span>
            <span>
              <ChevronDown
                className="stroke-royal-blue"
                width={12}
                height={12}
              />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
