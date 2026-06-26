import React, { useState, useEffect } from "react";

export default function Countdown() {
  const weddingDate = new Date("2026-08-02T10:00:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0")
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <div className="flex justify-center gap-stack-lg max-w-md mx-auto py-2">
      <div className="flex flex-col items-center min-w-[70px]">
        <span className="font-display-lg text-headline-md md:text-display-lg text-primary transition-all duration-300">
          {timeLeft.days}
        </span>
        <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">
          HARI
        </span>
      </div>
      
      <div className="w-px h-16 bg-outline-variant/50 self-center"></div>
      
      <div className="flex flex-col items-center min-w-[70px]">
        <span className="font-display-lg text-headline-md md:text-display-lg text-primary transition-all duration-300">
          {timeLeft.hours}
        </span>
        <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">
          JAM
        </span>
      </div>
      
      <div className="w-px h-16 bg-outline-variant/50 self-center"></div>
      
      <div className="flex flex-col items-center min-w-[70px]">
        <span className="font-display-lg text-headline-md md:text-display-lg text-primary transition-all duration-300">
          {timeLeft.minutes}
        </span>
        <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">
          MENIT
        </span>
      </div>

      <div className="w-px h-16 bg-outline-variant/50 self-center"></div>
      
      <div className="flex flex-col items-center min-w-[70px]">
        <span className="font-display-lg text-headline-md md:text-display-lg text-primary transition-all duration-300">
          {timeLeft.seconds}
        </span>
        <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">
          DETIK
        </span>
      </div>
    </div>
  );
}
