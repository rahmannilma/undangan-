import React, { useState } from "react";

export default function RegistryCard({ bankName, accountNumber, accountHolder }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Strip spaces for copy
    const cleanNumber = accountNumber.replace(/\s+/g, "");
    navigator.clipboard.writeText(cleanNumber)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="bg-surface p-6 border border-outline-variant/30 rounded-lg flex-1 flex flex-col justify-between items-center transition-all duration-300 hover:shadow-md">
      <div className="text-center">
        <p className="font-label-caps text-primary mb-2 font-bold tracking-widest">{bankName}</p>
        <p className="font-body-lg font-bold text-headline-sm text-on-surface mb-1">
          {accountNumber}
        </p>
        <p className="font-body-md text-on-surface-variant mb-4">{accountHolder}</p>
      </div>
      
      <button
        onClick={handleCopy}
        className={`w-full max-w-[150px] py-2 px-4 rounded-full font-label-caps text-[11px] tracking-wider border transition-all duration-300 flex items-center justify-center gap-1 focus:outline-none ${
          copied
            ? "bg-primary text-on-primary border-primary scale-95"
            : "bg-transparent text-primary border-primary hover:bg-primary/5 active:scale-95"
        }`}
      >
        <span className="material-symbols-outlined text-[14px]">
          {copied ? "check_circle" : "content_copy"}
        </span>
        {copied ? "TERSALIN!" : "SALIN REKENING"}
      </button>
    </div>
  );
}
