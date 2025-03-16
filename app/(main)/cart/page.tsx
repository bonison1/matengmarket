'use client'

import React, { useEffect } from 'react'
import Cart from './cart';
import { useTheme } from "next-themes"
import { ScrollArea } from '@/components/ui/scroll-area';


export default function page() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme("light")
  }, [])

  return (
    <div className='bg-[#efeee7] w-[100vw] relative'>
      <ScrollArea>
        <div className='w-[100vw]  h-[100svh]'>
          <div className='w-full h-16 bg-stone-600'></div>

          <div className='w-full max-w-[1400px] mx-auto p-4 relative'>
            <Cart />
          </div>
        </div>
      </ScrollArea>
    </div>

  )
}


