
import LiveBlocksProvider from '@/components/LiveBlocksProvider'
import React from 'react'

export default function PageLayout({children}:{
    children:React.ReactNode
}) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  )
}
