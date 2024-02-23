import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes"
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
  <ClerkProvider appearance={{ baseTheme: dark}}>
    <div>{children}</div>
    </ClerkProvider>
  )
}

export default Layout