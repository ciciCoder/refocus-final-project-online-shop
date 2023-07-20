import Footer from '@/components/core/Footer'
import Header from '@/components/core/Header'

interface GuestLayoutProps {
  children?: React.ReactNode
}
export default async function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div className="min-h-[100vh]">
      <Header />
      <main className="min-h-[calc(100vh-84px-176px)]">
        <div className="m-auto w-app-max">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
