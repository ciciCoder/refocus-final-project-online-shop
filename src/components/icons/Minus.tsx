'use client'

import { SVGProps } from 'react'

interface MinusProps extends SVGProps<SVGSVGElement> {}
export default function Minus(props: MinusProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2.5 6.375V5.625H9.5V6.375H2.5Z" className="fill-inherit" />
    </svg>
  )
}
