// 'use client'

// import { ScrollArea } from '@/components/ui/scroll-area'
// import React, { useEffect, useState, useRef } from 'react'
// import ProductCard from './productCard';
// import ProductBanner from './productBanner';
// import { useTheme } from "next-themes"
// // import "./productBanner.css"
// import { CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Search, SlidersHorizontal } from 'lucide-react';
// import { Product } from '@/utils/types/product';

// export default function Page() {
//     const { setTheme } = useTheme()
//     const [cardsPerRow, setCardsPerRow] = useState(1);
//     const [products, setProducts] = useState<Product[]>([]);
//     const [category, setCategory] = useState<string>('All');
//     const categoriesRef = useRef<{ [key: string]: HTMLElement | null }>({});

//     useEffect(() => {
//         setTheme("light");
//         fetchProducts();
//     }, [])

//     // const totalCards = 17;
//     // const cardWidth = 300;
//     // const gap = 16;

//     // useEffect(() => {
//     //     const updateCardsPerRow = () => {
//     //         const containerWidth = window.innerWidth * 0.9;
//     //         const perRow = Math.floor((containerWidth + gap) / (cardWidth + gap));
//     //         setCardsPerRow(perRow > 0 ? perRow : 1);
//     //     };

//     //     updateCardsPerRow();
//     //     window.addEventListener("resize", updateCardsPerRow);
//     //     return () => window.removeEventListener("resize", updateCardsPerRow);
//     // }, []);

//     // const lastRowCount = totalCards % cardsPerRow;
//     // const placeholdersNeeded = lastRowCount === 0 ? 0 : cardsPerRow - lastRowCount;

//     const fetchProducts = async () => {
//         try {
//             const response = await fetch("/api/products");
//             const result = await response.json();

//             if (result.success && result.data) {
//                 // Type assertion to ensure correct product shape
//                 const productsArray = Object.values(result.data)
//                     .flat()
//                     .map((product) => {
//                         if (typeof product === "object" && product !== null) {
//                             return {
//                                 ...(product as Product),
//                                 category: (product as Product).category || "Uncategorized",
//                             };
//                         }
//                         return null;
//                     })
//                     .filter(Boolean) as Product[];

//                 setProducts(productsArray);
//             } else {
//                 console.error("Unexpected API response:", result);
//                 setProducts([]);
//             }
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setProducts([]);
//         }
//     };

//     const categories = Array.from(
//         new Set(products.map(product => product.category).filter(Boolean)) // Removes null & undefined
//     ) as string[];

//     useEffect(() => {
//         const handleScroll = () => {
//             let closestCategory = 'All';
//             let minDistance = Infinity;

//             categories.forEach((cat) => {
//                 if (!cat) return; // Ensure category is a valid string

//                 const element = categoriesRef.current?.[cat]; // Optional chaining to prevent errors
//                 if (element) {
//                     const distance = Math.abs(element.getBoundingClientRect().top);
//                     if (distance < minDistance) {
//                         minDistance = distance;
//                         closestCategory = cat;
//                     }
//                 }
//             });

//             setCategory(closestCategory);
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [categories]);

//     const categoryElements = categories.map((category, index) => (
//         <div
//             key={index}
//             className="tag py-1 px-6 rounded-full whitespace-nowrap text-gray-200/70"
//         >
//             <span>#</span> {category.replace(/\b\w/g, (char) => char.toUpperCase())}
//         </div>
//     ));


//     const handleCategoryChange = (cat: string) => {
//         setCategory(cat);
//     };

//     return (
//         <div className='bg-[#efeee7] w-[100vw] relative'>
//             <ScrollArea>
//                 <div className='w-[100vw]  h-[100svh]'>
//                     <div className='w-full h-16 bg-stone-600'></div>

//                     <div className='w-full max-w-[1400px] mx-auto p-4 relative'>

//                         <div className='w-full h-56 flex flex-row relative rounded-2xl mt-6 mb-4'
//                             style={{ background: "linear-gradient(323deg, rgba(34,51,29,1) 0%, rgba(71,93,65,1) 100%)" }}
//                         >
//                             <div className='w-3/5 flex flex-col gap-3 justify-center mb-10 ml-[4.5rem] z-10'>
//                                 <div className='flex flex-col text-4xl leading-none font-bold text-[#fefce8]'>
//                                     <span>
//                                         Get the very best
//                                     </span>
//                                     <span>
//                                         products for your home
//                                     </span>

//                                 </div>
//                                 <div className='w-1/2 leading-none text-sm text-gray-200/90'>
//                                     <span>Purple raindrops danced on the windowpane during the unexpected summer the unexpected summer storm.</span>
//                                 </div>
//                             </div>

