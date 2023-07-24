'use client'

import LDSRoller from '@/components/icons/LDSRoller'
import { CSSProperties } from 'react'

interface GuestRootLoadingProps {
  propName: string
}
export default function GuestRootLoading({}: GuestRootLoadingProps) {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <LDSRoller className="scale-[3]" circleColor="rgb(var(--slate-blue))" />
    </div>
  )
}
