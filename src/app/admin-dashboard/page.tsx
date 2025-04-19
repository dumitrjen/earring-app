"use client";

import { useState, useEffect } from "react";
import SmallEarring from "@/components/Small-Earring";

interface Earring {
  id: number;
  name: string;
  description: string;
  price: number;
  material: string;
  style: string;
  image_url: string;
  stock_quantity: number;
}

export default function AdminDashboard() {
  const [earrings, setEarrings] = useState<Earring[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"add" | "edit" | null>(null);
  const [selectedEarring, setSelectedEarring] = useState<Earring | null>(null);

  useEffect(() => {
    console.log("Fetching earrings...");
    fetch("http://localhost:3000/api/earrings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch earrings");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched earrings:", data);
        setEarrings(data);
      })
      .catch((error) => console.error("Error fetching earrings:", error));
  }, []);

  const handleAddEarring = async (earring: Partial<Earring>) => {
    const res = await fetch("http://localhost:3000/api/earrings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(earring),
    });

    const data = await res.json();
    setEarrings([...earrings, { ...earring, id: data.id } as Earring]);
    setShowPopup(false);
  };

  const handleEditEarring = async (earring: Earring) => {
    try {
      const res = await fetch("http://localhost:3000/api/earrings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(earring),
      });
  
      const data = await res.json();
      console.log("Edit response:", res.status, data);
  
      if (res.ok) {
        setEarrings(
          earrings.map((item) => (item.id === earring.id ? earring : item))
        );
        setShowPopup(false);
      } else {
        console.error("Failed to update earring:", data);
      }
    } catch (err) {
      console.error("Edit request error:", err);
    }
  };
  

  const handleRemoveEarring = async (id: number) => {
    const res = await fetch("http://localhost:3000/api/earrings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setEarrings(earrings.filter((earring) => earring.id !== id));
    }
  };

  const openAddPopup = () => {
    setPopupType("add");
    setSelectedEarring(null);
    setShowPopup(true);
  };

  const openEditPopup = (earring: Earring) => {
    setPopupType("edit");
    setSelectedEarring(earring);
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h3 className="text-2xl font-semibold mb-4">Earring List</h3>
        {earrings.length === 0 ? (
          <p className="text-gray-600">No earrings available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {earrings.map((earring, index) => (
              <SmallEarring
                key={earring.id || index} // Use index as a fallback if id is missing
                id={earring.id}
                name={earring.name}
                price={earring.price}
                imageUrl={earring.image_url}
                onEdit={() => openEditPopup(earring)}
                onAdd={() => openAddPopup()}
                onRemove={() => handleRemoveEarring(earring.id)}
              />
            ))}
          </div>
        )}
        <button
          onClick={openAddPopup}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add New Earring
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4">
              {popupType === "add" ? "Add Earring" : "Edit Earring"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = (document.getElementById("popup-name") as HTMLInputElement).value;
                const description = (document.getElementById("popup-description") as HTMLTextAreaElement).value;
                const price = parseFloat((document.getElementById("popup-price") as HTMLInputElement).value);
                const material = (document.getElementById("popup-material") as HTMLInputElement).value;
                const style = (document.getElementById("popup-style") as HTMLInputElement).value;
                const image_url = (document.getElementById("popup-image") as HTMLInputElement).value;

                const earring = {
                  id: selectedEarring?.id,
                  name,
                  description,
                  price,
                  material,
                  style,
                  image_url,
                  stock_quantity: 0,
                };

                if (popupType === "add") {
                  handleAddEarring(earring);
                } else if (popupType === "edit") {
                  handleEditEarring(earring as Earring);
                }
              }}
            >
              <input
                type="text"
                id="popup-name"
                placeholder="Name"
                defaultValue={selectedEarring?.name || ""}
                required
                className="w-full p-2 mb-4 border rounded"
              />
              <textarea
                id="popup-description"
                placeholder="Description"
                defaultValue={selectedEarring?.description || ""}
                required
                className="w-full p-2 mb-4 border rounded"
              ></textarea>
              <input
                type="number"
                id="popup-price"
                placeholder="Price"
                defaultValue={selectedEarring?.price || ""}
                required
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                id="popup-material"
                placeholder="Material"
                defaultValue={selectedEarring?.material || ""}
                required
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                id="popup-style"
                placeholder="Style"
                defaultValue={selectedEarring?.style || ""}
                required
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                id="popup-image"
                placeholder="Image URL"
                defaultValue={selectedEarring?.image_url || ""}
                required
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
