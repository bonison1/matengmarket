// import { Card, CardDescription, CardTitle } from "@/components/ui/card";
// import React, { useState } from "react";
// import { Info, ShoppingBasket, Plus, Minus } from "lucide-react";
// import "./productCard.css";
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Product } from "@/utils/types/product";
// import imageCompression from 'browser-image-compression';

// export default function ProductCard({ product }: { product: Product }) {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(product.media_urls?.[0] || "/unavailable.jpg");

//     return (
//         <>
//             <div className="poppins w-[320px] h-[470px] flex flex-col bg-transparent border-r border-b p-4 pt-0 m-1">
//                 {/* Image container with lazy loading */}
//                 <div
//                     className="bg-gray-300 w-full h-3/4 rounded-xl overflow-hidden relative cursor-pointer"
//                     onClick={() => setIsDialogOpen(true)}
//                 >
//                     <img
//                         src={product.media_urls?.[0] || "./unavailable.jpg"}
//                         alt={product.name}
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                         onError={(e) => { e.currentTarget.src = "./unavailable.jpg"; }}
//                     />
//                     <div className="absolute top-2 right-2">
//                         <button
//                             className="details-btn absolute text-stone-200 top-0 right-0"
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 setIsDialogOpen(true);
//                             }}
//                         >
//                             <div className="details-sign flex justify-center items-center p-0 rounded-full relative overflow-hidden">
//                                 <Info />
//                             </div>
//                             <div className="details-text">Details</div>
//                         </button>
//                     </div>
//                 </div>

//                 <div className="flex flex-row justify-between items-top mt-2 text-stone-900 text-xl font-semibold px-1">
//                     <div className="flex flex-col leading-none w-3/4">
//                         <CardTitle className="text-sm">{product.name}</CardTitle>
//                     </div>
//                     <span className="w-fit text-xs text-[#4371BB] bg-[#B8C7DF57] mb-auto py-1.5 px-3 rounded-full leading-none">
//                         {product.unit_quantity || "n/a"}
//                     </span>
//                 </div>

//                 <div className="flex flex-col justify-between p-1">
//                     <div className="flex flex-col items-start font-semibold mb-2">
//                         <CardDescription className="line-through text-xs">MRP: ₹{product.price_inr}</CardDescription>
//                         <CardDescription className="text-[#4C4646]">Discount Price: ₹{product.discounted_price}</CardDescription>
//                     </div>

//                     <div className="flex flex-row justify-between gap-2">
//                         <Button className="bg-gradient-to-b from-[#38D932] to-[#12850E]">
//                             Add to Cart <ShoppingBasket className="mb-1" />
//                         </Button>
//                         <div className="flex items-center justify-between text-[#624b4b] w-32 border rounded-md shadow-md bg-neutral-100/70 text-gray-900">
//                             <button className="px-2 border-r border-[#C3C2B6]">
//                                 <Minus size={18} />
//                             </button>
//                             <span className="text-base text-[#876767] font-medium">0</span>
//                             <button className="px-2 border-l border-[#C3C2B6]">
//                                 <Plus size={18} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Dialog controlled by isDialogOpen state */}
//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                 <DialogContent className="pt-4 mt-[2rem]">
//                     <DialogHeader className="gap-1 text-left">
//                         <DialogTitle className="text-xl leading-none">Product Details</DialogTitle>
//                         <DialogTitle className="mt-4">{product.name}</DialogTitle>
//                         <DialogDescription>{product.unit_quantity || "n/a"}</DialogDescription>
//                         <DialogDescription>{product.description}</DialogDescription>
//                     </DialogHeader>

//                     <div className="flex flex-row gap-5">
//                         {/* Large Image Preview with lazy loading */}
//                         <div className="h-84 w-72 bg-stone-300">
//                             <img
//                                 src={selectedImage}
//                                 alt="Product Image"
//                                 className="w-full h-full object-cover"
//                                 loading="lazy"
//                                 onError={(e) => (e.currentTarget.src = "/unavailable.jpg")}
//                             />
//                         </div>

