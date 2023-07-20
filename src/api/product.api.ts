import axios from 'axios'

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface FetchResults {
  products: Product[]
  total: number
  skip: number
  limit: number
}

interface FetchProductsProps {
  limit: string
}

export const fetchProducts = async ({ limit = '6' }: FetchProductsProps) => {
  const { data } = await axios.get<FetchResults>(
    'https://dummyjson.com/products',
    { params: { limit } },
  )
  if (!data) throw new Error('error fetching data')

  return data
}
