'use client'

import { SVGProps } from 'react'

interface InstagramProps extends SVGProps<SVGSVGElement> {}
export default function Instagram(props: InstagramProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="30" height="30" rx="15" className="fill-inherit" />
      <path
        d="M12.0007 15C12.0007 13.3432 13.3435 11.9998 15.0004 11.9998C16.6572 11.9998 18.0007 13.3432 18.0007 15C18.0007 16.6568 16.6572 18.0002 15.0004 18.0002C13.3435 18.0002 12.0007 16.6568 12.0007 15ZM10.3788 15C10.3788 17.5524 12.4479 19.6214 15.0004 19.6214C17.5529 19.6214 19.6219 17.5524 19.6219 15C19.6219 12.4476 17.5529 10.3786 15.0004 10.3786C12.4479 10.3786 10.3789 12.4475 10.3789 15H10.3788ZM18.7249 10.1954C18.7248 10.409 18.7881 10.6178 18.9067 10.7955C19.0253 10.9731 19.194 11.1116 19.3912 11.1934C19.5886 11.2752 19.8057 11.2967 20.0152 11.2551C20.2248 11.2136 20.4173 11.1108 20.5684 10.9598C20.7195 10.8088 20.8224 10.6164 20.8642 10.4069C20.906 10.1974 20.8847 9.98026 20.803 9.78288C20.7213 9.5855 20.5829 9.41678 20.4054 9.29806C20.2278 9.17929 20.019 9.11589 19.8054 9.11583H19.805C19.5186 9.11595 19.2441 9.22972 19.0416 9.4321C18.8391 9.63455 18.7252 9.90908 18.7249 10.1954ZM11.3642 22.3258C10.4867 22.2859 10.0098 22.1397 9.6928 22.0163C9.27263 21.8527 8.97281 21.6578 8.65756 21.3431C8.34233 21.0283 8.1472 20.7287 7.98433 20.3086C7.86077 19.9918 7.71461 19.5147 7.67471 18.6372C7.63108 17.6886 7.62237 17.4036 7.62237 15.0001C7.62237 12.5967 7.6318 12.3125 7.67471 11.363C7.71468 10.4856 7.86192 10.0095 7.98433 9.69173C8.14792 9.27152 8.34276 8.97171 8.65756 8.65651C8.97233 8.3413 9.27191 8.14618 9.6928 7.98332C10.0096 7.85976 10.4867 7.7136 11.3642 7.67371C12.3129 7.63008 12.5979 7.62137 15.0004 7.62137C17.4028 7.62137 17.6881 7.63066 18.6376 7.67386C19.5151 7.71382 19.9912 7.86106 20.309 7.98346C20.7292 8.14632 21.029 8.34187 21.3443 8.65666C21.6595 8.97147 21.8539 9.2717 22.0175 9.69185C22.1411 10.0087 22.2872 10.4858 22.3271 11.3632C22.3707 12.3127 22.3795 12.5968 22.3795 15.0003C22.3795 17.4037 22.3707 17.6879 22.3271 18.6374C22.2871 19.5148 22.1402 19.9918 22.0175 20.3087C21.8539 20.7289 21.6591 21.0287 21.3443 21.3432C21.0294 21.6577 20.7292 21.8528 20.309 22.0164C19.9922 22.1399 19.5151 22.2861 18.6376 22.326C17.6889 22.3696 17.4039 22.3783 15.0004 22.3783C12.5968 22.3783 12.3126 22.3696 11.3642 22.326V22.3258ZM11.2897 6.05451C10.3315 6.09814 9.67681 6.25006 9.10505 6.47254C8.51326 6.70229 8.01161 7.01052 7.51069 7.51063C7.00977 8.01074 6.70232 8.51244 6.47256 9.10491C6.25006 9.67701 6.09814 10.3314 6.0545 11.2895C6.01015 12.2491 6 12.5559 6 15C6 17.4441 6.01015 17.7509 6.0545 18.7105C6.09814 19.6687 6.25006 20.3229 6.47256 20.8951C6.70232 21.4869 7.00984 21.9895 7.51069 22.4894C8.01154 22.9893 8.51254 23.2971 9.10505 23.5275C9.6779 23.75 10.3315 23.9019 11.2897 23.9455C12.2498 23.9891 12.5562 24 15.0004 24C17.4446 24 17.7514 23.9899 18.7111 23.9455C19.6693 23.9019 20.3236 23.75 20.8957 23.5275C21.4875 23.2971 21.9891 22.9895 22.49 22.4894C22.991 21.9892 23.2977 21.4869 23.5282 20.8951C23.7507 20.3229 23.9033 19.6686 23.9463 18.7105C23.9899 17.7502 24 17.4441 24 15C24 12.5559 23.9899 12.2491 23.9463 11.2895C23.9026 10.3313 23.7507 9.67671 23.5282 9.10491C23.2977 8.51316 22.9901 8.01154 22.49 7.51063C21.9899 7.00973 21.4875 6.70229 20.8964 6.47254C20.3236 6.25006 19.6692 6.09742 18.7117 6.05451C17.7519 6.01066 17.4453 6 15.0015 6C12.5576 6 12.2502 6.01015 11.29 6.05451"
        fill="white"
      />
    </svg>
  )
}
