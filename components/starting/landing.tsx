"use client";

import React from "react";
import { useTheme } from "next-themes";
import "./landing.css";

export default function Landing() {
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  const text = "mateng";

  return (
    <div className="landing flex flex-col items-center justify-center w-[100vw] h-[90vh] sm:h-[100vh]">
      <div className="relative">
        <div className="logo">
          {text.split("").map((char, index) => (
            <span key={index} className="letter">
              {char}
            </span>
          ))}
        </div>
        <div className="tagline absolute bottom-0">
          meeting people's needs
        </div>
      </div>
    </div>
  );
}
