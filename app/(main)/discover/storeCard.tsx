'use client'

import React, { useState, useEffect } from 'react';
import Rating from '@/components/rating/rating';
import { useRouter } from 'next/navigation';
import "./storeCard.css"

interface StoreCardProps {
    rating: number; 
    id: number;
  }

  export default function StoreCard({ rating, id }: StoreCardProps) {

    const router = useRouter();
    const [starSize, setStarSize] = useState(20); 

  useEffect(() => {
    const updateSize = () => {
      setStarSize(window.innerWidth < 540 ? 16 : 20); 
    };

    updateSize(); 
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleNavigate = () => {
    router.push(`/discover/${id}`);
};


    return (
        <div className='p-4 sm:p-8 md:p-10 poppins'>
            <div className="store-card h-[325px] w-[250px] md:w-[300px] md:h-[375px]">
                <div className="content">
                    <img src="./imag5.jpg" alt="imag" className='h-[70%] object-cover rounded-lg' />
                    <div className="w-full flex flex-col items-center mt-3">
                        <span className="title text-black text-xl font-semibold b-0">
                            Air Max 90
                        </span>
                        <span className="text-[#00000066]">
                            Nike | Shoe
                        </span>

                        <div className='w-full h-12 flex justify-between items-center p-2'>
                            <div className='flex flex-col leading-none'>
                                <span className='text-sm font-medium text-[#9D9898CC] pl-1 translate-y-0.5 hover:text-[#9D9898]'>Rating</span>
                                <Rating rating={rating} editable={false} size={starSize} />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex justify-center gap-2 items-center mx-auto shadow-md text-sm text-gray-800 bg-gray-200 backdrop-blur-md lg:font-medium isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3.5 py-1.5 overflow-hidden border-2 rounded-full group"
                                    onClick={handleNavigate}
                                >
                                    Details
                                    <svg
                                        className="w-5 h-5 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-1 rotate-45"
                                        viewBox="0 0 16 19"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                            className="fill-gray-800 group-hover:fill-gray-800"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

