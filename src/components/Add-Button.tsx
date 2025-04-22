"use client";

export default function AddToCartButton() {
  const handleAddToCart = () => {
    alert("Added to cart!");
  };

  return (
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
}