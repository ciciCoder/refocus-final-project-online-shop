'use client'

interface ChipProps {
  text: string
}
export default function Chip({ text }: ChipProps) {
  return (
    <div className="flex rounded-full border border-solid border-lavender-gray px-2.5 py-1">
      <span className="text-[10px] font-normal not-italic leading-[120%] tracking-[-0.1px]">
        {text}
      </span>
    </div>
  )
}
