import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import products from "../../data.json";

interface ProductTypes {
  id: string;
  name: string;
  description: string;
  price: string;
  picture: string;
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = (products as ProductTypes[]).find((p) => p.id === id);

  if (!product) notFound();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link
        href="/product"
        className="inline-block mb-6 text-green-500 hover:underline"
      >
        &larr; Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-10 border border-black rounded-xl p-6">
        <div className="w-full md:w-1/2">
          <Image
            src={product.picture}
            alt={product.name}
            width={500}
            height={500}
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-1/2 justify-center">
          <span className="text-xs text-gray-400 uppercase tracking-widest">
            {product.id}
          </span>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-500 text-2xl font-bold">{product.price}</p>

          <div className="flex gap-4 mt-4">
            <button className="flex-1 bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 border border-green-500 text-green-500 rounded-md py-2 px-4 hover:bg-green-50 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
