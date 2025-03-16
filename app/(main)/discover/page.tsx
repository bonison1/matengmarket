'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useState } from 'react'
import { CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react'
import StoreCard from './storeCard';
import './page.css'

export default function Page() {
    const totalCards = 5;
    const cardWidth = 340;
    const gap = 16;

    const [cardsPerRow, setCardsPerRow] = useState(1);
    const [rating, setRating] = useState(4)

    useEffect(() => {
        const updateCardsPerRow = () => {
            const containerWidth = window.innerWidth * 0.9;
            const perRow = Math.floor((containerWidth + gap) / (cardWidth + gap));
            setCardsPerRow(perRow > 0 ? perRow : 1);
        };

        updateCardsPerRow();
        window.addEventListener("resize", updateCardsPerRow);
        return () => window.removeEventListener("resize", updateCardsPerRow);
    }, []);

    const lastRowCount = totalCards % cardsPerRow;
    const placeholdersNeeded = lastRowCount === 0 ? 0 : cardsPerRow - lastRowCount;

    const categories = [
        "Fruits", "Vegetables", "Dairy", "Beverages", "Snacks",
        "Frozen Food", "Bakery", "Pet Food",
    ];

    return (
        <div className='bg-[#efeee7] h-screen relative'>

            <ScrollArea>
                <div className='w-[100vw]  h-[100svh] relative'>
                    <div className='w-full h-16 bg-stone-600'></div>

                    <div className='w-full max-w-[1400px] mx-auto p-4 relative'>
                        <div className='w-full h-56 flex flex-row relative rounded-2xl mt-6 mb-4'
                            style={{ background: "linear-gradient(323deg, rgba(34,51,29,1) 0%, rgba(71,93,65,1) 100%)" }}
                        >
                            <div className='w-3/5 flex flex-col gap-3 justify-center mb-10 ml-[4.5rem] z-10'>
                                <div className='flex flex-col text-4xl leading-none font-bold text-[#fefce8]'>
                                    <span>
                                        Welcome to
                                    </span>
                                    <span>
                                        Mateng Discovery
                                    </span>

                                </div>
                                <div className='w-1/2 leading-none text-sm text-gray-200/90'>
                                    <span>Explore every businesses directly.</span>
                                </div>
                            </div>

                            <div className='w-2/5 flex justify-start items-end z-10'>

                            </div>

                            <div className='w-full h-14 absolute bottom-0 rounded-2xl flex items-center gap-3 overflow-hidden'>
                                <div className="loop-slider" style={{ "--duration": "25951ms", "--direction": "normal" } as React.CSSProperties}>
                                    <div className="inner flex gap-3">
                                        {categories.map((category, index) => (
                                            <div
                                                key={index}
                                                className="tag py-1 px-6 rounded-full whitespace-nowrap text-gray-200/70"
                                            >
                                                <span>#</span> {category}
                                            </div>
                                        ))}
                                        {categories.map((category, index) => (
                                            <div
                                                key={index}
                                                className="tag py-1 px-6 rounded-full whitespace-nowrap text-gray-200/70"
                                            >
                                                <span>#</span> {category}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="fade"></div>
                                </div>

                            </div>


                        </div>

                        <div className='w-full  max-w-[1400px] mx-auto gap-4 mt-3 pb-10'>
                            <div className='w-full bg-stone-600/0 backdrop-blur-lg sticky top-[4.2rem] z-10 px-4 pt-1 mb-4  '>
                                <div className='flex flex-row justify-between items-center'>
                                    <CardTitle className='text-2xl w-1/2'>
                                        Explore Sellers
                                    </CardTitle>
                                    <div className='flex items-end gap-3'>
                                        <div className="flex items-center w-64 h-[2.1rem] bg-white rounded-full shadow-sm px-4 space-x-2 border border-gray-200">
                                            <input
                                                type="text"
                                                className="flex-1 h-full text-sm outline-none bg-transparent placeholder-gray-500"
                                                placeholder="Search businesses..."
                                            />
                                            <div className="h-5 w-px bg-gray-300"></div>
                                            <Search size={16} className="text-gray-500" />
                                        </div>

                                    </div>

                                </div>
                                <Separator className='bg-[#33323353] mt-1 p-[1px]' />
                            </div>

                            <div className="flex justify-center">
                                <div className="inline-flex flex-wrap justify-center max-w-[1400px] gap-10 sm:gap-6 md:gap-4 w-full">
                                    {Array.from({ length: totalCards }).map((_, index) => (
                                        <StoreCard key={index} id={index + 1} rating={rating} />
                                    ))}

                                    {Array.from({ length: placeholdersNeeded }).map((_, index) => (
                                        <div
                                            key={`placeholder-${index}`}
                                            className="w-[300px] h-[375px] m-4 sm:m-8 md:m-10 opacity-0 shadow-none pointer-events-none"
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
