"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Earring {
  id: number;
  name: string;
  description: string;
  price: number;
  material: string;
  color: string;
  style: string;
  image_url: string;
  stock_quantity: number;
}

const Earrings = ({ items }: { items: Earring[] }) => {
  const collection = items.map((item) => {
    return (
      <Link key={item.id} href={`/item-page/${item.id}`} className="block">
        <div className="relative bg-white shadow-lg rounded-xl overflow-hidden">
          <Image
            src={item.image_url}
            alt={item.name}
            width={300}
            height={300}
            className="high-resolution-image w-full object-cover rounded-t-xl"
          />
          <div className="p-8">
            <h3 className="text-indigo-800 font-semibold text-xl mt-4">
              {item.name.toUpperCase()}
            </h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-gray-800 font-bold mt-2">
              ${item.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <section className="container mx-auto -mt-8 p-16 bg-white shadow-lg rounded-xl max-w-[90%] relative">
      <h2 className="text-3xl font-semibold text-center mb-8">Collections</h2>
      <div id="collections-container" className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {collection}
      </div>
    </section>
  );
};

export default Earrings;