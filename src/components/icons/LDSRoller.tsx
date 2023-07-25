'use client'
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react'
import './LDSRoller.css'
import { cn } from '@/lib/utils'

interface LDSRollerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  circleColor?: string
}
export default function LDSRoller({
  className,
  circleColor,
  style,
  ...props
}: LDSRollerProps) {
  const styleObject = {
    '--circle-color': circleColor,
    ...style,
  } as CSSProperties
  return (
    <div
      className={cn('LDS__Roller', className)}
      style={styleObject}
      {...props}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