//                             <div className='w-2/5 flex justify-start items-end z-10'>
//                                 <ProductBanner />
//                             </div>

//                             <div className='w-full h-14 absolute bottom-0 rounded-2xl flex items-center gap-3 overflow-hidden'>
//                                 <div className="loop-slider" style={{ "--duration": "35951ms", "--direction": "normal" } as React.CSSProperties}>
//                                     <div className="inner flex gap-3">
//                                         {categoryElements}
//                                         {categoryElements}
//                                     </div>
//                                     <div className="fade"></div>
//                                 </div>

//                             </div>


//                         </div>

//                         {categories.map((cat) => (
//                             <div
//                                 key={cat}
//                                 ref={(el) => {
//                                     if (categoriesRef.current) {
//                                         categoriesRef.current[cat] = el;
//                                     }
//                                 }}
//                             >
//                                 <div className='w-full gap-4 pb-10'>
//                                     <div className='w-full bg-stone-600/0 backdrop-blur-lg sticky top-[4.2rem] z-10 px-4 pt-1 mb-4  '>
//                                         <div className='flex flex-row justify-between items-center'>
//                                             <CardTitle className="text-2xl w-1/2">
//                                                 {cat.replace(/\b\w/g, (char) => char.toUpperCase())}
//                                             </CardTitle>

//                                             <div className='flex items-end gap-3'>
//                                                 <div className="flex items-center w-64 h-[2.1rem] bg-white rounded-full shadow-sm px-4 space-x-2 border border-gray-200">
//                                                     <input
//                                                         type="text"
//                                                         className="flex-1 h-full text-sm outline-none bg-transparent placeholder-gray-500"
//                                                         placeholder="Search item..."
//                                                     />
//                                                     <div className="h-5 w-px bg-gray-300"></div>
//                                                     <Search size={16} className="text-gray-500" />
//                                                 </div>

//                                                 <Popover>
//                                                     <PopoverTrigger asChild>
//                                                         <Button variant='ghost' className="w-24 h-[2.1rem] flex items-center bg-white rounded-md px-3 gap-2 shadow-sm">
//                                                             Filter
//                                                             <SlidersHorizontal size={16} />
//                                                         </Button>
//                                                     </PopoverTrigger>

//                                                     <PopoverContent className="min-w-[25rem] bg-white px-6 space-y-4 bg-white rounded-lg shadow-lg border -translate-x-25">
//                                                         {/* Header with Clear Button */}
//                                                         <div className="flex justify-between items-center">
//                                                             <span className="text-sm font-medium">Filters</span>
//                                                             <Button variant="destructive" size="sm">
//                                                                 Clear
//                                                             </Button>
//                                                         </div>

//                                                         {/* Sort By Section */}
//                                                         <div className="space-y-2">
//                                                             <p className="text-sm font-semibold">Sort by</p>
//                                                             <div className="flex flex-col gap-1">
//                                                                 <Button variant="outline" size="sm"> Price: Low to High </Button>
//                                                                 <Button variant="outline" size="sm"> Price: High to Low </Button>
//                                                             </div>
//                                                         </div>

//                                                         {/* Category Selection */}
//                                                         <div className="space-y-2">
//                                                             <p className="text-sm font-semibold">Category</p>
//                                                             <div className="grid grid-cols-2 gap-2">
//                                                                 {categories.map((cat) => (
//                                                                     <Button
//                                                                         key={cat}
//                                                                         variant={category === cat ? "default" : "outline"}
//                                                                         size="sm"
//                                                                         onClick={() => handleCategoryChange(cat)}
//                                                                     >
//                                                                         {cat}
//                                                                     </Button>
//                                                                 ))}
//                                                             </div>
//                                                         </div>
//                                                     </PopoverContent>
//                                                 </Popover>

//                                             </div>

//                                         </div>
//                                         <Separator className='bg-[#33323353] mt-1 p-[1px]' />
//                                     </div>

//                                     <div className="flex justify-start">
//                                         <div className="flex flex-wrap justify-center max-w-[1400px]">
//                                             <div className="flex flex-wrap gap-4">
//                                                 {products
//                                                     .filter(product => product.category === cat)
//                                                     .map((product) => (
//                                                         <ProductCard key={product.id} product={product} />
//                                                     ))}
//                                             </div>
//                                         </div>


//                                         {/* Placeholder Cards to align last row to the left
//                                         {Array.from({ length: placeholdersNeeded }).map((_, index) => (
//                                             <div
//                                                 key={`placeholder-${index}`}
//                                                 className="w-[300px] h-[375px] opacity-0 shadow-none pointer-events-none"
//                                             />
//                                         ))} */}
//                                     </div>
//                                 </div>

