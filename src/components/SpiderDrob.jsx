"use client";
import { useEffect, useState } from "react";

export default function SpiderDrop() {
  const [drop, setDrop] = useState(false);

  const triggerDrop = () => {
    setDrop(true);
    setTimeout(() => {
      setDrop(false);
    }, 6000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      triggerDrop();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:flex absolute top-[-200px] right-[100px] z-40  flex-col items-center">
      
      <div
        className={`flex flex-col items-center transition-transform duration-[2000ms] ease-in-out ${
          drop ? "translate-y-[260px]" : "translate-y-0"
        }`}
      >
        <div className="w-[2px] h-[200px] bg-gradient-to-b from-white to-transparent" />

        <img
          src="/spider.png"
          alt="Spider"
          onClick={triggerDrop}
          className="w-[40px] cursor-pointer"
        />
      </div>

    </div>
  );
}