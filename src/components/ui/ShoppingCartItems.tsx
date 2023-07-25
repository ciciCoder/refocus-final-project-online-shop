'use client'

import { cn } from '@/lib/utils'
import ShoppingCart, { ShoppingCartProps } from '../icons/ShoppingCart'

interface ShoppingCartItemsProps extends ShoppingCartProps {
  count: number
  chipClassName?: string
}
export default function ShoppingCartItems({
  count,
  chipClassName,
  className,
  ...props
}: ShoppingCartItemsProps) {
  return (
    <div className="relative">
      <ShoppingCart
        width={24}
        height={24}
        className={cn('fill-slate-blue', className)}
        {...props}
      />
      {!!count && (
        <div
          className={cn(
            'absolute right-0 top-0 flex h-2.5 w-2.5 items-center justify-center overflow-hidden rounded-full bg-white text-center text-[6px] font-semibold not-italic leading-[100%] tracking-[-0.06px]',
            chipClassName,
          )}
        >
          {count}
        </div>
      )}
    </div>
  )
}
