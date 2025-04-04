'use client';

import Navbar from "@/components/navbar/navbar";
import { Provider } from "react-redux";
import { store } from "@/lib/cart/store";
import CartLoader from "@/components/cart-loader";
import UserLoader from "@/components/user-loader";
import StorageWatcher from "@/components/storage-watcher";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Provider store={store}>
        <div className="w-[100vw] custom-bg relative">
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="bg-overlay"></div>
          <UserLoader />
          <CartLoader />
          <StorageWatcher />
          <Navbar />
          {children}
        </div>
      </Provider>
    </>
  );
}