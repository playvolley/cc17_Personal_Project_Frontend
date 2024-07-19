import React from "react";
import { Link } from "react-router-dom";
import OrderHistory from "./OrderHistory";

export default function Order() {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-center mt-4">Order Status</h2>
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-8 bg-gray-50 w-full max-w-md mx-auto shadow-lg mt-12">
        <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white w-6 h-6"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl text-green-500 mb-2">Order Confirmed</h1>
        <p className="text-gray-600 text-center">
          Your order has been placed successfully
        </p>
        <p className="text-gray-600 text-center">
          Keep track of your order under &apos;Order History&apos;
        </p>
      </div>

      <div className="bg-gray-100 mt-64">
        <div className="flex flex-col gap-16 items-center justify-center">
          <Link
            to="/"
            className="text-center w-5/6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/orderhistory"
            className="text-center w-5/6 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          >
            Order History
          </Link>
        </div>
      </div>
    </>
  );
}
