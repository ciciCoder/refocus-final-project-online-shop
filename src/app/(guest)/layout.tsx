import Footer from '@/components/core/footer'
import Header from '@/components/core/header'

interface GuestLayoutProps {
  children?: React.ReactNode
}
export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div className="min-h-[100vh]">
      <Header />
      <main className="min-h-[calc(100vh-84px-176px)]">{children}</main>
      <Footer />
    </div>
  )
}