//                         {/* Scrollable Thumbnail Images */}
//                         <ScrollArea>
//                             <div className="flex flex-col h-84 gap-5 pr-4 overflow-y-auto">
//                                 {(product.media_urls?.length) ? (
//                                     product.media_urls.map((img, index) => (
//                                         <div
//                                             key={index}
//                                             className={`max-w-20 max-h-20 bg-stone-300 cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-transparent"}`}
//                                             onClick={() => setSelectedImage(img)}
//                                         >
//                                             <img
//                                                 src={img}
//                                                 alt={`Thumbnail ${index + 1}`}
//                                                 className="w-full h-full object-cover"
//                                                 loading="lazy"
//                                                 onError={(e) => (e.currentTarget.src = "/unavailable.jpg")}
//                                             />
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="text-gray-500">No images available</div>
//                                 )}
//                             </div>
//                         </ScrollArea>
//                     </div>

//                     <div className="flex flex-col items-start font-semibold">
//                         <CardDescription className="line-through text-xs">MRP: ₹{product.price_inr}</CardDescription>
//                         <CardDescription className="text-[#4C4646]">Discount Price: ₹{product.discounted_price}</CardDescription>
//                         <CardDescription><span className="text-[#4C4646]">Seller:</span> {product.user_name}</CardDescription>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }


// import { Card, CardDescription, CardTitle } from "@/components/ui/card";
// import { useState, useRef, memo } from "react";
// import { Info, ShoppingBasket, Plus, Minus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Product } from "@/utils/types/product";
// import "./productCard.css";

// // Define the props interface for the ProductImage component
// interface ProductImageProps {
//     src: string;
//     alt: string;
//     onClick?: () => void;
//     className?: string;
// }

// // Create a separate component for the product image to prevent unnecessary re-renders
// const ProductImage = memo(({ src, alt, onClick, className = "" }: ProductImageProps) => {
//     const imgRef = useRef<HTMLImageElement>(null);

//     return (
//         <img
//             ref={imgRef}
//             src={src || "./unavailable.jpg"}
//             alt={alt}
//             className={`w-full h-full object-cover ${className}`}
//             loading="lazy"
//             onClick={onClick}
//             onError={(e) => { e.currentTarget.src = "./unavailable.jpg"; }}
//         />
//     );
// });

// ProductImage.displayName = 'ProductImage';

// // Define the props interface for the ProductDialog component
// interface ProductDialogProps {
//     product: Product;
//     isOpen: boolean;
//     onClose: () => void;
//     selectedImage: string;
//     onImageSelect: (image: string) => void;
// }

// // Create a separate component for the product dialog
// const ProductDialog = ({ product, isOpen, onClose, selectedImage, onImageSelect }: ProductDialogProps) => {
//     if (!isOpen) return null;

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="pt-4 mt-[2rem]">
//                 <DialogHeader className="gap-1 text-left">
//                     <DialogTitle className="text-xl leading-none">Product Details</DialogTitle>
//                     <DialogTitle className="mt-4">{product.name}</DialogTitle>
//                     <DialogDescription>{product.unit_quantity || "n/a"}</DialogDescription>
//                     <DialogDescription>{product.description}</DialogDescription>
//                 </DialogHeader>

//                 <div className="flex flex-row gap-5">
//                     {/* Large Image Preview */}
//                     <div className="h-84 w-3/4 bg-stone-300">
//                         <ProductImage
//                             src={selectedImage}
//                             alt="Product Image"
//                         />
//                     </div>

