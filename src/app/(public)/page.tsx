import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="flex justify-center items-center">Product Listings</h2>

      <div className="flex justify-center items-center">
        <Link
          href="/product"
          className="shadow shadow-green-500 p-2 rounded-md mt-5"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
