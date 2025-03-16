'use client'

import React, { useState } from 'react'
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Phone, Mail, CircleUserRound } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Rating from '@/components/rating/rating';


export default function Page() {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // Form submission handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim()) {
            alert("Please enter a comment.");
            return;
        }

        const formData = {
            rating,
            comment,
        };

        console.log("Submitted Data:", formData);
        alert("Thank you for your feedback! 🎉");

        // Reset form fields after submission
        setRating(0);
        setComment("");
    };


    return (
        <div className='bg-[#efeee7] h-screen flex flex-col items-center justify-start relative'>
            <ScrollArea>
                <div className='h-[100vh]'>

                    <div className='w-full relative'>
                        <div className='w-[100vw] h-86 bg-stone-700 flex items-center justify-center'>
                            <BackgroundBeams className='w-full h-86 bg-stone-800 overflow-hidden' />
                            <span className="text-gray-100 text-4xl font-bold z-10 mix-blend-overlay">
                                No Cover Photo Available
                            </span>
                        </div>

                        <div className='w-full absolute -bottom-24 flex justify-center' >
                            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-gray-200">
                                <img src="../logo1.jpg" alt="logo" className='w-44 h-44 bg-red-300 rounded-full object-cover' />
                            </div>
                        </div>
                    </div>
                    <div className='mt-[6.2rem] flex flex-col justify-center items-center'>
                        <CardTitle className='text-2xl font-bold'>
                            Nike Store
                        </CardTitle>

                        <CardDescription className='text-base'>
                            Shoping | Clothing | Shoes
                        </CardDescription>

                        <CardDescription className='flex flex-row gap-3 text-base leading-none my-1'>
                            <span className='flex flex-row items-center pr-3 gap-2 border-r-3 border-stone-400/60'><Phone size={16} className='text-green-400' /> 9862215452</span>
                            <span className='flex flex-row items-center pr-3 gap-2 border-r-3 border-stone-400/60'><Mail size={16} className='text-blue-400' /> nike.store@gmail.com</span>
                            <span className='flex flex-row items-center gap-2'><CircleUserRound size={16} className='text-orange-300' /> Mike Johnson</span>
                        </CardDescription>

                        <CardDescription className='text-base'>
                            Kakching Supermarket shop no.16 (64 shopping complex near Auto Parking)
                        </CardDescription>

                    </div>
                    <div className='w-full max-w-[1400px] mx-auto mt-10 mb-5 p-4 relative'>
                        <div className='w-full gap-4 pb-10'>

                            <div className="flex justify-center gap-6">
                                <Card className='w-[18rem] h-[22rem]'/>
                                <Card className='w-[18rem] h-[22rem]'/>
                                <Card className='w-[18rem] h-[22rem]'/>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-[1200px] mx-auto pb-10">
                        <Card className="gap-1">
                            <CardHeader>
                                <CardTitle>Leave a Comment!</CardTitle>
                                <CardDescription>No comments yet. Be the first to leave feedback!</CardDescription>
                            </CardHeader>

                            <form onSubmit={handleSubmit}>
                                <CardContent>
                                    <div className="flex flex-row items-center gap-3">
                                        <CardDescription className="text-base pl-1">Rate our Service/Store:</CardDescription>
                                        <Rating rating={rating} onRate={setRating} editable={true} size={24} />
                                    </div>

                                    <Textarea
                                        className='h-24'
                                        placeholder="Write your comment here..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    />
                                </CardContent>

                                <CardFooter className="mt-4">
                                    <Button type="submit" variant="default">
                                        Submit
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
