'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useState } from 'react'
import ProductCard from './productCard';
import ProductBanner from './productBanner';
import { useTheme } from "next-themes"
// import "./productBanner.css"
import { CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from 'lucide-react';

export default function Page() {
    const { setTheme } = useTheme()

    useEffect(() => {
        setTheme("light")
    }, [])

    const totalCards = 17;
    const cardWidth = 300;
    const gap = 16;

    const [cardsPerRow, setCardsPerRow] = useState(1);
    const [category, setCategory] = useState<string>('All');

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

    const handleCategoryChange = (cat: string) => {
        setCategory(cat);
    };

    return (
        <div className='bg-[#efeee7] w-[100vw] relative'>
            <ScrollArea>
                <div className='w-[100vw]  h-[100svh]'>
                    <div className='w-full h-16 bg-stone-600'></div>

                    <div className='w-full max-w-[1400px] mx-auto p-4 relative'>

                        <div className='w-full h-56 flex flex-row relative rounded-2xl mt-6 mb-4'
                            style={{ background: "linear-gradient(323deg, rgba(34,51,29,1) 0%, rgba(71,93,65,1) 100%)" }}
                        >
                            <div className='w-3/5 flex flex-col gap-3 justify-center mb-10 ml-[4.5rem] z-10'>
                                <div className='flex flex-col text-4xl leading-none font-bold text-[#fefce8]'>
                                    <span>
                                        Get the very best
                                    </span>
                                    <span>
                                        products for your home
                                    </span>

                                </div>
                                <div className='w-1/2 leading-none text-sm text-gray-200/90'>
                                    <span>Purple raindrops danced on the windowpane during the unexpected summer the unexpected summer storm.</span>
                                </div>
                            </div>

                            <div className='w-2/5 flex justify-start items-end z-10'>
                                <ProductBanner />
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

                        <div className='w-full gap-4 pb-10'>
                            <div className='w-full bg-stone-600/0 backdrop-blur-lg sticky top-[4.2rem] z-10 px-4 pt-1 mb-4  '>
                                <div className='flex flex-row justify-between items-center'>
                                    <CardTitle className='text-2xl w-1/2'>
                                        Grocery
                                    </CardTitle>
                                    <div className='flex items-end gap-3'>
                                        <div className="flex items-center w-64 h-[2.1rem] bg-white rounded-full shadow-sm px-4 space-x-2 border border-gray-200">
                                            <input
                                                type="text"
                                                className="flex-1 h-full text-sm outline-none bg-transparent placeholder-gray-500"
                                                placeholder="Search item..."
                                            />
                                            <div className="h-5 w-px bg-gray-300"></div>
                                            <Search size={16} className="text-gray-500" />
                                        </div>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant='ghost' className="w-24 h-[2.1rem] flex items-center bg-white rounded-md px-3 gap-2 shadow-sm">
                                                    Filter
                                                    <SlidersHorizontal size={16} />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="min-w-[25rem] bg-white px-6 space-y-4 bg-white rounded-lg shadow-lg border -translate-x-25">
                                                {/* Header with Clear Button */}
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium">Filters</span>
                                                    <Button variant="destructive" size="sm">
                                                        Clear
                                                    </Button>
                                                </div>

                                                {/* Sort By Section */}
                                                <div className="space-y-2">
                                                    <p className="text-sm font-semibold">Sort by</p>
                                                    <div className="flex flex-col gap-1">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Price: Low to High
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Price: High to Low
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Default
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Category Selection */}
                                                <div className="space-y-2">
                                                    <p className="text-sm font-semibold">Category</p>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {categories.map((cat) => (
                                                            <Button
                                                                key={cat}
                                                                variant={category === cat ? "default" : "outline"}
                                                                size="sm"
                                                                onClick={() => handleCategoryChange(cat)}
                                                            >
                                                                {cat}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                    </div>

                                </div>
                                <Separator className='bg-[#33323353] mt-1 p-[1px]' />
                            </div>

                            <div className="flex justify-center">
                                <div className="flex flex-wrap justify-center max-w-[1400px]">
                                    {Array.from({ length: totalCards }).map((_, index) => (
                                        <ProductCard
                                            key={index}
                                        />
                                    ))}

                                    {/* Placeholder Cards to align last row to the left */}
                                    {Array.from({ length: placeholdersNeeded }).map((_, index) => (
                                        <div
                                            key={`placeholder-${index}`}
                                            className="w-[300px] h-[375px] opacity-0 shadow-none pointer-events-none"
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
