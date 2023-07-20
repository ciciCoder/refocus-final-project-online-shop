'use client'

import { SVGProps } from 'react'

interface StarProps extends SVGProps<SVGSVGElement> {
  shade?: boolean
  shadeColor?: string
  shadeOffset?: number
}

export default function Star({
  shadeOffset = 0,
  shade,
  shadeColor,
  fill,
  ...attrs
}: StarProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill={shade ? 'none' : fill}
      {...attrs}
    >
      {shade && (
        <defs>
          <linearGradient id="shadeGradient">
            <stop
              offset={`${shadeOffset}%`}
              style={{ stopColor: shadeColor }}
            />
            <stop offset="0" style={{ stopColor: fill }} />
          </linearGradient>
        </defs>
      )}
      <path
        d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z"
        className={!shade ? 'fill-inherit' : 'fill-[url(#shadeGradient)]'}
      />
    </svg>
  )
}
