import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CHRONIC CARE',
  description: 'Comprehensive care for chronic conditions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CHRONIC CARE</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Dashboard</a></li>
            <li><a href="/education" className="hover:underline">Education</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; 2023 CHRONIC CARE. All rights reserved.</p>
      </div>
    </footer>
  )
}

