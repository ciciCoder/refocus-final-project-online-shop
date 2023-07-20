import Image from 'next/image'
import { Inter } from 'next/font/google'
import ProductIndex from '@/components/ProductIndex'
import { fetchProducts } from '@/api/product.api'

const inter = Inter({ subsets: ['latin'] })

export const revalidate = 3600

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
