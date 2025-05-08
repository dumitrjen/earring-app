"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const BasketPage = () => {
  const router = useRouter();
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    if (!storedUserId) {
      setLoading(false);
      return;
    }

    const fetchBasket = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/basket/${storedUserId}`);
        const data = await res.json();
        setBasketItems(data);
      } catch (err) {
        console.error("Error fetching basket:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBasket();
  }, []);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleIncrease = async (id: number) => {
    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    // Optionally, update the backend
    await fetch(`/api/basket/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "increase" }),
    });
  };

  const handleDecrease = async (id: number) => {
    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    // Optionally, update the backend
    await fetch(`/api/basket/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "decrease" }),
    });
  };

  const handleRemove = async (id: number) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));

    // Optionally, update the backend
    await fetch(`/api/basket/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  const calculateTotal = () => {
    return basketItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!userId) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg mb-4">Please log in to view your basket.</p>
        <button
          onClick={handleLoginRedirect}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Basket</h1>
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 max-w-4xl">
        {basketItems.length === 0 ? (
          <p className="text-center text-gray-600">Your basket is empty.</p>
        ) : (
          <div className="space-y-6">
            {basketItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {basketItems.length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: ${calculateTotal()}
            </h3>
            <button className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketPage;