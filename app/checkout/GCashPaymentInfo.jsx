"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";

export default function GCashPaymentInfo() {
  const [copied, setCopied] = useState(false);

  const gcashNumber = "09081232985";
  const gcashName = "JUSTINE M.";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gcashNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className="mt-6 p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                 border border-gray-700 rounded-xl shadow-lg text-white text-center"
      data-aos="fade-up"
      data-aos-offset="100"
      data-aos-easing="ease-in-sine"
    >
      <h3 className="text-2xl font-bold mb-3 text-amber-400 tracking-wide">
        Pay via GCash
      </h3>

      <p className="text-sm text-gray-300 mb-5">
        Scan the QR code below or send your payment directly to our GCash
        account.
      </p>

      {/* QR CODE */}
      <div className="flex justify-center mb-5">
        <div className="p-2 bg-white rounded-2xl shadow-inner w-48 h-48 flex items-center justify-center">
          <Image
            src="/rakape-qr.jpg"
            alt="GCash QR Code"
            width={180}
            height={180}
            className="rounded-xl"
          />
        </div>
      </div>

      {/* ACCOUNT DETAILS */}
      <div className="space-y-2">
        <p className="text-gray-300">
          <span className="font-semibold text-white">Account Name:</span>{" "}
          {gcashName}
        </p>

        <div className="flex justify-center items-center gap-2 text-gray-300">
          <span className="font-semibold text-white">GCash Number:</span>
          <span className="text-amber-400 font-mono text-lg">
            {gcashNumber}
          </span>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="ml-1 p-2 bg-gray-700 hover:bg-amber-500 rounded-full transition-colors relative group"
            aria-label="Copy GCash number"
          >
            {copied ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Copy className="w-4 h-4 text-white" />
            )}
            {/* Tooltip */}
            <span
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs 
                         px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
      </div>

      {/* NOTE */}
      <p className="mt-5 text-xs italic text-gray-400">
        💡 After sending your payment, please upload your receipt below to
        verify your order.
      </p>
    </div>
  );
}
