'use client'
import { cn, formatCurrency } from '@/lib/utils'
import { Inter } from 'next/font/google'
import Star from '../icons/Star'
import House from '../icons/House'
import { ShoppingCart } from 'lucide-react'
import ThreeDotsAnimated from '../icons/ThreeDotsAnimated'
import Image from 'next/image'
import { ReactEventHandler, useRef } from 'react'
import { Product } from '@/api/product.api'
import { Tooltip } from '@radix-ui/react-tooltip'
import { TooltipContent, TooltipTrigger } from './Tooltip'

const inter = Inter({ subsets: ['latin'] })

interface ProductCardInfoProps {
  product: Pick<Product, 'description' | 'price' | 'discountPercentage'>
}

export function ProductCardInfo({ product }: ProductCardInfoProps) {
  const originalPrice = product.price * (1 + product.discountPercentage / 100)
  const formattedPrice = formatCurrency(product.price, 'USD')
  const formattedOriginalPrice = formatCurrency(originalPrice, 'USD')

  return (
    <div className="flex flex-col gap-[5px]">
      <div className="line-clamp-1 h-[26px]">
        <span className="text-ellipsis text-xl font-bold not-italic leading-[130%] tracking-[-0.4px] text-midnight-blue">
          {product.description}
        </span>
      </div>
      <div className="line-clamp-2 h-[40px]">
        <p className="overflow-hidden text-ellipsis text-xs font-normal not-italic leading-[130%] tracking-[-0.24px] text-[#625F87]">
          {product.description}
        </p>
      </div>
      <div className="flex h-[28px] items-center gap-[5px] ">
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
  product: Pick<Product, 'rating' | 'stock'>
}

function ProductCardAction({ product }: ProductCardActionProps) {
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
        <button className="btn box-border h-8 bg-royal-blue py-1 text-white duration-500 hover:bg-opacity-50">
          <ShoppingCart className="max-h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: Product
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