//                     {/* Scrollable Thumbnail Images */}
//                     <ScrollArea>
//                         <div className="flex flex-col h-84 gap-5 pr-4 overflow-y-auto">
//                             {(product.media_urls?.length) ? (
//                                 product.media_urls.map((img: string, index: number) => (
//                                     <div
//                                         key={index}
//                                         className={`max-w-20 max-h-20 bg-stone-300 cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-transparent"}`}
//                                         onClick={() => onImageSelect(img)}
//                                     >
//                                         <ProductImage
//                                             src={img}
//                                             alt={`Thumbnail ${index + 1}`}
//                                         />
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="text-gray-500">No images available</div>
//                             )}
//                         </div>
//                     </ScrollArea>
//                 </div>

//                 <div className="flex flex-col items-start font-semibold">
//                     <CardDescription className="line-through text-xs">MRP: ₹{product.price_inr}</CardDescription>
//                     <CardDescription className="text-[#4C4646]">Discount Price: ₹{product.discounted_price}</CardDescription>
//                     <CardDescription><span className="text-[#4C4646]">Seller:</span> {product.user_name}</CardDescription>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// // Define the props interface for the ProductCard component
// interface ProductCardProps {
//     product: Product;
// }

// // Main ProductCard component with memo to prevent unnecessary re-renders
// const ProductCard = memo(({ product }: ProductCardProps) => {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(product.media_urls?.[0] || "/unavailable.jpg");
//     const [quantity, setQuantity] = useState(0);

//     const incrementQuantity = () => setQuantity(prev => prev + 1);
//     const decrementQuantity = () => setQuantity(prev => Math.max(0, prev - 1));

//     const handleOpenDialog = () => setIsDialogOpen(true);
//     const handleCloseDialog = () => setIsDialogOpen(false);

//     return (
//         <>
//             <div className="poppins w-[320px] h-[470px] flex flex-col bg-transparent border-r border-b p-4 pt-0 m-1">
//                 {/* Image container */}
//                 <div
//                     className="bg-gray-300 w-full h-3/4 rounded-xl overflow-hidden relative cursor-pointer"
//                     onClick={handleOpenDialog}
//                 >
//                     <ProductImage
//                         src={product.media_urls?.[0] || "./unavailable.jpg"}
//                         alt={product.name}
//                     />
//                     <div className="absolute top-2 right-2">
//                         <button
//                             className="details-btn absolute text-stone-200 top-0 right-0"
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleOpenDialog();
//                             }}
//                         >
//                             <div className="details-sign flex justify-center items-center p-0 rounded-full relative overflow-hidden">
//                                 <Info />
//                             </div>
//                             <div className="details-text">Details</div>
//                         </button>
//                     </div>
//                 </div>

//                 <div className="flex flex-row justify-between items-top mt-2 text-stone-900 text-xl font-semibold px-1">
//                     <div className="flex flex-col leading-none w-3/4">
//                         <CardTitle className="text-sm">{product.name}</CardTitle>
//                     </div>
//                     <span className="w-fit text-xs text-[#4371BB] bg-[#B8C7DF57] mb-auto py-1.5 px-3 rounded-full leading-none">
//                         {product.unit_quantity || "n/a"}
//                     </span>
//                 </div>

//                 <div className="flex flex-col justify-between p-1">
//                     <div className="flex flex-col items-start font-semibold mb-2">
//                         <CardDescription className="line-through text-xs">MRP: ₹{product.price_inr}</CardDescription>
//                         <CardDescription className="text-[#4C4646]">Discount Price: ₹{product.discounted_price}</CardDescription>
//                     </div>

//                     <div className="flex flex-row justify-between gap-2">
//                         <Button className="bg-gradient-to-b from-[#38D932] to-[#12850E]">
//                             Add to Cart <ShoppingBasket className="mb-1" />
//                         </Button>
//                         <div className="flex items-center justify-between text-[#624b4b] w-32 border rounded-md shadow-md bg-neutral-100/70 text-gray-900">
//                             <button className="px-2 border-r border-[#C3C2B6]" onClick={decrementQuantity}>
//                                 <Minus size={18} />
//                             </button>
//                             <span className="text-base text-[#876767] font-medium">{quantity}</span>
//                             <button className="px-2 border-l border-[#C3C2B6]" onClick={incrementQuantity}>
//                                 <Plus size={18} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Product Dialog */}
//             <ProductDialog 
//                 product={product} 
//                 isOpen={isDialogOpen} 
//                 onClose={handleCloseDialog} 
//                 selectedImage={selectedImage}
//                 onImageSelect={setSelectedImage}
//             />
//         </>
//     );
// });

