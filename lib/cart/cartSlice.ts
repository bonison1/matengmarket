import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  image: string;
  name: string;
  code: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  note?: string;
}

interface CartState {
  items: Product[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [
    {
      id: 1,
      image: "/img1.jpg",
      name: "Blue Hoodie",
      code: "Hodie-B",
      color: "Blue",
      size: "M",
      price: 17.99,
      quantity: 0,
      note: "Note, 1 piece",
    },
    {
      id: 2,
      image: "/img2.jpg",
      name: "White Hoodie",
      code: "Hodie-W",
      color: "White",
      size: "M",
      price: 35.99,
      quantity: 0,
    },
    {
      id: 3,
      image: "/img3.jpg",
      name: "Blue Hoodie",
      code: "Hodie-B",
      color: "Blue",
      size: "M",
      price: 17.99,
      quantity: 0,
      note: "Note, 1 piece",
    },
    {
      id: 4,
      image: "/img4.jpg",
      name: "White Hoodie",
      code: "Hodie-W",
      color: "White",
      size: "M",
      price: 35.99,
      quantity: 0,
    },
    {
      id: 5,
      image: "/img6.jpg",
      name: "Blue Hoodie",
      code: "Hodie-B",
      color: "Blue",
      size: "M",
      price: 17.99,
      quantity: 0,
      note: "Note, 1 piece",
    },
    {
      id: 6,
      image: "/imag5.jpg",
      name: "White Hoodie",
      code: "Hodie-W",
      color: "White",
      size: "M",
      price: 35.99,
      quantity: 0,
    },
  ],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.items.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex((p) => p.id === action.payload);
      if (itemIndex >= 0) {
        state.totalPrice -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
        state.totalPrice -= item.price;
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
