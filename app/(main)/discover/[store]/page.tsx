'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, Mail, CircleUserRound, MapPin } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Rating from '@/components/rating/rating';
import { StoreDetails } from '@/utils/types/storeDetails';
import { Skeleton } from '@/components/ui/skeleton';
import { Product } from '@/utils/types/product';
import Loader from '@/components/loader/loader';
import ProductCard from '@/components/product/productCard';

export default function Page() {
  const { store } = useParams<{ store: string }>();
  const [storeDetails, setStoreDetails] = useState<StoreDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  // Fetch store details
  useEffect(() => {
    if (store) {
      fetchStoreDetails(store, setStoreDetails);
      fetchProducts();
    }
  }, [store]);
  

  const fetchStoreDetails = async (store: string, setStoreDetails: React.Dispatch<React.SetStateAction<StoreDetails | null>>) => {
    try {
      const res = await axios.get<{ success: boolean; data: StoreDetails }>(`/api/stores/${store}`);
      setStoreDetails(res.data.data);
    } catch (error) {
      console.error('Failed to fetch store details:', error);
    }
  };

  const fetchProducts = async () => {
          setProductLoading(true)
          try {
              const response = await fetch(`/api/stores/storeProduct/${store}`)
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
                  // setFilteredProducts(productsArray)
                  // console.log(productsArray)
              }
  
          } catch (error) {
              console.error("Error fetching products:", error)
          } finally {
              setProductLoading(false)
          }
      }
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Please enter a comment.');
      return;
    }

    console.log('Submitted Data:', { rating, comment });
    alert('Thank you for your feedback! 🎉');
    setRating(0);
    setComment('');
  };

  if (!storeDetails) {
    return (
      <div className="flex flex-col justify-center items-start h-screen bg-white relative">
        <div className="w-full relative">
          <Skeleton className="w-[100vw] h-64 flex items-center justify-center" />
          <div className="w-full absolute -bottom-24 flex justify-center">
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-gray-200">
              <Skeleton className="w-44 h-44 rounded-full object-cover" />
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1400px] mx-auto mt-[7rem] mb-5 p-4 relative">
          <div className='my-3 text-center'>Loading...</div>
          <div className="flex justify-center gap-10">
            <Skeleton className="w-1/3 h-56" />
            <Skeleton className="w-1/3 h-56" />
            <Skeleton className="w-1/3 h-56" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#efeee7] min-h-screen flex flex-col items-center justify-start relative">
      <ScrollArea>
        <div className="h-[100svh]">
          {/* Store Cover */}
          <div className="w-full relative">
            <div className="w-[100vw] h-86 bg-stone-700 flex items-center justify-center">
              <BackgroundBeams className="w-full h-86 bg-stone-800 overflow-hidden" />
              <span className="text-gray-100 text-4xl font-bold z-10 mix-blend-overlay">
                {storeDetails.photo ? 'Cover Photo' : 'No Cover Photo Available'}
              </span>
            </div>

            <div className="w-full absolute -bottom-24 flex justify-center">
              <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-gray-200">
                <img
                  src={storeDetails.photo || "../unavailable.jpg"}
                  alt="logo"
                  className="w-44 h-44 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Store Details */}
          <div className="mt-[6.2rem] flex flex-col justify-center items-center">
            <CardTitle className="text-2xl font-bold capitalize">{storeDetails.business_name}</CardTitle>
            <CardDescription className="text-base capitalize">{storeDetails.business_type}</CardDescription>

            <CardDescription className="flex flex-row gap-3 text-base leading-none my-1">
              <span className="flex flex-row items-center pr-3 gap-2 border-r-3 border-stone-400/60">
                <Phone size={16} className="text-green-400" /> {storeDetails.phone || 'N/A'}
              </span>
              <span className="flex flex-row items-center pr-3 gap-2 border-r-3 border-stone-400/60">
                <Mail size={16} className="text-blue-400" /> {storeDetails.email}
              </span>
              <span className="flex flex-row items-center gap-2 capitalize">
                <CircleUserRound size={16} className="text-orange-300 " /> {storeDetails.name}
              </span>
            </CardDescription>

            <Rating rating={storeDetails.ratings || 0} editable={false} size={24} />

            <CardDescription className="flex flex-row items-center gap-2 text-base capitalize">
              <MapPin size={16} className='text-red-400' />{storeDetails.business_address}
            </CardDescription>
            <CardDescription>{storeDetails.product_service}</CardDescription>
            <CardDescription>{storeDetails.business_description}</CardDescription>
            <CardDescription>{storeDetails.categories}</CardDescription>
          </div>

          {/* Products Section */}
          <div className="w-full max-w-[1400px] mx-auto mt-10 mb-5 p-4 relative">
            <div className="flex justify-center">
              <div className="flex flex-col gap-8 pb-10 w-full">
                {productLoading ? (
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
                ) : productError ? (
                  <div className="text-center text-red-500">{productError}</div>
                ) : products.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {products.map((product: Product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-600">No products found.</div>
                )}
              </div>
            </div>
          </div>

          {/* Comment Section */}
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
                    className="h-24"
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
  );
}
