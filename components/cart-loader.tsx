'use client';

import React, { useEffect } from 'react';
import { hydrateCart } from "@/lib/cart/cartSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/cart/store';

export default function CartLoader() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      try {
        const parsedCart = JSON.parse(cartData);
        dispatch(hydrateCart(parsedCart));  
      } catch (err) {
        console.error('Failed to load cart from localStorage', err);
      }
    }
  }, [dispatch]);

  return null;
}
