import { HomeLoading } from "@/app/_components/HomeLoading/HomeLoading";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { ProductData,product } from "@/types/products.type";
import { Suspense } from "react";

export default async function Products() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
  const data:ProductData = await res.json();
  const productList:product[] = data.data;
  return (
    <>
      <h1 className="text-3xl font-bold mb-5 text-blue-950 text-center">Here are our <span className="text-orange-400">Products</span></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-2 justify-items-center">
        <Suspense fallback={<HomeLoading/>}>
          {productList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Suspense>
      </div>

    </>
  );
}
