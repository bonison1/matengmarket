"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes"
import "./landing.css";

export default function Landing() {

  const { setTheme } = useTheme()

    useEffect(() => {
        setTheme("dark")
    },[])

  const text = "mateng";
  const [finalAnimation, setFinalAnimation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFinalAnimation(false); 

    const timer = setTimeout(() => {
      setFinalAnimation(true);

      setTimeout(() => {
        router.push("/home"); 
      }, 1500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="landing flex flex-col items-center justify-center w-[100vw] h-[90vh] sm:h-[100vh]">
      <div className={`relative transition-all ${finalAnimation ? "logo-move" : ""}`}>
        <div className={`logo ${finalAnimation ? "shrink" : ""}`}>
          {text.split("").map((char, index) => (
            <span key={index} className="letter" style={{ animationDelay: `${index * 0.2}s` }}>
              {char}
            </span>
          ))}
        </div>
        <div className={`tagline absolute bottom-0 opacity-0 animate-fade-in ${finalAnimation ? "tagline-move" : ""}`}>
          meeting people's needs
        </div>
      </div>
    </div>
  );
}
