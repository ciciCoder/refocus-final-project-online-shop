import dynamic from 'next/dynamic'

const OrderPlaced = dynamic(() => import('@/components/OrderPlaced'), {
  ssr: false,
})

export default function OrderPlacedPage() {
  return (
    <div>
      <OrderPlaced />
    </div>
  )
}
