'use client'
import { cx } from '@/lib/util'
import { Inter } from 'next/font/google'
import Star from '../icons/Star'
import House from '../icons/house'
import { ShoppingCart } from 'lucide-react'
import ThreeDotsAnimated from '../icons/three-dots-animated'
import Image from 'next/image'
import { ReactEventHandler, useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export function ProductCardInfo() {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="line-clamp-1 h-[26px]">
        <span className="text-ellipsis text-xl font-bold not-italic leading-[130%] tracking-[-0.4px] text-midnight-blue">
          iPhone 9
        </span>
      </div>
      <div className="line-clamp-2 h-[40px]">
        <p className="overflow-hidden text-ellipsis text-xs font-normal not-italic leading-[130%] tracking-[-0.24px] text-[#625F87]">
          An apple mobile which is nothing like apple
        </p>
      </div>
      <div className="flex h-[28px] items-center gap-[5px] ">
        <span className="text-xl font-semibold not-italic leading-[140%] tracking-[-0.4px]">
          $549.00
        </span>
        <span className="text-xs font-normal not-italic leading-[130%] tracking-[-0.24px] text-slate-blue line-through">
          $630
        </span>
        <span className="flex items-start gap-2.5 rounded-[20px] bg-vibrant-orange px-2.5 py-1 text-white">
          -12.96%
        </span>
      </div>
    </div>
  )
}

function ProductCardAction() {
  return (
    <div className="flex h-[32px] w-full items-center justify-between text-slate-blue">
      <div className="flex items-center gap-2.5">
        <div className="flex gap-1">
          <div className="flex">
            {[1, 1, 1, 1, 0.69].map((rate, index) => (
              <Star
                key={index}
                className={cx(
                  'h-[12px] w-[12px] stroke-lime-green duration-1000',
                  rate === 1 ? 'fill-lime-green' : 'fill-none',
                )}
                fill="transparent"
                shade={rate !== 1}
                shadeOffset={rate * 100}
                shadeColor="rgb(var(--lime-green))"
              />
            ))}
          </div>
          <span className="leading-[120%] tracking-[-0.1px] [font-size:10px]">
            4.69
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <House className="fill-slate-blue" />
          <span className="text-[9px] font-normal not-italic leading-[130%] tracking-[-0.27px]">
            96
          </span>
        </div>
      </div>
      <span>&middot;</span>
      <div>
        <button className="btn box-border h-8 bg-royal-blue py-1 text-white duration-500 hover:opacity-50">
          <ShoppingCart className="max-h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

interface ProductCardProps {}
export default function ProductCard({}: ProductCardProps) {
  const imgLoaderRef = useRef<SVGSVGElement>(null)

  const onImageLoadHandler: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.classList.remove('opacity-0')
    imgLoaderRef.current?.classList.add('hidden')
  }
  return (
    <div className={cx('card', inter.className)}>
      <div className="card-img">
        <ThreeDotsAnimated ref={imgLoaderRef} fill="white" />
        <Image
          src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          className="opacity-0 duration-500"
          onLoad={onImageLoadHandler}
        />
      </div>
      <div className="card-content">
        <div className="flex h-full w-full flex-col gap-[10px]">
          <ProductCardInfo />
          <div className="w-full border-t border-t-slate-blue"></div>
          <ProductCardAction />
        </div>
      </div>
    </div>
  )
}
