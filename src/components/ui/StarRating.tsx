'use client'

import { cn } from '@/lib/utils'
import Star from '../icons/Star'

interface StartRatingProps {
  rating: number
  className?: string
}
export default function StartRating({ rating, className }: StartRatingProps) {
  const starValues = (() => {
    let ratingRemaining = rating + 1
    return new Array(5).fill(0).map(() => {
      ratingRemaining--
      if (ratingRemaining < 1 && ratingRemaining > 0)
        return Number(ratingRemaining.toFixed(2))
      if (ratingRemaining >= 1) return 1
      return 0
    })
  })()

  const getStar = (rate: number, key: number) => {
    if (rate > 0.8)
      return (
        <Star
          key={key}
          className={cn(
            'h-[12px] w-[12px] fill-lime-green stroke-lime-green duration-1000',
            className,
          )}
        />
      )
    if (rate > 0.25)
      return (
        <Star
          key={key}
          className={cn(
            'h-[12px] w-[12px] fill-lime-green stroke-lime-green duration-1000',
            className,
          )}
          fill="transparent"
          shade={true}
          shadeOffset={50}
          shadeColor="rgb(var(--lime-green))"
        />
      )
    return (
      <Star
        key={key}
        className={cn(
          'h-[12px] w-[12px] fill-lime-green stroke-lime-green duration-1000',
          className,
        )}
      />
    )
  }
  return <div className="flex">{starValues.map(getStar)}</div>
}
