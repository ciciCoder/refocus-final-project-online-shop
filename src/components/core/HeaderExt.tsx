'use client'

import Link from 'next/link'
import ShoppingCartItems from '../ui/ShoppingCartItems'
import { useAppSelector } from '@/hooks'
import UserIcon from '../icons/UserIcon'
import Image from 'next/image'
import { useAuth0 } from '@auth0/auth0-react'
import { usePathname } from 'next/navigation'

interface HeaderExtProps {}
export default function HeaderExt({}: HeaderExtProps) {
  const pathname = usePathname()
  const cart = useAppSelector((state) => state.cart)
  const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0()

  const routeWithUserAvatar = ['/shopping-bag', '/order-placed']

  return (
    <div className="m-auto flex h-[60px] w-app-max-xs items-center justify-between sm:hidden">
      {(() => {
        if (!routeWithUserAvatar.includes(pathname))
          return (
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-full border border-solid border-royal-blue "
              href="/shopping-bag"
            >
              <ShoppingCartItems
                className="flex-shrink-0 scale-[1.3] fill-royal-blue"
                chipClassName="bg-royal-blue text-white"
                count={cart.length}
              />
            </Link>
          )
        if (isAuthenticated)
          return (
            <div className="flex items-center gap-2.5">
              {user?.picture ? (
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                  <Image src={user.picture} alt="" sizes="inherit" fill />
                </div>
              ) : (
                <UserIcon />
              )}

              <span className="text-base font-bold not-italic leading-[100%] tracking-[-0.16px] text-slate-blue">
                {user?.name}
              </span>
            </div>
          )
        return <div></div>
      })()}

      {isAuthenticated ? (
        <button
          className="btn btn-pill border border-solid border-royal-blue bg-transparent text-royal-blue hover:opacity-50 active:opacity-100"
          onClick={() => logout()}
        >
          Sign out
        </button>
      ) : (
        <button
          className="btn btn-pill border border-solid border-royal-blue bg-transparent text-royal-blue hover:opacity-50 active:opacity-100"
          onClick={() => loginWithRedirect()}
        >
          Sign in
        </button>
      )}
    </div>
  )
}
