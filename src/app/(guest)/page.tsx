import { fetchProducts } from '@/api/product.api'
import dynamic from 'next/dynamic'

const ProductIndex = dynamic(() => import('@/components/ProductIndex'), {
  ssr: false,
})

interface HomeProps {
  searchParams: {
    limit: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const { products, limit, total } = await fetchProducts(searchParams)
  return (
    <div>
      <ProductIndex limit={limit} total={total} products={products} />
    </div>
  )
}
