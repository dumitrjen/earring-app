import AddToCartButton from "@/components/Add-Button";
import Image from "next/image";

export default async function ItemPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/earrings/${params.id}`);
  const earring = await res.json();

  if (!res.ok) {
    return <div className="text-center text-red-600 mt-8">Error: Unable to fetch earring details.</div>;
  }

  return (
    <div className="bg-[#fdfdfd] min-h-screen">
      {/* Earring Details Section */}
      <section className="container mx-auto p-8 bg-white shadow-lg rounded-xl max-w-[90%] relative mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Earring Image */}
          <div className="text-center">
            <Image
              src={earring.image_url}
              alt={earring.name}
              width={300}
              height={300}
              className="high-resolution-image w-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Earring Details */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-semibold mb-4 capitalize text-gray-800">{earring.name}</h2>
            <p className="text-lg text-gray-600 mb-4 capitalize">{earring.description}</p>
            <p className="text-3xl font-bold text-indigo-800 mb-4">${earring.price.toFixed(2)}</p>
            <div className="flex items-center mb-4">
              <label htmlFor="material-select" className="mr-4 text-lg font-semibold text-gray-800">Material:</label>
              <span className="text-lg text-gray-700">{earring.material}</span>
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-4 text-lg font-semibold text-gray-800">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                className="w-16 p-2 border rounded-lg text-center"
              />
            </div>
            <AddToCartButton />
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="container mx-auto p-8 bg-gray-100 shadow-lg rounded-xl max-w-[90%] relative mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Additional Information</h3>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>Free shipping on orders over $50</li>
          <li>30-day return policy</li>
          <li>Available in multiple sizes</li>
          <li>Handcrafted with care</li>
        </ul>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto p-8 bg-white shadow-lg rounded-xl max-w-[90%] relative mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews</h3>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-800">Jane Doe</p>
            <p className="text-gray-600">&quot;Absolutely love these earrings! They are perfect for any occasion.&quot;</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-800">John Smith</p>
            <p className="text-gray-600">&quot;Great quality and fast shipping. Highly recommend!&quot;</p>
          </div>
        </div>
      </section>
    </div>
  );
}