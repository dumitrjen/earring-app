"use client";

import React, { useState, useEffect } from "react";
import Earrings from "./Earring";

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

const EarringCollection = () => {
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

  return <Earrings items={items} />;
};

export default EarringCollection;