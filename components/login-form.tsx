"use client";

import { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "./ui/card";

export function LoginForm({ className, setIsLogin, ...props }: { className?: string, setIsLogin: (val: boolean) => void }) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const { customer_id, token } = data.data;
        localStorage.setItem("customer_id", customer_id);
        localStorage.setItem("token", token);
        alert("Login Successful!");
        // Optional: Redirect or set auth state here
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-6 mt-10">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
            </a>
            <h1 className="text-xl font-bold">Welcome to Mateng</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <button type="button" onClick={() => setIsLogin(false)} className="underline underline-offset-4 text-blue-500">
                Sign up
              </button>
            </div>
          </div>

          <Card className="p-8 backdrop-blur-[15px] backdrop-saturate-[130%] bg-[rgba(28, 29, 27, 0.75)]">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="emailOrPhone">Email or Phone</Label>
                <Input
                  id="emailOrPhone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  type="text"
                  placeholder="m@example.com or 1234567890"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </Card>
        </div>
      </form>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.
      </div>
    </div>
  );
}
