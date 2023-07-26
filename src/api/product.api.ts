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
  category?: string
  brand?: string
}

export const fetchProducts = async ({
  limit = '6',
  category,
  brand,
}: FetchProductsProps) => {
  const url = (() => {
    if (brand) return 'https://dummyjson.com/products/search'
    if (category) return `https://dummyjson.com/products/category/${category}`
    return 'https://dummyjson.com/products'
  })()
  const { data } = await axios.get<FetchResults>(url, {
    params: { limit, q: brand },
  })
  if (!data) throw new Error('error fetching data')

  return data
}

export const fetchOneProduct = async ({ productId }: { productId: string }) => {
  const { data } = await axios.get<Product>(
    `https://dummyjson.com/products/${productId}`,
  )
  if (!data) throw new Error('error fetching one data')
  return data
}

export type ProductCategories = string[]

export const fetchAllProductCategories = async () => {
  const { data } = await axios.get<ProductCategories>(
    'https://dummyjson.com/products/categories',
  )
  if (!data) throw new Error('error fetching all product categories')
  return data
}

interface FetchAllBrandsResult extends Omit<FetchResults, 'products'> {
  products: {
    brand: Product['brand']
  }[]
}

export const fetchAllBrands = async () => {
  const { data } = await axios.get<FetchAllBrandsResult>(
    'https://dummyjson.com/products?limit=100&select=brand',
  )
  const brands = data.products.map((product) => product.brand)
  const uniqueBrands = new Set(brands)
  return Array.from(uniqueBrands)
}
