'use client'

import { SVGProps } from 'react'

interface YoutubeProps extends SVGProps<SVGSVGElement> {}
export default function Youtube(props: YoutubeProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="15" cy="15" r="15" className="fill-inherit" />
      <path d="M21 15L11 9V21L21 15Z" fill="white" />
    </svg>
  )
}
