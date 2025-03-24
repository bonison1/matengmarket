'use client';

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/cart/store";
import { addToCart, removeFromCart, decreaseQuantity } from "@/lib/cart/cartSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import Image from 'next/image'
import { Label } from "@/components/ui/label";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  // Calculate Total Original Price (MRP) without discounts
  const totalOriginalPrice = items.reduce((acc, item) => {
    return acc + (item.price_inr ?? 0) * item.quantity;
  }, 0);

  const totalDiscount = totalOriginalPrice - totalPrice;

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-6">
      <Label className="text-2xl font-bold mb-4 sm:mb-6">🛒 Shopping Cart</Label>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="col-span-2 space-y-6">
          {items.length > 0 ? (
            items.map((item) => {
              const itemPrice = item.discounted_price ?? item.price_inr;
              return (
                <Card key={item.id} className="shadow-lg p-4 flex flex-row gap-4 relative">
                  {/* Product Image */}
                  <Image
                    src={item.media_urls?.[0] || "/unavailable.jpg"}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />

                  {/* Product Details */}
                  <CardContent className="flex-1 px-1 sm:px-4">
                    <CardTitle className="text-base sm:text-lg md:text-xl">{item.name}</CardTitle>
                    {item.unit_quantity && (
                      <CardDescription className="text-xs sm:text-sm text-gray-600">
                        {item.unit_quantity}
                      </CardDescription>
                    )}

                    {/* Price Section */}
                    <div className="mt-2">
                      <p className="text-xs sm:text-sm text-gray-500 line-through">
                        MRP: ₹{item.price_inr.toFixed(2)}
                      </p>
                      <p className="text-base font-semibold text-green-600">
                        Discount Price: ₹{itemPrice.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </CardContent>

                  {/* Remove Button */}
                  <Button
                    variant="outline"
                    className="absolute top-2 right-2 hover:bg-red-300"
                    size="icon"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash2 size={16} />
                  </Button>
                </Card>
              );
            })
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Checkout Section */}
        <Card className="shadow-lg py-6 col-span-2 lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-base">
              <p>Total MRP</p>
              <p>₹{totalOriginalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base">
              <p>Discount</p>
              <p className="text-green-600">-₹{totalDiscount > 0 ? totalDiscount.toFixed(2) : "0.00"}</p>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <p>Grand Total</p>
              <p>₹{totalPrice.toFixed(2)}</p>
            </div>
            <Button className="mt-4 w-full bg-gradient-to-t from-stone-900 to-stone-700" disabled={items.length === 0}>
              <ShoppingCart size={18} className="mr-2" /> Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
