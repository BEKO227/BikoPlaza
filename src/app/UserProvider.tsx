'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function UserProvider({children}: { children: React.ReactNode }) {
  return (
    <div>
        <SessionProvider>
            {children}
        </SessionProvider>


    </div>
  )
}
