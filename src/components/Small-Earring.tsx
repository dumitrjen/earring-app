"use client";

import React from "react";
import Image from "next/image";
import { Pencil, Plus, Minus } from "lucide-react";

interface SmallEarringProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  onEdit: () => void;
  onAdd: () => void;
  onRemove: () => void;
}

const SmallEarring: React.FC<SmallEarringProps> = ({
  name,
  price,
  imageUrl,
  onEdit,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={300}
        className="w-24 h-24 object-cover rounded-full mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>

      {/* Floating Buttons */}
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1"
          title="Add"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={onRemove}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
          title="Remove"
        >
          <Minus size={16} />
        </button>
      </div>
    </div>
  );
};

export default SmallEarring;
