import ClientGuestLayout from '@/components/ClientGuestLayout'
import Footer from '@/components/core/Footer'
import Header from '@/components/core/Header'

interface GuestLayoutProps {
  children?: React.ReactNode
}
export default function GuestLayout({ children }: GuestLayoutProps) {
  return <ClientGuestLayout>{children}</ClientGuestLayout>
}
