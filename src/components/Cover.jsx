import React from "react";

export default function Cover({ onOpen }) {
  // Read name parameter from the query string (?to=Name)
  const getGuestName = () => {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get("to");
    return guestName ? decodeURIComponent(guestName) : "Tamu Undangan";
  };

  const guestName = getGuestName();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-surface p-gutter text-center transition-transform duration-1000 ease-in-out">
      {/* Background Image with blur & dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover object-[center_65%] md:object-[center_70%] brightness-[0.85]"
          src="/foto1.jpeg"
          alt="Wedding Venue Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      </div>

      {/* Decorative Botanical Border Overlay */}
      <div className="absolute inset-8 z-10 border border-primary-container/30 rounded-xl pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full max-w-lg mx-auto py-8 px-4 overflow-y-auto">
        <span className="font-label-caps text-label-caps text-primary-fixed tracking-[0.4em] mb-stack-md block">
          THE WEDDING OF
        </span>

        <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-primary-fixed mb-stack-sm drop-shadow-md flex flex-col items-center leading-tight gap-1 text-center">
          <span>Muh Ikhsan Adiputra</span>
          <span className="text-2xl sm:text-3xl italic font-serif my-1 text-primary-fixed-dim">&amp;</span>
          <span>Nurul Ilmy Ikbal</span>
        </h1>

        <div className="w-16 h-px bg-outline-variant/60 my-6"></div>

        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-outline-variant/20 mb-8 w-full">
          <p className="font-label-caps text-[11px] tracking-widest text-primary-fixed-dim/90 mb-2">
            KEPADA YTH. BAPAK/IBU/SAUDARA/I:
          </p>
          <h2 className="font-headline-sm text-headline-sm text-white font-semibold tracking-wide">
            {guestName}
          </h2>
        </div>

        <p className="font-body-md text-body-md text-white/80 mb-stack-lg italic">
          *Mohon maaf apabila ada kesalahan penulisan nama/gelar
        </p>

        <button
          onClick={onOpen}
          className="group relative inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-8 py-4 rounded-full font-label-caps text-label-caps tracking-widest transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95"
        >
          BUKA UNDANGAN
          <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-y-1">
            keyboard_double_arrow_down
          </span>
        </button>
      </div>
    </div>
  );
}
