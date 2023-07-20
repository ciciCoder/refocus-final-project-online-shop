'use client'

import { cx } from '@/lib/util'
import Image from 'next/image'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import ShoppingCart from '../icons/shopping-cart'
import ChevronDown from '../icons/chevron-down'

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
export default function Header({ className, ...attrs }: HeaderProps) {
  return (
    <header
      className={cx(
        'flex h-[84px] w-full items-center bg-midnight-blue',
        className,
      )}
      {...attrs}
    >
      <div className="m-auto flex w-[1200px] items-center justify-between">
        <Image src="/Logo.svg" width={140} alt="logo" height={20} />
        <div className="flex h-[48px] w-[247px] items-center gap-10">
          <button className="btn btn-pill border border-solid border-royal-blue bg-transparent text-royal-blue hover:opacity-50 active:opacity-100">
            Sign in
          </button>
          <ShoppingCart width={24} height={24} className="fill-slate-blue" />
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