//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </ScrollArea>
//         </div>
//     )
// }


'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../../components/product/productCard'
import ProductBanner from '../../../components/bannerCard/productBanner'
import { useTheme } from "next-themes"
import { CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from 'lucide-react'
import { Product } from '@/utils/types/product'
import { Skeleton } from '@/components/ui/skeleton'
import Loader from '@/components/loader/loader'
import { Label } from '@/components/ui/label'

export default function Page() {
    const { setTheme } = useTheme()
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [category, setCategory] = useState<string>('All')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [filterActive, setFilterActive] = useState<boolean>(false)
    const [sort, setSort] = useState<string>('')

    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    useEffect(() => {
        setTheme("light")
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/products")
            const result = await response.json()
            console.log(result)

            if (result.success && result.data) {
                const productsArray = Object.values(result.data)
                    .flat()
                    .map((product) => ({
                        ...(product as Product),
                        category: (product as Product).category || "Uncategorized",
                    })) as Product[]
                setProducts(productsArray)
                setFilteredProducts(productsArray)
                // console.log(productsArray)
            }

        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setLoading(false)
        }
    }

    const categories = Array.from(
        new Set(products.map(product => product.category).filter(Boolean))
    ) as string[];

    const categoryElements = categories.map((category, index) => (
        <div
            key={index}
            className="tag py-1 px-6 rounded-full whitespace-nowrap text-gray-200/70 capitalize"
        >
            <span>#</span> {category}
        </div>
    ));

    const handleSearch = (query: string) => setSearchQuery(query)

    const applyFilters = () => {
        let tempProducts = [...products]

        if (category !== 'All') tempProducts = tempProducts.filter(product => product.category === category)
        if (searchQuery) tempProducts = tempProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        if (sort === 'asc') tempProducts.sort((a, b) => a.price_inr - b.price_inr)
        if (sort === 'desc') tempProducts.sort((a, b) => b.price_inr - a.price_inr)

        setFilteredProducts(tempProducts)
    }

    useEffect(() => {
        applyFilters()
    }, [category, searchQuery, sort])

    const clearFilters = () => {
        setCategory('All')
        setSearchQuery('')
        setSort('')
        setFilterActive(false)
    }

    const handleFilterChange = (selectedCategory: string) => {
        setCategory(selectedCategory)
        setFilterActive(true)
    }

    const handleSort = (order: string) => {
        setSort(order)
        setFilterActive(true)
    }

    // Group products by category
    const groupedProducts = filteredProducts.reduce((acc: Record<string, Product[]>, product) => {
        const category = product.category ?? 'Uncategorized';
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
    }, {});

    return (
        <div className='bg-[#efeee7] w-[100vw] relative'>
            <ScrollArea>
                <div className='w-[100vw] h-[100svh]'>
                    <div className='w-full h-16 bg-stone-600'></div>

                    <div className='w-full max-w-[1400px] mx-auto p-4 relative'>
                        {/* Banner */}
                        <div className='w-full flex flex-col sm:flex-row relative rounded-2xl mt-6 mb-4'
                            style={{ background: "linear-gradient(323deg, rgba(34,51,29,1) 0%, rgba(71,93,65,1) 100%)" }}>
                            <div className='w-full sm:w-2/5 md:w-1/2 lg:w-3/5 flex flex-col gap-3 justify-center p-6 sm:p-0 mb-10 sm:ml-10 xl:ml-[4.5rem] z-10'>
                                <div className='flex flex-col text-2xl md:text-4xl leading-none font-bold text-[#fefce8]'>
                                    <span>Get the very best</span>
                                    <span>products for your home</span>
                                </div>
                                <div className='w-full xl:w-1/2 leading-none text-xs sm:text-sm text-gray-200/90'>
                                    <span>Purple raindrops danced on the windowpane during the unexpected summer storm.</span>
                                </div>
                            </div>

                            <div className='w-full sm:w-3/5 md:w-1/2 lg:w-2/5 flex justify-center sm:justify-start items-end z-10'>
                                <ProductBanner />
                            </div>

                            <div className='w-full h-14 absolute bottom-[58%] sm:bottom-0 sm:rounded-2xl flex items-center gap-3 overflow-hidden'>
                                <div className="loop-slider" style={{ "--duration": "35951ms", "--direction": "normal" } as React.CSSProperties}>
                                    <div className="inner flex gap-3">
                                        {categoryElements}
                                        {categoryElements}
                                    </div>
                                    <div className="fade"></div>
                                </div>

                            </div>
                        </div>

                        {/* Search + Filter */}
                        <div className='w-full bg-stone-600/0 backdrop-blur-lg sticky top-[4.2rem] z-10 px-4 pt-1 mb-4 rounded-sm'>
                            <div className='flex flex-row justify-end items-center'>
                                <div className='flex items-end gap-3'>
                                    <div className="relative">
                                        {/* Mobile View */}
                                        <div className="block z-20 sm:hidden h-[2.1rem] flex items-center bg-white rounded-full shadow-sm px-2 sm:px-4 border border-gray-200 transition-all duration-300 ease-in-out"
                                            style={{ width: mobileSearchOpen ? '16rem' : '2.4rem' }}
                                        >
                                            {mobileSearchOpen && (
                                                <input
                                                    type="text"
                                                    className="flex-1 w-4/5 h-full text-[16px] outline-none bg-transparent placeholder-gray-500 pl-3 "
                                                    placeholder="Search product..."
                                                    value={searchQuery}
                                                    onChange={(e) => handleSearch(e.target.value)}
                                                    autoFocus
                                                />

                                            )}
                                            <div className={`${mobileSearchOpen ? 'h-5 w-px bg-gray-300 mx-2' : ''}`}></div>
                                            <Search
                                                size={20}
                                                className="text-gray-500 cursor-pointer"
                                                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                                            />
                                        </div>


                                        {/* Desktop View */}
                                        <div className="hidden sm:flex items-center w-64 h-[2.1rem] bg-white rounded-full shadow-sm px-4 space-x-2 border border-gray-200">
                                            <input
                                                type="text"
                                                className="flex-1 h-full text-sm outline-none bg-transparent placeholder-gray-500"
                                                placeholder="Search product..."
                                                value={searchQuery}
                                                onChange={(e) => handleSearch(e.target.value)}
                                            />
                                            <div className="h-5 w-px bg-gray-300"></div>
                                            <Search size={16} className="text-gray-500" />
                                        </div>
                                    </div>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={filterActive ? 'default' : 'outline'}
                                                className="w-fit h-[2.1rem] flex items-center rounded-md px-3 gap-2 shadow-sm"
                                            >
                                                <span className="hidden sm:block">Filter</span>
                                                <SlidersHorizontal size={16} />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-[22rem] md:w-[32rem] bg-white px-6 space-y-4 rounded-lg shadow-lg border -translate-x-8 sm:-translate-x-25 ">
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-lg font-medium text-stone-500">Apply Filters</CardTitle>
                                                <Button variant="destructive" size="sm" onClick={clearFilters}>
                                                    Clear
                                                </Button>
                                            </div>

                                            <Label>Sort by</Label>
                                            <div className="space-y-2">
                                                <div className="flex flex-col gap-1">
                                                    <Button variant={sort === 'asc' ? 'default' : 'outline'} size="sm" onClick={() => handleSort('asc')}> Price: Low to High </Button>
                                                    <Button variant={sort === 'desc' ? 'default' : 'outline'} size="sm" onClick={() => handleSort('desc')}> Price: High to Low </Button>
                                                </div>
                                            </div>

                                            <Label>Category</Label>
                                            <ScrollArea>

                                                <div className="space-y-2 h-90 mr-4">
                                                    <div className="grid sm:grid-cols-2 gap-2">
                                                        {categories.map((cat) => (
                                                            <Button
                                                                key={cat}
                                                                variant={category === cat ? 'default' : 'outline'}
                                                                size="sm"
                                                                onClick={() => handleFilterChange(cat)}
                                                                className='capitalize truncate '
                                                            >
                                                                {cat}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </ScrollArea>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <Separator className='bg-[#33323353] mt-1 p-[1px]' />
                        </div>

                        {/* Product Grouping */}
                        <div className="flex flex-col gap-8 pb-10">
                            {loading ? (
                                <div className="w-full">
                                    <div className='flex justify-center mb-4'>
                                        <Loader />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
                                        <Skeleton className="h-84 w-full" />
                                        <Skeleton className="h-84 w-full" />
                                        <Skeleton className="h-84 w-full" />
                                        <Skeleton className="h-84 w-full" />
                                    </div>
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                Object.entries(groupedProducts).map(([group, items]) => (
                                    <div key={group}>
                                        <CardTitle className="w-fit text-2xl font-semibold mb-4 capitalize sticky top-[4.4rem] z-11 px-4">{group}</CardTitle>
                                        <div className="flex flex-wrap md:gap-1 lg:gap-4">
                                            {items.map(product => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='text-center text-gray-600'>No products found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

