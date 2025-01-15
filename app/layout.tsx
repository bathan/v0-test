'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { RootLayoutContent } from '@/components/RootLayoutContent'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/apollo-client'
import { getPort } from '@/utils/getPort'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Management Dashboard',
  description: 'Manage your operations efficiently'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const port = getPort()

  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <AuthProvider>
            <RootLayoutContent>{children}</RootLayoutContent>
          </AuthProvider>
        </ApolloProvider>
        <div id="app-port" data-port={port} style={{ display: 'none' }}></div>
      </body>
    </html>
  )
}
