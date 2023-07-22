'use client'

import { SVGProps } from 'react'

interface PlusProps extends SVGProps<SVGSVGElement> {}
export default function Plus(props: PlusProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M5.625 9.5V6.375H2.5V5.625H5.625V2.5H6.375V5.625H9.5V6.375H6.375V9.5H5.625Z"
        className="fill-inherit"
      />
    </svg>
  )
}
