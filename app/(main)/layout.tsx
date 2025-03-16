'use client'

import Navbar from "@/components/navbar/navbar";
import { Provider } from "react-redux";
import { store } from "@/lib/cart/store";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        {children}
      </Provider>
    </>
  );
}
