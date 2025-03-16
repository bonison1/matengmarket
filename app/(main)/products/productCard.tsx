import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Info, ShoppingBasket, Plus, Minus } from "lucide-react";
import "./productCard.css";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductCard() {
    // State to control dialog visibility
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <div className="poppins w-[300px] h-[400px] flex flex-col bg-transparent border-r border-b p-4 pt-0 m-1">
                {/* Image container with click event */}
                <div
                    className="bg-gray-300 w-full h-3/4 rounded-xl overflow-hidden relative cursor-pointer"
                    onClick={() => setIsDialogOpen(true)} // Open dialog on image click
                >
                    <img src="./Chips.jpg" alt="img" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                        <button
                            className="details-btn absolute text-stone-200 top-0 right-0"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering image click
                                setIsDialogOpen(true);
                            }}
                        >
                            <div className="details-sign flex justify-center items-center p-0 rounded-full  relative overflow-hidden">
                                <Info />
                            </div>
                            <div className="details-text">Details</div>
                        </button>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-top mt-2 text-stone-900 text-xl font-semibold px-1">
                    <div className="flex flex-col leading-none">
                        <CardTitle>Uncle Chips</CardTitle>
                    </div>
                    <span className="w-[fit-content] text-xs text-[#4371BB] bg-[#B8C7DF57] mb-auto py-1.5 px-3 rounded-full leading-none">
                        40 g
                    </span>
                </div>

                <div className="flex flex-col justify-between p-1">
                    <div className="flex flex-col items-start font-semibold mb-2">
                        <CardDescription className="line-through text-xs">MRP: ₹129</CardDescription>
                        <CardDescription className="text-[#4C4646]">Discount Price: ₹98</CardDescription>
                    </div>

                                               
                    <div className="flex flex-row justify-between gap-2">
                        <Button className="bg-gradient-to-b from-[#38D932] to-[#12850E]">
                            Add to Cart <ShoppingBasket className="mb-1" />
                        </Button>
                        <div className="flex items-center justify-between text-[#624b4b] w-32 border rounded-md shadow-md bg-neutral-100/70 text-gray-900">
                            <button className="px-2 border-r border-[#C3C2B6]">
                                <Minus size={18} />
                            </button>
                            <span className="text-base text-[#876767] font-medium">0</span>
                            <button className="px-2 border-l border-[#C3C2B6]">
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog controlled by isDialogOpen state */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="pt-4 mt-[2rem]">
                    <DialogHeader className="gap-1 text-left">
                        <DialogTitle className="text-xl leading-none">Product Details</DialogTitle>
                        <DialogTitle className="mt-4">Uncle Chips</DialogTitle>
                        <DialogDescription>
                            40 g per packet
                        </DialogDescription>
                        <DialogDescription>
                            Here are the details of the product. You can add more content as needed.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-row gap-5">
                        <div className="h-84 w-72 bg-stone-300">
                            <img src="./Chips.jpg" alt="img" className="w-full h-full object-cover" />
                        </div>
                        <ScrollArea>
                            <div className="flex flex-col h-84 gap-5 pr-4">
                                <div className="max-w-20 max-h-20 bg-stone-300">
                                    <img src="./Chips.jpg" alt="img" className="w-full h-full object-cover" />
                                </div>
                                <div className="max-w-20 max-h-20 bg-stone-300">
                                    <img src="./Chips.jpg" alt="img" className="w-full h-full object-cover" />
                                </div>
                                <div className="max-w-20 max-h-20 bg-stone-300">
                                    <img src="./Chips.jpg" alt="img" className="w-full h-full object-cover" />
                                </div>
                                <div className="max-w-20 max-h-20 bg-stone-300">
                                    <img src="./Chips.jpg" alt="img" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="flex flex-col items-start font-semibold">
                        <CardDescription className="line-through text-xs">MRP: ₹129</CardDescription>
                        <CardDescription className="text-[#4C4646]">Discount Price: ₹98</CardDescription>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
