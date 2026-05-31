import Productcard from "@/components/home/product/ProductCard";
import AddNewProductModal from "@/components/home/product/AddNewProductModal";
import { ProductTypes } from "@/types/product";

export default async function ProductLists() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/product",
  );

  const data = await response.json();

  const receivedData = data.data;

  // if (!receivedData || receivedData.length === 0) {
  //   return(
  //     <div className="flex">
  //       No products found. Please add some products.
  //       <AddNewProductModal />
  //     </div>
  //   )
  // }

  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="flex justify-center items-center">Product Listings</h2>

      <AddNewProductModal />

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
          {receivedData.map((item: ProductTypes) => {
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
