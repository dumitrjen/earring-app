import Link from "next/link";

export default function Navbar() {
  return (
    <div
      className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-between p-2 shadow-lg bg-white/90 backdrop-blur-md rounded-xl max-w-[90%] w-[1200px]"
    >
      <Link href="/" className="text-md font-bold text-gray-500 ml-4">
        EarMuse
      </Link>
      <div className="flex items-center space-x-4 mr-4">
        <Link href="/" className="text-blue-800 font-semibold">
          Material
        </Link>
        <Link href="/" className="text-blue-800 font-semibold">
          About us
        </Link>
        <Link
          href="/"
          className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900"
        >
          Basket
        </Link>
      </div>
    </div>
  );
}