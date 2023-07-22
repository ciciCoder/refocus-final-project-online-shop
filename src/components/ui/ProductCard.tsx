'use client'
import { cn, formatCurrency } from '@/lib/utils'
import { Inter } from 'next/font/google'
import Star from '../icons/Star'
import House from '../icons/House'
import ThreeDotsAnimated from '../icons/ThreeDotsAnimated'
import Image from 'next/image'
import { ReactEventHandler, useRef } from 'react'
import { Product } from '@/api/product.api'
import {
  CartItem,
  addToCart,
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
} from '@/redux/cart.slice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Plus from '../icons/Plus'
import Minus from '../icons/Minus'
import ShoppingCart from '../icons/ShoppingCart'

const inter = Inter({ subsets: ['latin'] })

export interface ProductListItem extends Product {
  quantity?: CartItem['quantity']
}

interface ProductCardInfoProps {
  product: Pick<
    ProductListItem,
    'description' | 'price' | 'discountPercentage' | 'title'
  >
}

export function ProductCardInfo({ product }: ProductCardInfoProps) {
  const [currency, currencyFactor] = useAppSelector((state) => state.currency)
  const originalPrice = product.price * (1 + product.discountPercentage / 100)
  const formattedPrice = formatCurrency(
    product.price * currencyFactor,
    currency,
  )
  const formattedOriginalPrice = formatCurrency(
    originalPrice * currencyFactor,
    currency,
  )

  return (
    <div className="flex flex-col gap-[5px]">
      <div className="line-clamp-1 h-[26px]">
        <span className="text-ellipsis text-xl font-bold not-italic leading-[130%] tracking-[-0.4px] text-midnight-blue">
          {product.title}
        </span>
      </div>
      <div className="tooltip h-[40px] ">
        <p className="line-clamp-2 text-ellipsis text-xs font-normal not-italic leading-[130%] tracking-[-0.24px] text-[#625F87]">
          {product.description}
        </p>
        <p className="tooltiptext tooltip-top line-clamp-none min-w-[400px!important] px-3 py-2">
          {product.description}
        </p>
      </div>
      <div className="flex min-h-[28px] flex-wrap items-center gap-[5px] ">
        <span className="text-xl font-semibold not-italic leading-[140%] tracking-[-0.4px]">
          {formattedPrice}
        </span>
        <span className="text-xs font-normal not-italic leading-[130%] tracking-[-0.24px] text-slate-blue line-through">
          {formattedOriginalPrice}
        </span>
        {product.discountPercentage && (
          <span className="flex items-start gap-2.5 rounded-[20px] bg-vibrant-orange px-2.5 py-1 text-white">
            -{product.discountPercentage}%
          </span>
        )}
      </div>
    </div>
  )
}

interface ProductCardActionProps {
  product: ProductListItem
}

function ProductCardAction({ product }: ProductCardActionProps) {
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)
  const starValues = (() => {
    let ratingRemaining = product.rating + 1
    return new Array(5).fill(0).map((item, index) => {
      ratingRemaining--
      if (ratingRemaining < 1 && ratingRemaining > 0)
        return Number(ratingRemaining.toFixed(2))
      if (ratingRemaining >= 1) return 1
      return 0
    })
  })()

  const getStar = (rate: number, key: number) => {
    if (rate > 0.8)
      return (
        <Star
          key={key}
          className="h-[12px] w-[12px] fill-lime-green stroke-lime-green duration-1000"
        />
      )
    if (rate > 0.25)
      return (
        <Star
          key={key}
          className="h-[12px] w-[12px] fill-none stroke-lime-green duration-1000"
          fill="transparent"
          shade={true}
          shadeOffset={50}
          shadeColor="rgb(var(--lime-green))"
        />
      )
    return (
      <Star
        key={key}
        className="h-[12px] w-[12px] fill-none stroke-lime-green duration-1000"
      />
    )
  }

  const onIncrementHandler = () => {
    dispatch(incrementCartItem(product.id))
  }

  const onDecrementHandler = () => {
    if (product.quantity === 1) {
      dispatch(removeFromCart(product.id))
      return
    }
    dispatch(decrementCartItem(product.id))
  }

  const onAddToCartHandler = () => {
    dispatch(addToCart({ ...product }))
  }

  return (
    <div className="flex h-[32px] w-full items-center justify-between text-slate-blue">
      <div className="flex items-center gap-2.5">
        <div className="flex gap-1">
          <div className="flex">{starValues.map(getStar)}</div>
          <span className="leading-[120%] tracking-[-0.1px] [font-size:10px]">
            {product.rating}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <House className="fill-slate-blue" />
          <span className="text-[9px] font-normal not-italic leading-[130%] tracking-[-0.27px]">
            {product.stock}
          </span>
        </div>
      </div>
      <span>&middot;</span>
      <div>
        {!product.quantity ? (
          <button
            onClick={onAddToCartHandler}
            className="btn box-border h-8 gap-[5px] bg-royal-blue py-1 text-white duration-500 hover:bg-opacity-50"
          >
            <ShoppingCart className="max-h-6 w-6 fill-white" />
          </button>
        ) : (
          <div className="btn flex h-8 items-center gap-[5px] border border-solid border-royal-blue bg-transparent text-royal-blue active:bg-transparent active:text-royal-blue">
            <button onClick={onIncrementHandler}>
              <Plus className="fill-royal-blue" />
            </button>
            <span>{product.quantity}</span>
            <button onClick={onDecrementHandler}>
              <Minus className="fill-royal-blue" />
            </button>
            <ShoppingCart className="max-h-6 w-6 fill-royal-blue" />
          </div>
        )}
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: ProductListItem
}
export default function ProductCard({ product }: ProductCardProps) {
  const imgLoaderRef = useRef<SVGSVGElement>(null)

  const onImageLoadHandler: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.classList.remove('opacity-0')
    imgLoaderRef.current?.classList.add('hidden')
  }
  return (
    <div className={cn('card', inter.className)}>
      <div className="card-img">
        <ThreeDotsAnimated ref={imgLoaderRef} fill="white" />
        <Image
          src={product.thumbnail}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          className="opacity-0 duration-500"
          onLoad={onImageLoadHandler}
        />
      </div>
      <div className="card-content">
        <div className="flex h-full w-full flex-col gap-[10px]">
          <ProductCardInfo product={product} />
          <div className="w-full border-t border-t-slate-blue"></div>
          <ProductCardAction product={product} />
        </div>
      </div>
    </div>
  )
}
