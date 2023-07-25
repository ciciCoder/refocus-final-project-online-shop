'use client'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { Auth0Provider } from '@auth0/auth0-react'
import { usePathname, useRouter } from 'next/navigation'

interface ProvidersProps {
  children: React.ReactNode
}
export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <Auth0Provider
        domain="dev-yn7i7cmzb0qsph5v.us.auth0.com"
        clientId="4TuOOkSAqG4vd67bZq7ILQsfn3wiemVC"
        authorizationParams={{
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        }}
        useRefreshTokens
        cacheLocation="localstorage"
      >
        {children}
      </Auth0Provider>
    </Provider>
  )
}
