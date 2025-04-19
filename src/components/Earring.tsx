"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

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

const Earrings = () => {
  const [items, setItems] = useState<Earring[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/earrings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">
          <div className="loader-inner">
            <div className="loader-circle"></div>
            <div className="loader-text">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const collection = items.map((item) => {
    return (
      <a
        key={item.id}
        href={`earring-details.html?earring=${item.name}`}
        className="block"
      >
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
          </div>
        </div>
      </a>
    );
  });

  return (
    <>
      <section className="container mx-auto -mt-8 p-16 bg-white shadow-lg rounded-xl max-w-[90%] relative">
        <h2 className="text-3xl font-semibold text-center mb-8">Collections</h2>
        <div id="collections-container" className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {collection}
        </div>
      </section>
    </>
  );
};

export default Earrings;