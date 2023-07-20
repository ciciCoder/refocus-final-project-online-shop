import React, { SVGProps } from 'react'

interface ThreeDotsAnimatedProps extends SVGProps<SVGSVGElement> {
  circleProps?: JSX.IntrinsicElements['circle']
}
const ThreeDotsAnimated = React.forwardRef<
  SVGSVGElement,
  ThreeDotsAnimatedProps
>(({ circleProps, ...attrs }, ref) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 84 100"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
      width="100"
      height="100"
      {...attrs}
      ref={ref}
    >
      <circle
        className="animate-updown-threepoints fill-inherit"
        stroke="none"
        cx="21"
        cy="50"
        r="6"
        style={
          {
            '--updown-threepoints-offset': '15px',
            animationDelay: '0.1s',
          } as React.CSSProperties
        }
      ></circle>
      <circle
        className="animate-updown-threepoints fill-inherit"
        stroke="none"
        cx="42"
        cy="50"
        r="6"
        style={
          {
            '--updown-threepoints-offset': '10px',
            animationDelay: '0.2s',
          } as React.CSSProperties
        }
      ></circle>
      <circle
        className="animate-updown-threepoints fill-inherit"
        stroke="none"
        cx="63"
        cy="50"
        r="6"
        style={
          {
            '--updown-threepoints-offset': '5px',
            animationDelay: '0.3s',
          } as React.CSSProperties
        }
      ></circle>
    </svg>
  )
})

ThreeDotsAnimated.displayName = 'three-dots-animated'

export default ThreeDotsAnimated
