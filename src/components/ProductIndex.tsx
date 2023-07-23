'use client'

import { Product } from '@/api/product.api'
import ProductCard, { ProductListItem } from './ProductCard'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import ThreeDotsAnimated from './icons/ThreeDotsAnimated'
import { useAppSelector } from '@/hooks'

interface ProductIndexProps {
  products: Product[]
  limit: number
  total: number
}

export default function ProductIndex({
  products,
  total,
  limit,
}: ProductIndexProps) {
  const [loadingMore, setLoadingMore] = useState(false)
  const cart = useAppSelector((state) => state.cart)

  const cartMap = useMemo(
    () => new Map(cart.map((cartItem) => [cartItem.id, cartItem])),
    [cart],
  )

  const productList = useMemo(
    () =>
      products.map((product) => {
        const cart = cartMap.get(product.id)
        if (!cart) return product
        return { ...cart, stock: cart.stock - cart.quantity }
      }) as ProductListItem[],
    [products, cartMap],
  )
  const nextSearchParams = new URLSearchParams()
  nextSearchParams.set('limit', String(limit + 6))

  useEffect(() => {
    setLoadingMore(false)
  }, [products, setLoadingMore])

  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-[Arial] text-4xl font-bold not-italic leading-[130%] text-dark-midnight-blue">
        All Products
      </h2>
      <div className="grid grid-cols-3 gap-10">
        {productList.map((product) => (
          <ProductCard
            href={`/products/${product.id}`}
            key={product.id}
            product={product}
          />
        ))}
      </div>
      {total > limit && (
        <div className="flex justify-center">
          <Link
            className="btn btn-pill border border-solid border-royal-blue bg-royal-blue text-white duration-500 hover:bg-opacity-50"
            scroll={false}
            href={`/?${nextSearchParams}`}
            onClick={() => setLoadingMore(true)}
          >
            {loadingMore ? (
              <ThreeDotsAnimated fill="white" width={24} />
            ) : (
              'Load more'
            )}
          </Link>
        </div>
      )}
    </div>
  )
}
