"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Props {
  earringId: number;
  quantity?: number;
}

export default function AddToCartButton({ earringId, quantity = 1 }: Props) {
  const router = useRouter();

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("You must log in to add to basket.");
      setTimeout(() => router.push("/login"), 2000);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(userId),
          earringId,
          quantity,
        }),
      });

      if (res.ok) {
        toast.success("Added to basket!");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to add to basket.");
      }
    } catch (err) {
      console.error("Add to cart failed", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700"
    >
      Add to Basket
    </button>
  );
}
