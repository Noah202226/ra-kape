"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";

export default function ReceiptGenerator({ order }) {
  const receiptRef = useRef(null);

  const downloadReceipt = async () => {
    const canvas = await html2canvas(receiptRef.current);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `receipt-${order.orderId}.png`;
    link.click();
  };

  return (
    <div className="p-4">
      <div
        ref={receiptRef}
        className="bg-white shadow-xl rounded-lg p-6 w-full max-w-sm mx-auto text-black"
      >
        <h2 className="text-xl font-bold text-center mb-4">🧾 Receipt</h2>
        <div className="text-sm space-y-1">
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Date:</strong> {new Date(order.date).toLocaleString()}
          </p>
          <p>
            <strong>Name:</strong> {order.customerName}
          </p>
          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>
        </div>

        <hr className="my-3" />

        <div className="text-sm">
          <p className="font-bold mb-1">Items:</p>
          <ul className="list-disc ml-4 space-y-1">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} × {item.qty} = ₱{item.qty * item.price}
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-3" />

        <p className="text-right font-bold text-lg">Total: ₱{order.total}</p>
      </div>

      <div className="mt-4 text-center">
        <button onClick={downloadReceipt} className="btn btn-primary">
          Download Receipt
        </button>
      </div>
    </div>
  );
}
