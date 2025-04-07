import Footer from '@/components/footer/Footer'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

export default function page() {
  return (
    <ScrollArea>
      <div className="w-[100vw] h-[100svh] relative flex flex-col justify-between sm:p-4 poppins">
        <div className="w-full max-w-[1400px] mx-auto mb-4 p-4 relative">
          <div></div>
          <div className='w-full flex flex-col md:flex-row'>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div className="bg-gray-200 h-20">1</div>
  <div className="bg-gray-200 h-20">2</div>
  <div className="bg-gray-200 h-20">3</div>
  <div className="bg-gray-200 h-20">4</div>
</div>


            <div></div>
          </div>
        </div>
        <Footer />
      </div>
    </ScrollArea>
  )
}
