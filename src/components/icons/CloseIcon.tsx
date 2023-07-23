'use client'

interface CloseIconProps {
  className?: string
  fill?: string
  stroke?: string
}
export default function CloseIcon({ className, stroke, fill }: CloseIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.4485 7.55142C16.9171 8.02005 16.9171 8.77985 16.4485 9.24848L13.6966 12.0003L16.4485 14.7522C16.9171 15.2208 16.9171 15.9806 16.4485 16.4492C15.9798 16.9179 15.2201 16.9179 14.7514 16.4492L11.9996 13.6974L9.24848 16.4485C8.77985 16.9171 8.02005 16.9171 7.55142 16.4485C7.08279 15.9798 7.08279 15.2201 7.55142 14.7514L10.3025 12.0003L7.55142 9.24925C7.08279 8.78062 7.08279 8.02082 7.55142 7.55219C8.02005 7.08356 8.77985 7.08356 9.24848 7.55219L11.9996 10.3033L14.7514 7.55142C15.2201 7.08279 15.9798 7.08279 16.4485 7.55142Z"
        className={fill ? `fill-${fill}` : 'fill-black'}
      />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="11.5"
        className={stroke ? `stroke-${stroke}` : 'stroke-black'}
      />
    </svg>
  )
}
