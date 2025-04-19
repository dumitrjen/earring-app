"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";

export default function Navbar() {
  return (
    <div
      className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-between p-4 shadow-lg bg-white/90 backdrop-blur-md rounded-xl max-w-[90%] w-[1200px]"
    >
      <Link href="/" className="text-md font-bold text-gray-500 ml-4">
        EarMuse
      </Link>
      <div className="flex items-center space-x-4 mr-4">
        <Link href="/about" className="text-gray-500 font-semibold">
          About us
        </Link>
        <Link href="/" className="text-gray-500 font-semibold">
          <ShoppingCartIcon className="h-6 w-6 text-gray-500" />
        </Link>
        <Link
          href="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
}