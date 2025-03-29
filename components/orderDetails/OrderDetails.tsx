"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/cart/store";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Download } from "lucide-react";
import { Label } from "../ui/label";
import { format } from 'date-fns'
import { jsPDF } from 'jspdf';

// Define the type for Order and OrderItem
interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  discounted_price: number;
}

interface Order {
  order_id: string;
  buyer_name: string;
  buyer_address: string;
  buyer_phone: string;
  email: string;
  status: string;
  landmark: string;
  order_at: string;
  item_list: OrderItem[];
  total_price: number;
  total_calculated_price: number;
}


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
          const sortedOrders = result.data.sort((a: { order_at: string | null }, b: { order_at: string | null }) => {
            const dateA = a.order_at ? new Date(a.order_at).getTime() : 0;
            const dateB = b.order_at ? new Date(b.order_at).getTime() : 0;
            return dateB - dateA;
          });

          console.log(sortedOrders)

          setOrders(sortedOrders);
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


  const generateReceiptPDF = (orderData: Order) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;
  
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
  
    // Header
    doc.setFillColor(0, 122, 255);
    doc.rect(0, y - 10, pageWidth, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Mateng - Thank You for Ordering", pageWidth / 2, y, { align: "center" });
    y += 15;
  
    // Order Details
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${orderData.order_id}`, 20, y);
    y += 8;
    doc.text(`Name: ${orderData.buyer_name}`, 20, y);
    y += 8;
    doc.text(`Address: ${orderData.buyer_address}`, 20, y);
    y += 8;
    doc.text(`Phone: ${orderData.buyer_phone}`, 20, y);
    y += 8;
    doc.text(`Email: ${orderData.email}`, 20, y);
    y += 8;
    doc.text(`Landmark: ${orderData.landmark}`, 20, y);
    y += 8;
    doc.text(`Payment Mode: Cash on Delivery`, 20, y);
    y += 8;
    doc.text(`Order Date: ${format(new Date(orderData.order_at), "dd MMM, yyyy - h:mm a")}`, 20, y);
    y += 12;
  
    // Table Header
    doc.setFillColor(220, 220, 220);
    doc.rect(20, y - 5, pageWidth - 40, 10, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("Product Name", 25, y);
    doc.text("Qty", 100, y);
    doc.text("MRP", 130, y);
    doc.text("Offer Price", 160, y);
    y += 8;
    doc.line(20, y, 190, y);
    y += 6;
  
    // Product List
    doc.setFont("helvetica", "normal");
    orderData.item_list.forEach((item: OrderItem) => {
      doc.text(item.product_name, 25, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`Rs. ${item.price.toFixed(2)}`, 140, y, { align: "right" });
      doc.setTextColor(0, 150, 0);
      doc.text(`Rs. ${item.discounted_price.toFixed(2)}`, 185, y, { align: "right" });
      doc.setTextColor(0, 0, 0);
      y += 8;
    });
  
    // Totals Section
    y += 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 5, pageWidth - 40, 30, "F");
    doc.setFont("helvetica", "bold");
    doc.text(`Total MRP:`, 25, y);
    doc.text(`Rs. ${orderData.total_price.toFixed(2)}`, 185, y, { align: "right" });
    y += 10;
    const discount = orderData.total_price - orderData.total_calculated_price;
    doc.setTextColor(200, 0, 0);
    doc.text(`You saved:`, 25, y);
    doc.text(`-Rs. ${discount.toFixed(2)}`, 185, y, { align: "right" });
    doc.setTextColor(0, 0, 0);
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 150, 0);
    doc.text(`Payable Amount:`, 25, y);
    doc.text(`Rs. ${orderData.total_calculated_price.toFixed(2)}`, 185, y, { align: "right" });
  
    // Save PDF
    doc.save(`Receipt_${orderData.order_id}.pdf`);
  };
  

  return (
    <div className="container mx-auto grid gap-4 ">
      <h1 className="text-xl sm:text-2xl font-bold text-left col-span-2 ">Your Order Details</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order) => (
          <Card key={order.order_id} className="shadow-lg py-6 col-span-2 lg:col-span-1 gap-2 h-fit">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-xl">Order ID: {order.order_id}</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      className="bg-black border p-2 rounded-md"
                      onClick={() => generateReceiptPDF(order)}
                    >
                      <Download size={18} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-white">Download Reciept</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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
                  <div className="flex justify-between items-start">
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
