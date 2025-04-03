'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect } from 'react';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Meteors } from '@/components/ui/meteors';
import { useTheme } from "next-themes";
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Button } from '@/components/ui/button';
import { UserPen, MapPinned, PhoneCall, MailCheck } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/cart/store';
import { Skeleton } from '@/components/ui/skeleton';
import OrderDetails from '@/components/orderDetails/OrderDetails';
import Footer from '@/components/footer/Footer';

export default function ProfilePage() {
    const { setTheme } = useTheme();
    const user = useSelector((state: RootState) => state.user.user);
    const loading = useSelector((state: RootState) => state.user.loading);

    useEffect(() => {
        setTheme("dark");
    }, []);

    return (
        <div className='relative'>
            <ScrollArea>
                <div className='w-[100vw] h-[100svh] relative'>
                    <div className='w-full h-16 bg-gray-800'></div>

                    <div className='w-full max-w-[1100px] mx-auto p-4 px-10 relative'>
                        {/* Banner */}
                        <div className='w-full h-44 sm:h-56 flex flex-col sm:flex-row relative rounded-2xl mt-4 sm:mt-6 mb-4'>

                            <div className="absolute inset-0 h-full w-full scale-[0.40] transform rounded-full bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
                            <div className="relative flex w-full h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
                                <BackgroundGradientAnimation />
                            </div>

                            {/* Profile Picture */}
                            <div className='absolute -bottom-6 left-4 w-32 sm:w-40 h-32 sm:h-40 rounded-full p-1 bg-gradient-to-b from-gray-50 to-gray-200'>
                                {loading ? (
                                    <Skeleton className='w-full h-full rounded-full' />
                                ) : (
                                    <img src={user?.profile_pic || "../profile.jpg"} alt="Profile" className='w-full h-full rounded-full object-cover' />
                                )}
                            </div>

                            <Button variant="outline" className='absolute top-4 right-4 bg-gray-500/25 rounded-full border-gray-500/40 backdrop-blur-md'>
                                <UserPen /> Edit Profile
                            </Button>
                        </div>

                        {/* User Info Section */}
                        <div className='px-2 mt-8'>
                            {loading ? (
                                <Skeleton className="w-1/2 h-8 rounded-lg" />
                            ) : (
                                <CardTitle className='text-2xl font-semibold'> {user?.name || "Guest User"}</CardTitle>
                            )}
                            {loading ? (
                                <Skeleton className="w-1/3 h-5 mt-2 rounded-lg" />
                            ) : (
                                <CardDescription className='text-gray-400 text-sm flex flex-col sm:flex-row  sm:gap-4'>
                                    <span className='flex flex-row gap-1 items-center'><PhoneCall size={15} /> {user?.phone || "No Contact Number Available"}</span>
                                    <span className='hidden sm:flex'> | </span>
                                    <span className='flex flex-row gap-1 items-center'><MailCheck size={15} /> {user?.email || "No Email Available"}</span>
                                </CardDescription>
                            )}
                            {loading ? (
                                <Skeleton className="w-1/3 h-5 mt-2 rounded-lg" />
                            ) : (
                                <CardDescription className='text-gray-400 text-sm flex flex-row gap-1 items-center'>
                                    <MapPinned size={15} /> {user?.address || "n/a"}
                                </CardDescription>
                            )}
                        </div>

                        <Separator className="mb-2 mt-6" />

                        {/* Extra Details */}
                        <div className='w-full max-w-[1100px] px-2 mt-3 mx-auto gap-4 pb-10'>
                            <OrderDetails />
                        </div>
                    </div>
                    <Footer />
                </div>
            </ScrollArea>
        </div>
    );
}
