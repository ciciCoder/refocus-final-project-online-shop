'use client'

import { SVGProps } from 'react'

interface ChevronDownProps extends SVGProps<SVGSVGElement> {}
export default function ChevronDown(props: ChevronDownProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 5.24219L6.24264 9.48483L10.4853 5.24219"
        className="stroke-inherit"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
