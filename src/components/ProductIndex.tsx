'use client'

import { Product } from '@/api/product.api'
import ProductCard from './ui/ProductCard'

interface ProductIndexProps {
  products: Product[]
  limit: number
}

export default function ProductIndex({ products, limit }: ProductIndexProps) {
  return (
    <div className="grid grid-cols-3 gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
