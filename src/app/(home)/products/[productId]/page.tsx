import { fetchOneProduct } from '@/api/product.api'
import dynamic from 'next/dynamic'

interface SingleProductProps {
  params: { productId: string }
}

const ProductShow = dynamic(() => import('@/components/ProductShow'), {
  ssr: false,
})

export default async function SingleProduct({ params }: SingleProductProps) {
  const { productId } = params

  const data = await fetchOneProduct({ productId })

  return (
    <div>
      <ProductShow product={data} />
    </div>
  )
}
