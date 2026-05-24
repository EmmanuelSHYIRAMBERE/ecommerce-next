import Productcard from "@/components/home/product/ProductCard";
import data from "@/app/data.json";

export default function ProductLists() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="flex justify-center items-center">Product Listings</h2>

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
          {data.map((item) => {
            return (
              <Productcard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                picture={item.picture}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
