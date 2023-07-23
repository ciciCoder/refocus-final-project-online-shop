'use client'

import { Product } from '@/api/product.api'
import Image from 'next/image'
import StartRating from './ui/StarRating'
import { calculateOriginalPrice, cn, formatCurrency } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Inter } from 'next/font/google'
import ShoppingCart from './icons/ShoppingCart'
import { MouseEventHandler, ReactEventHandler, useMemo } from 'react'
import {
  addToCart,
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
} from '@/redux/cart.slice'
import Plus from './icons/Plus'
import Minus from './icons/Minus'

type ProductShowProduct = Product & {
  quantity?: number
}

const inter = Inter({ subsets: ['latin'] })

function ProductShowImages({
  thumbnail,
  images,
}: {
  thumbnail: string
  images: string[]
}) {
  const showcaseImages = images.slice(0, 3)

  const onImageLoadHandler: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.classList.remove('opacity-0')
  }

  return (
    <div className="flex flex-col gap-[14px]">
      <div className="relative h-[320px] w-[500px] overflow-hidden rounded-[10px] border border-solid border-light-gray bg-[url(/image-placeholder.png)] bg-center bg-no-repeat">
        <Image
          src={thumbnail}
          className="opacity-0"
          onLoad={onImageLoadHandler}
          alt="thumbnail"
          fill
          sizes="inherit"
        />
      </div>
      <div className="flex w-[500px] justify-between">
        {showcaseImages.map((image) => (
          <div
            key={image}
            className="relative h-[140px] w-[140px] overflow-hidden rounded-[10px] border border-solid border-light-gray bg-[url(/image-placeholder.png)] bg-cover bg-center bg-no-repeat"
          >
            <Image
              onLoad={onImageLoadHandler}
              fill
              className="opacity-0 duration-500"
              src={image}
              sizes="inherit"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductShowDetails({ product }: { product: ProductShowProduct }) {
  const [currencyCode, currencyFactor] = useAppSelector(
    (state) => state.currency,
  )

  const dispatch = useAppDispatch()

  const originalPrice = calculateOriginalPrice(
    product.price,
    product.discountPercentage,
  )

  const formattedPrice = formatCurrency(
    product.price * currencyFactor,
    currencyCode,
  )

  const formattedOriginalPrice = formatCurrency(
    originalPrice * currencyFactor,
    currencyCode,
  )

  const onIncrementHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(incrementCartItem(product.id))
  }

  const onDecrementHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (product.quantity === 1) {
      dispatch(removeFromCart(product.id))
      return
    }
    dispatch(decrementCartItem(product.id))
  }

  const onAddToCartHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(addToCart({ ...product }))
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-4xl font-bold not-italic leading-[130%] text-dark-midnight-blue">
        {product.title}
      </h2>
      <p className="mt-2.5 text-base font-normal not-italic leading-[150%] tracking-[-0.16px] text-grape">
        {product.description}
      </p>
      <div className="mt-5 flex gap-1">
        <StartRating className="h-6 w-6" rating={product.rating} />
        <span className="text-center text-base font-normal not-italic leading-[150%] tracking-[-0.16px] text-slate-blue">
          {product.rating}
        </span>
      </div>
      <div className="mt-5 flex items-center gap-5 font-[Arial]">
        <span className="text-4xl font-bold not-italic leading-[130%]">
          {formattedPrice}
        </span>
        <span className="font-normal not-italic leading-[130%] tracking-[-0.16px] text-grape line-through">
          {formattedOriginalPrice}
        </span>
        <span
          className={cn(
            'flex h-8 items-center justify-center rounded-full bg-vibrant-orange px-2.5 text-base font-normal not-italic leading-[150%] tracking-[-0.32px] text-white',
            inter.className,
          )}
        >
          -{product.discountPercentage}%
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-2.5 font-normal not-italic text-grape">
        <div className="leading-[150%] tracking-[-0.16px]">
          In Stock: {product.stock}
        </div>
        <div className="leading-[150%] tracking-[-0.16px]">
          Brand: {product.brand}
        </div>
        <div className="leading-[150%] tracking-[-0.16px]">
          Category: {product.category}
        </div>
      </div>
      <div className="mt-10 flex">
        {!product.quantity ? (
          <button
            onClick={onAddToCartHandler}
            className="btn bg-royal-blue text-white duration-500 hover:bg-opacity-60 hover:text-white"
          >
            <span>Add to bag</span>
            <ShoppingCart className="h-6 w-6 fill-white" />
          </button>
        ) : (
          <div className="btn flex items-center gap-[5px] border border-solid border-royal-blue bg-transparent text-royal-blue active:bg-transparent active:text-royal-blue">
            <button onClick={onIncrementHandler}>
              <Plus className="h-6 w-6 fill-royal-blue" />
            </button>
            <span className="font-normal not-italic leading-[130%] text-royal-blue">
              {product.quantity}
            </span>
            <button onClick={onDecrementHandler}>
              <Minus className="h-6 w-6 fill-royal-blue" />
            </button>
            <ShoppingCart className="max-h-6 w-6 fill-royal-blue" />
          </div>
        )}
      </div>
    </div>
  )
}

interface ProductShowProps {
  product: Product
}

export default function ProductShow({ product }: ProductShowProps) {
  const cart = useAppSelector((state) => state.cart)

  const currentProduct = useMemo<ProductShowProduct>(() => {
    const result = cart.find((cartItem) => cartItem.id === product.id)
    if (!result) return product
    return result
  }, [cart, product])
  return (
    <div className="flex gap-10">
      <ProductShowImages
        thumbnail={product.thumbnail}
        images={product.images}
      />
      <ProductShowDetails product={currentProduct} />
    </div>
  )
}
