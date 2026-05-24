// Product Interface

import Image from "next/image";
import Link from "next/link";
import { ProductTypes } from "@/types/product";

const Productcard = ({
  id,
  name,
  description,
  price,
  picture,
}: ProductTypes) => {
  return (
    <div className="flex flex-col gap-1 border border-black W-64 md:w-72 p-2 rounded-md">
      <Image
        className="w-full"
        src={picture}
        alt={name}
        width={200}
        height={200}
      />

      <h3 className="text-green-500 font-bold">{name}</h3>
      <p>{description}</p>
      <p className="text-green-500">RWF {price}</p>

      <div className="flex justify-between items-center">
        <button className="shadow shadow-green-500 rounded-md p-1">
          Add to Cart
        </button>
        <Link
          href={`/product/${id}`}
          className="shadow shadow-green-500  rounded-md p-1"
        >
          View Deatils
        </Link>
      </div>
    </div>
  );
};

export default Productcard;
