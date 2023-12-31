'use client'

import { SVGProps } from 'react'

interface MinusVariantProps extends SVGProps<SVGSVGElement> {
  background?: string
  foreground?: string
}
export default function MinusVariant({
  background,
  foreground,
  ...props
}: MinusVariantProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="6" fill={background} />
      <path d="M5 12.75V11.25H19V12.75H5Z" fill={foreground} />
    </svg>
  )
}
