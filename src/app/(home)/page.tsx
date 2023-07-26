import {
  fetchAllBrands,
  fetchAllProductCategories,
  fetchProducts,
} from '@/api/product.api'
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
  const [productData, productCategories, brands] = await Promise.all([
    fetchProducts(searchParams),
    fetchAllProductCategories(),
    fetchAllBrands(),
  ])
  return (
    <div>
      <ProductIndex
        {...productData}
        productCategories={productCategories}
        brands={brands}
      />
    </div>
  )
}
