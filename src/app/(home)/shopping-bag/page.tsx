'use client'

import dynamic from 'next/dynamic'

// import ProductShoppingBag from '@/components/ProductShoppingBag'

const ProductShoppingBag = dynamic(
  () => import('@/components/ProductShoppingBag'),
  { ssr: false },
)

export default function ShoppingBag() {
  return (
    <div>
      <ProductShoppingBag />
    </div>
  )
}
