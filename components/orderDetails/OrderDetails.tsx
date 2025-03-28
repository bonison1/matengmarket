"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/cart/store";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Label } from "../ui/label";
import { format } from 'date-fns'

function OrderDetails() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchOrders = async () => {
      const buyer_id = localStorage.getItem("customer_id");
      if (!buyer_id) {
        setError("No buyer ID found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/order/buyer/getOrderByBuyerId?buyer_id=${buyer_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const result = await response.json();
        if (result.success) {
          setOrders(result.data);
        } else {
          setError(result.message || "No orders found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto grid gap-4 ">
      <h1 className="text-xl sm:text-2xl font-bold text-left col-span-2 ">Your Order Details</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order) => (
          <Card key={order.order_id} className="shadow-lg py-6 col-span-2 lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="text-xl">Order ID: {order.order_id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-base space-y-1">
                <p><strong>Name:</strong> {order.buyer_name}</p>
                <p><strong>Address:</strong> {order.buyer_address}</p>
                <p><strong>Phone No:</strong> {order.buyer_phone}</p>
                <p><strong>Order Date:</strong> {format(new Date(order.order_at), "dd MMM yyyy, hh:mm a")}</p>
              </div>
              <Separator className="my-4" />
              {order.item_list.map((item: any) => (
                  <div key={item.product_id} className="space-y-1 sm:px-4 rounded-lg ">
                      <div  className="flex justify-between items-start">
                        <div className="flex-1 pb-1.5 border-b border-dashed">
                          <Label className="font-medium text-blue-500 mb-1">{item.product_name}</Label>
                          <Label className="text-xs text-gray-500">
                            Quantity: <span className="font-medium">{item.quantity}</span>
                          </Label>
                        </div>
                        <div className="text-right border-b border-dashed">
                          <CardDescription className="text-gray-500 line-through text-xs mb-1">₹{item.price.toFixed(2)}</CardDescription>
                          <CardDescription className="font-semibold text-green-600">₹{item.discounted_price.toFixed(2)}</CardDescription>
                        </div>
                      </div>
                  {/* <Separator className="my-2" /> */}
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-base">
                  <CardDescription>Total MRP</CardDescription>
                  <CardDescription className="text-stone-300">₹{order.total_price.toFixed(2)}</CardDescription>
                </div>
                <div className="flex justify-between text-base">
                  <CardDescription>Discount</CardDescription>
                  <CardDescription className="text-green-600">-₹{(order.total_price - order.total_calculated_price).toFixed(2)}</CardDescription>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                  <CardTitle>Grand Total</CardTitle>
                  <p>₹{order.total_calculated_price.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default OrderDetails;