// ProductCard.displayName = 'ProductCard';

// export default ProductCard;


import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useState, useRef, memo, useEffect, useCallback } from "react";
import { Info, ShoppingBasket, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/utils/types/product";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity, CartProduct } from "@/lib/cart/cartSlice";
import { RootState } from "@/lib/cart/store";
import Image from 'next/image'
import "./productCard.css";

// Define the props interface for the ProductImage component
interface ProductImageProps {
    src: string;
    alt: string;
    onClick?: () => void;
    className?: string;
}

// Create a separate component for the product image to prevent unnecessary re-renders
const ProductImage = memo(({ src, alt, onClick, className = "" }: ProductImageProps) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgSrc, setImgSrc] = useState(src || "/unavailable.jpg");

    return (
        <Image
            ref={imgRef}
            src={imgSrc}
            alt={alt}
            width={600}
            height={700}
            className={`w-full h-full object-cover ${className}`}
            loading="lazy"
            onClick={onClick}
            onError={() => setImgSrc("/unavailable.jpg")}
        />
    );
});

ProductImage.displayName = 'ProductImage';

// Define the props interface for the ProductDialog component
interface ProductDialogProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    selectedImage: string;
    onImageSelect: (image: string) => void;
}

const ProductDialog = ({ product, isOpen, onClose, selectedImage, onImageSelect }: ProductDialogProps) => {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="pt-4 mt-[2rem]">
                <DialogHeader className="gap-1 text-left">
                    <DialogTitle className="text-xl leading-none">Product Details</DialogTitle>
                    <DialogTitle className="mt-4">{product.name}</DialogTitle>
                    <DialogDescription>{product.unit_quantity || "n/a"}</DialogDescription>
                    <DialogDescription>{product.description}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-row gap-5">
                    {/* Large Image Preview */}
                    <div className="h-84 w-72 bg-stone-300">
                        <ProductImage
                            src={selectedImage}
                            alt="Product Image"
                        />
                    </div>

                    {/* Scrollable Thumbnail Images */}
                    <ScrollArea>
                        <div className="flex flex-col h-84 gap-5 pr-4 overflow-y-auto">
                            {(product.media_urls?.length) ? (
                                product.media_urls.map((img: string, index: number) => (
                                    <div
                                        key={index}
                                        className={`max-w-20 max-h-20 bg-stone-300 cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-transparent"}`}
                                        onClick={() => onImageSelect(img)}
                                    >
                                        <ProductImage
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">No images available</div>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                <div className="flex flex-col items-start font-semibold">
                    <CardDescription className="line-through text-xs">MRP: ₹{product.price_inr}</CardDescription>
                    <CardDescription className="text-[#4C4646]">Discount Price: ₹{product.discounted_price}</CardDescription>
                    <CardDescription><span className="text-[#4C4646]">Seller:</span> {product.user_name}</CardDescription>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Define the props interface for the ProductCard component
interface ProductCardProps {
    product: Product;
}

// Main ProductCard component with memo to prevent unnecessary re-renders
const ProductCard = memo(({ product }: ProductCardProps) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(product.media_urls?.[0] || "./unavailable.jpg");

    // Check if the product is already in the cart
    const cartItem = cartItems.find(item => item.id === product.id);
    const isInCart = Boolean(cartItem);
    const quantity = cartItem?.quantity || 0;

    // Handle cart actions
    const handleAddToCart = () => {
        const itemPrice = product.discounted_price ?? product.price_inr ?? 0;
        const originalPrice = product.price_inr ?? 0;
      
        const cartProduct: CartProduct = {
          id: product.id,
          name: product.name,
          price_inr: product.price_inr,
          discounted_price: product.discounted_price,
          quantity: 1,
          media_urls: product.media_urls,
          unit_quantity: product.unit_quantity,
          user_name: product.user_name,
          description: product.description,
          itemPrice,
          originalPrice,
        };
      
        dispatch(addToCart(cartProduct));
      };
      

      const handleIncreaseQuantity = useCallback(() => {
        dispatch(increaseQuantity(product.id));
      }, [dispatch, product.id]);
      
      const handleDecreaseQuantity = useCallback(() => {
        dispatch(decreaseQuantity(product.id));
      }, [dispatch, product.id]);
      

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

    return (
        <>
            <div className="poppins w-[320px] h-[470px] flex flex-col bg-transparent border-r border-b p-4 pt-0 m-1">
                {/* Image container */}
                <div
                    className="bg-gray-300 w-full h-3/4 rounded-xl overflow-hidden relative cursor-pointer"
                    onClick={handleOpenDialog}
                >
                    <ProductImage
                        src={product.media_urls?.[0] || "/unavailable.jpg"}
                        alt={product.name}
                    />
                    <div className="absolute top-2 right-2">
                        <button
                            className="details-btn absolute text-stone-200 top-0 right-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog();
                            }}
                        >
                            <div className="details-sign flex justify-center items-center p-0 rounded-full relative overflow-hidden">
                                <Info />
                            </div>
                            <div className="details-text">Details</div>
                        </button>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-top mt-2 text-stone-900 text-xl font-semibold px-1">
                    <div className="flex flex-col leading-none w-3/4">
                        <CardTitle className="text-sm">{product.name}</CardTitle>
                    </div>
                    <span className="w-fit text-xs text-[#4371BB] bg-[#B8C7DF57] mb-auto py-1.5 px-3 rounded-full leading-none">
                        {product.unit_quantity || "n/a"}
                    </span>
                </div>

                <div className="flex flex-col justify-between p-1">
                    <div className="flex flex-col items-start font-semibold mb-2">
                        <CardDescription className="line-through text-xs">MRP: ₹{product.price_inr}</CardDescription>
                        <CardDescription className="text-[#4C4646]">Discount Price: ₹{product.discounted_price}</CardDescription>
                        {/* <CardDescription className="text-[#4C4646]">Quantity: {product.quantity}</CardDescription> */}
                    </div>

                    <div className="flex flex-row justify-between gap-2">
                        {Number(product.quantity ?? 0) > 0 ? (
                            <Button
                                className="bg-gradient-to-b from-[#38D932] to-[#12850E]"
                                onClick={handleAddToCart}
                            >
                                Add to Cart <ShoppingBasket className="ml-2 mb-1" />
                            </Button>
                        ) : (
                            <Button
                                className="bg-gray-400 cursor-not-allowed"
                                disabled
                            >
                                Out of Stock
                            </Button>
                        )}
                        {/* <Button
                            className="bg-gradient-to-b from-[#38D932] to-[#12850E]"
                            onClick={handleAddToCart}
                        >
                            Add to Cart <ShoppingBasket className="ml-2 mb-1" />
                        </Button> */}

                        {isInCart && (
                            <div className="flex items-center justify-between text-[#624b4b] w-32 border rounded-md shadow-md bg-neutral-100/70 text-gray-900">
                                <button
                                    className="px-2 border-r border-[#C3C2B6]"
                                    onClick={handleDecreaseQuantity}
                                    disabled={!isInCart}
                                >
                                    <Minus size={18} />
                                </button><span className="text-base text-[#876767] font-medium">{quantity}</span><button
                                    className="px-2 border-l border-[#C3C2B6]"
                                    onClick={handleIncreaseQuantity}
                                    disabled={!isInCart}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Dialog */}
            <ProductDialog
                product={product}
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
            />
        </>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;