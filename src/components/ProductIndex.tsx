'use client'

import { Product, ProductCategories } from '@/api/product.api'
import ProductCard, { ProductListItem } from './ProductCard'
import Link from 'next/link'
import { useEffect, useMemo, useReducer, useState } from 'react'
import ThreeDotsAnimated from './icons/ThreeDotsAnimated'
import { useAppSelector } from '@/hooks'
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover'
import ChevronDown from './icons/ChevronDown'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

function PopoverBtn({
  children,
  btnText,
  className,
  loading,
}: {
  children?: React.ReactNode
  btnText?: React.ReactNode
  className?: string
  loading?: boolean
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <button className="btn rounded-full border border-solid border-royal-blue bg-transparent text-royal-blue duration-500 hover:opacity-70">
          {loading ? (
            <ThreeDotsAnimated className="fill-royal-blue" width={24} />
          ) : (
            <>
              <span>{btnText}</span>
              <ChevronDown className="stroke-royal-blue" />
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'max-h-[400px] w-auto overflow-hidden overflow-y-auto border border-solid border-light-gray p-0',
          className,
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

interface ProductIndexProps {
  products: Product[]
  productCategories: ProductCategories
  limit: number
  brands: string[]
  total: number
}

interface ButtonLoadingState {
  waitLoadMore: boolean
  waitFilterCategory: boolean
  waitFilterBrand: boolean
}

export default function ProductIndex({
  products,
  total,
  productCategories,
  limit,
  brands,
}: ProductIndexProps) {
  const [btnLoadingState, setBtnLoadingState] = useReducer(
    (
      prev: ButtonLoadingState,
      next: { [key in keyof ButtonLoadingState]?: boolean },
    ) => ({ ...prev, ...next }),
    { waitLoadMore: false, waitFilterCategory: false, waitFilterBrand: false },
  )
  const searchParams = useSearchParams()
  const router = useRouter()
  const cart = useAppSelector((state) => state.cart)
  const [currentBrand, setCurrentBrand] = useState(
    searchParams.get('brand') ?? '',
  )
  const [currentCategory, setCurrentCategory] = useState(
    searchParams.get('category'),
  )

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

  const nextSearchParams = new URLSearchParams(searchParams.toString())
  nextSearchParams.set('limit', String(limit + 6))

  const onFilterCategoryHandler = (category: string) => () => {
    const params = new URLSearchParams(nextSearchParams)
    setBtnLoadingState({ waitFilterCategory: true })
    params.set('category', category)
    if (category === currentCategory) params.delete('category')
    params.delete('limit')
    params.delete('brand')
    setCurrentCategory(params.get('category') ?? '')
    router.push(`/?${params}`)
  }

  const onFilterBrandHandler = (brand: string) => () => {
    const params = new URLSearchParams(nextSearchParams)
    setBtnLoadingState({ waitFilterBrand: true })
    params.set('brand', brand)
    if (brand === currentBrand) params.delete('brand')
    params.delete('limit')
    params.delete('category')
    setCurrentBrand(params.get('brand') ?? '')
    router.push(`/?${params}`)
  }

  useEffect(() => {
    setBtnLoadingState({
      waitLoadMore: false,
      waitFilterCategory: false,
      waitFilterBrand: false,
    })
  }, [products, setBtnLoadingState])

  return (
    <div className="flex flex-col gap-10">
      <div className="hidden justify-between sm:flex">
        <h2 className="font-[Arial] text-4xl font-bold not-italic leading-[130%] text-dark-midnight-blue">
          All Products
        </h2>
        <div className="flex gap-2.5">
          <PopoverBtn
            btnText="Brands"
            loading={btnLoadingState.waitFilterBrand}
          >
            <ul className="list-none">
              {brands.map((brand) => {
                return (
                  <li
                    key={brand}
                    className={cn(
                      'h-full w-full cursor-pointer px-4 py-2 duration-500 hover:bg-royal-blue hover:text-white',
                      currentBrand === brand &&
                        'bg-royal-blue text-white hover:bg-opacity-50',
                    )}
                    onClick={onFilterBrandHandler(brand)}
                  >
                    {brand}
                  </li>
                )
              })}
            </ul>
          </PopoverBtn>
          <PopoverBtn
            btnText="Categories"
            loading={btnLoadingState.waitFilterCategory}
          >
            <ul className="list-none">
              {productCategories.map((category) => {
                return (
                  <li
                    key={category}
                    className={cn(
                      'h-full w-full cursor-pointer px-4 py-2 duration-500 hover:bg-royal-blue hover:text-white',
                      currentCategory === category &&
                        'bg-royal-blue text-white hover:bg-opacity-50',
                    )}
                    onClick={onFilterCategoryHandler(category)}
                  >
                    {category}
                  </li>
                )
              })}
            </ul>
          </PopoverBtn>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
            className="btn btn-pill w-full border border-solid border-royal-blue bg-royal-blue text-white duration-500 hover:bg-opacity-50 sm:w-auto"
            scroll={false}
            href={`/?${nextSearchParams}`}
            onClick={() => setBtnLoadingState({ waitLoadMore: true })}
          >
            {btnLoadingState.waitLoadMore ? (
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
