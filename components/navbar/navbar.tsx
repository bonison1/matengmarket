"use client"

import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/cart/store';
import Image from 'next/image'
import { Separator } from '../ui/separator';
import { LogOut, BadgeCheck } from 'lucide-react'
import "./navbar.css"

function Navbar() {
    const [isNavOpen, setNavOpen] = useState<boolean>(false);
    const navMenuRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const user = useSelector((state: RootState) => state.user.user);

    const toggleNav = () => {
        setNavOpen(!isNavOpen);
    };

    const closedNav = () => {
        setNavOpen(false);
    };

    const links = [
        { name: 'Home', href: '/home' },
        { name: 'Marketplace', href: '/products' },
        { name: 'Discover Seller', href: '/discover' },
        { name: 'Delivery Rates', href: '/delivery-rates' },
    ];

    useEffect(() => {
        const navMenu = navMenuRef.current;

        if (isNavOpen && navMenu) {
            const handleTransitionEnd = () => {
                const navLinks = navMenu.querySelectorAll('.navlink');
                navLinks.forEach((link) => link.classList.add('animate'));
                navMenu.removeEventListener('transitionend', handleTransitionEnd);
            };

            navMenu.addEventListener('transitionend', handleTransitionEnd);
        } else if (navMenu) {
            const navLinks = navMenu.querySelectorAll('.navlink');
            navLinks.forEach((link) => link.classList.remove('animate'));
        }
    }, [isNavOpen]);

    // Component for user greeting button
    const UserGreeting = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative min-w-30 h-9 p-0 pr-4 border border-gray-400/50 rounded-full cursor-pointer text-white/70 shadow-inner bg-[radial-gradient(ellipse_at_bottom,_rgba(71,81,92,1)_0%,_rgba(11,21,30,1)_45%)] transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)] hover:scale-105 hover:text-white group flex flex-row items-center gap-1">
                    <Image
                        src={user?.profile_pic || '/user.png'}
                        alt='user'
                        width={100}
                        height={100}
                        className='w-9 h-9 rounded-full object-cover object-center'
                    />
                    Hi, {user?.name?.split(' ')[0] || 'User'}
                    <span className="pointer-events-none absolute bottom-0 left-[15%] w-[70%] h-px opacity-20 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)] group-hover:opacity-100"></span>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="bg-[radial-gradient(ellipse_at_bottom,_rgba(71,81,92,1)_0%,_rgba(11,21,30,1)_45%)] text-white/70 border border-gray-400/50 shadow-lg rounded-lg p-2 min-w-[150px] z-1000"
            >
                <DropdownMenuItem className="hover:bg-white/10 hover:text-white cursor-pointer rounded px-3 py-2">
                    <BadgeCheck /> Account Details
                </DropdownMenuItem>
                <Separator className='bg-gray-500/40' />
                <DropdownMenuItem className="hover:bg-white/10 hover:text-white cursor-pointer rounded px-3 py-2">
                    <LogOut /> Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    // Component for login button
    const LoginButton = () => (
        <Link href={`/login?redirect=${encodeURIComponent(pathname)}`} onClick={() => setNavOpen(false)}>
            <button className="cartBtn rounded-full p-0.5 text-[0.95rem] leading-none">
                <div className="button-overlay"></div>
                <span className="rounded-full py-2 px-6 gap-1">
                    Login
                    <ArrowRight size={18} className="text-white" />
                </span>
            </button>
        </Link>
    );

    return (
        <div className='w-full absolute top-0 z-100 sm:px-4 bg-gradient-to-r from-[#131316d9] via-[#222226a6] to-[#131316d9] backdrop-blur-sm'>
            <div className='navbar flex justify-between items-center h-16'>
                <div className="h-16 flex items-center justify-center p-2 pl-0">
                    <img src="../logo.png" alt="logo" className="h-full object-contain" />
                </div>

                <div className="menu-bar inline-flex gap-1 lg:gap-3 items-center ">
                    {links.map((link) => (
                        <span
                            key={link.href}
                            className={`${pathname === link.href ? 'bg-[#09090b20] rounded-full backdrop-blur-[10px]' : ''}`}
                        >
                            <Link href={link.href}>
                                {link.name}
                            </Link>
                        </span>
                    ))}
                </div>

                <div className='flex flex-row gap-4'>
                    <Link href="/cart">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="cartBtn relative rounded-full p-0.5 text-[0.95rem] leading-none hover:bg-[#222226a6]">
                                        {cartItems.length > 0 && (
                                            <div className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                                                {cartItems.length}
                                            </div>
                                        )}
                                        <div className="button-overlay"></div>
                                        <span className='rounded-full p-2.5 gap-3'>
                                            <svg className="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className="product"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path></svg>
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className='z-1000'>
                                    <p className='text-white'>Go to Cart</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>

                    {/* Conditional rendering based on user state */}
                    {user ? <UserGreeting /> : <LoginButton />}
                </div>
            </div>

            <div className='small-navbar h-16'>
                <div className='w-full flex justify-between items-center'>
                    <img src="../logo.png" alt="logo" style={{ width: '9rem' }} />

                    <div className='flex flex-row gap-4 z-1000'>
                        <Link href="/cart" onClick={() => setNavOpen(false)}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="cartBtn relative rounded-full p-0.5 text-[0.95rem] leading-none hover:bg-[#222226a6]">
                                            {cartItems.length > 0 && (
                                                <div className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                                                    {cartItems.length}
                                                </div>
                                            )}
                                            <div className="button-overlay"></div>
                                            <span className='rounded-full p-2.5 gap-3'>
                                                <svg className="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className="product"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path></svg>
                                            </span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className='z-1000'>
                                        <p className='text-white'>Go to Cart</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Link>

                        <label className="hamburger pr-3">
                            <input
                                type="checkbox"
                                className="hamburger-checkbox"
                                checked={isNavOpen}
                                onChange={toggleNav}
                            />
                            <svg viewBox="0 0 32 32">
                                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                <path className="line" d="M7 16 27 16"></path>
                            </svg>
                        </label>
                    </div>
                </div>

                <nav ref={navMenuRef} className={`nav-menu ${isNavOpen ? 'open' : ''}`}>
                    <div className="flex flex-col items-center">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`navlink ${pathname === link.href ? 'active' : ''}`}
                                onClick={closedNav}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className='mt-[4rem]'>
                            {user ? (
                                <UserGreeting />
                            ) : (
                                <LoginButton />
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;