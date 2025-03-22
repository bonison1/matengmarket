import Loader from '@/components/loader/loader'
import WordFlipLoader from '@/components/loader/wordFlipLoader'
import React from 'react'

export default function page() {
  return (
    <div className='h-screen relative bg-[#efeee7]'>
      <Loader/>
        <WordFlipLoader/>
    </div>
  )
}
