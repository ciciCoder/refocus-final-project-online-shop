'use client'

import { SVGProps } from 'react'

interface FacebookProps extends SVGProps<SVGSVGElement> {}
export default function Facebook(props: FacebookProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_6_273)">
        <circle cx="15" cy="15" r="15" className="fill-inherit" />
        <path
          d="M20.4063 18.7749L21.0589 14.6936H17.141V11.8363C17.141 10.6933 17.549 9.79501 19.3446 9.79501H21.2223V6.04057C20.1606 5.87714 19.0188 5.71484 17.9559 5.71484C14.6095 5.71484 12.2414 7.75611 12.2414 11.4294V14.6947H8.57031V18.7761H12.2414V29.1445C13.8575 29.471 15.5226 29.471 17.1388 29.1445V18.7783L20.4063 18.7749Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_273">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}