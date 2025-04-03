'use client'

import React, { useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import DistanceMatrixComponent from '@/components/map/DistanceMatrixComponent'
import Footer from '@/components/footer/Footer'
import { Pin } from 'lucide-react'
import { useTheme } from "next-themes"

export default function Page() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, []);

  return (
    <ScrollArea>
      <div className='w-[100vw] h-[100svh] relative flex flex-col justify-between sm:p-4'>
        <div>
          <div className='w-full h-16'></div>

          <div className='w-full max-w-[1400px] mx-auto mb-10 p-4 relative'>
            <span className="text-3xl font-bold mb-6 flex justify-center items-center leading-none gap-1 w-fit bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400">
              <Pin className='text-gray-300' />
              Set Your Locations
            </span>

            <DistanceMatrixComponent />
          </div>
        </div>

        <Footer />
      </div>
    </ScrollArea>
  )
}
