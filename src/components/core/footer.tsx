'use client'

import { cx } from '@/lib/util'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import LinkedIn from '../icons/LinkedIn'
import Instagram from '../icons/Instagram'
import Facebook from '../icons/Facebook'
import Twitter from '../icons/Twitter'
import WhatsApp from '../icons/WhatsApp'
import TikTok from '../icons/TikTok'
import Youtube from '../icons/Youtube'

interface FooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}
export default function Footer({ className, ...attrs }: FooterProps) {
  return (
    <footer
      className={cx(
        'flex h-[176px] w-full items-center bg-dark-midnight-blue',
        className,
      )}
      {...attrs}
    >
      <div className="m-auto flex h-[56px] w-app-max justify-between">
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-normal not-italic leading-[130%] tracking-[-0.24px] text-white">
            Follow Us
          </span>
          <div className="flex gap-[15px]">
            <LinkedIn className="fill-midnight-blue" />
            <Instagram className="fill-midnight-blue" />
            <Facebook className="fill-midnight-blue" />
            <Twitter className="fill-midnight-blue" />
            <WhatsApp className="fill-midnight-blue" />
            <TikTok className="fill-midnight-blue" />
            <Youtube className="fill-midnight-blue" />
          </div>
        </div>
        <div className="flex gap-2.5 text-xs font-normal not-italic leading-[130%] tracking-[-0.36px] text-white opacity-40">
          <span>Privacy Policy</span>
          <span>&middot;</span>
          <span>Terms of Use</span>
        </div>
      </div>
    </footer>
  )
}
