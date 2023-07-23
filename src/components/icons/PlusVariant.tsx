'use client'

interface PlusVariantProps {
  background?: string
  foreground?: string
}
export default function PlusVariant({
  background,
  foreground,
}: PlusVariantProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="6" fill={background} />
      <path
        d="M11.25 19V12.75H5V11.25H11.25V5H12.75V11.25H19V12.75H12.75V19H11.25Z"
        fill={foreground}
      />
    </svg>
  )
}
