'use client'

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/cart/store";
import { addToCart, removeFromCart, decreaseQuantity } from "@/lib/cart/cartSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-6 ">
        {/* Cart Items */}
        <div className="col-span-2 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <Card key={item.id} className="shadow-lg p-4 flex flex-row relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <CardContent className="flex-1 px-1 sm:px-4">
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>Color: {item.color}</CardDescription>
                  <CardDescription className="text-sm text-gray-500">Size: {item.size}</CardDescription>
                  <p className="text-lg font-semibold mt-2">${item.price.toFixed(2)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => dispatch(decreaseQuantity(item.id))}>
                      <Minus size={16} />
                    </Button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => dispatch(addToCart(item))}>
                      <Plus size={16} />
                    </Button>
                  </div>
                </CardContent>
                <Button
                  variant="outline"
                  className="absolute top-2 right-2 hover:bg-red-300"
                  size="icon"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <Trash2 size={16} />
                </Button>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Checkout Section */}
        <Card className="shadow-lg p-4 pb-5 h-[fit-content] mt-5 sm:mt-0">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-lg font-semibold">
              <p>Total</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <Button className="mt-4 w-full" disabled={items.length === 0}>
              <ShoppingCart size={18} className="mr-2" /> Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
