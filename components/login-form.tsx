"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/cart/store";
import { setUser } from "@/lib/cart/userSlice";
import { GalleryVerticalEnd, BellRing, Loader2 } from "lucide-react"; // Added Loader2 for spinner
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "./ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose, // Added for explicit close button
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface LoginFormProps {
  className?: string;
  setIsLogin: (val: boolean) => void;
  redirect: string;
}

export function LoginForm({ className, setIsLogin, redirect, ...props }: LoginFormProps) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [forgotDialogOpen, setForgotDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false); 
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
        const userData = data.data;
        localStorage.setItem("customer_id", userData.customer_id);
        localStorage.setItem("token", userData.token);
        dispatch(setUser(userData));

        const existingOrderId = localStorage.getItem("order_id");
        if (!existingOrderId) {
          try {
            const orderRes = await fetch(`/api/order/buyer/getLastSaveOrder?buyer_id=${userData.customer_id}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });

            const orderData = await orderRes.json();
            if (orderRes.ok && orderData.success && orderData.data?.order_id) {
              localStorage.setItem("order_id", orderData.data.order_id);
            }
          } catch (orderError) {
            console.error("Error fetching draft order:", orderError);
          }
        }

        toast.success(`Welcome back, ${userData.name}!`, { position: "top-right" });
        router.push(redirect || "/home");
      } else {
        toast.error(data.message || "Login failed", { position: "top-right" });
      }
    } catch (err: any) {
      toast.error("An error occurred. Please try again.", { position: "top-right" });
    }
  };

  const handleRequestOtp = async () => {
    if (!emailOrPhone) {
      toast.error("Please enter email", { position: "top-right" });
      return;
    }

    setIsRequestingOtp(true); // Start loading state

    try {
      const res = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrPhone }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsOtpSent(true);
        toast.success(data.message, { position: "top-right" });
      } else {
        toast.error(data.message, { position: "top-right" });
      }
    } catch (err: any) {
      toast.error("Something went wrong", { position: "top-right" });
    } finally {
      setIsRequestingOtp(false); // End loading state
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      toast.error("Please enter new password", { position: "top-right" });
      return;
    }

    try {
      const res = await fetch('/api/forgotPassword', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrPhone, otp, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, { position: "top-right" });
        setForgotDialogOpen(false);
        resetFields();
      } else {
        toast.error(data.message, { position: "top-right" });
      }
    } catch (err: any) {
      toast.error("Something went wrong", { position: "top-right" });
    }
  };

  const resetFields = () => {
    setEmailOrPhone("");
    setNewPassword("");
    setOtp("");
    setIsOtpSent(false);
    setConfirmDialogOpen(false);
    setIsRequestingOtp(false);
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
              Don't have an account?{" "}
              <button type="button" onClick={() => setIsLogin(false)} className="underline underline-offset-4 text-blue-500">
                Sign up
              </button>
            </div>
          </div>

          <Card className="p-8">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="emailOrPhone">Email / Phone</Label>
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
                  <Button type="button" variant="link" className="ml-auto text-sm p-0 h-auto" onClick={() => setForgotDialogOpen(true)}>
                    Forgot your password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full text-white">
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

      {/* Forgot Password Dialog */}
      <Dialog
        open={forgotDialogOpen}
        onOpenChange={(open) => setForgotDialogOpen(open)} // Controlled by state only
      >
        <DialogContent 
          className="w-[90%] sm:w-full"
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing on outside click
          onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing with Escape key
        >
          <DialogHeader className="text-left pb-2 mb-1 border-b">
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              {isOtpSent
                ? "Enter the OTP sent to your email and your new password"
                : "Enter your email to receive an OTP"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div>
              <Label className="mb-3">Email</Label>
              <Input
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Enter email"
                disabled={isOtpSent}
              />
            </div>

            {isOtpSent && (
              <>
                <div>
                  <Label className="mb-3">Enter OTP</Label>
                  <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div>
                  <Label className="mb-3">New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter className="flex justify-between items-center">
            {!isOtpSent ? (
              <Button 
                className="text-white mt-2" 
                onClick={handleRequestOtp}
                disabled={isRequestingOtp}
              >
                {isRequestingOtp ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Requesting...
                  </>
                ) : (
                  "Request OTP"
                )}
              </Button>
            ) : (
              <Button className="text-white mt-2" onClick={() => setConfirmDialogOpen(true)}>
                Verify OTP & Reset
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Alert Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex gap-2 items-start text-left">
              <BellRing className="w-5 text-green-500" />
              Are you sure you want to reset your password?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-end gap-4">
            <AlertDialogCancel className="w-fit">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="text-white w-fit"
              onClick={() => {
                handleResetPassword();
                setConfirmDialogOpen(false);
              }}
            >
              Yes, Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}