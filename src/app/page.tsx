import { ProductData,product } from "@/types/products.type";
import ProductCard from "./_components/ProductCard/ProductCard";
import MainSlider from './_components/MainSlider/MainSlider';
import { Suspense } from "react";
import { HomeLoading } from "./_components/HomeLoading/HomeLoading";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
  const data:ProductData = await res.json();
  const productList:product[] = data.data;
  return (
    <>
      <h1 className="text-3xl font-bold mb-5 text-blue-950">Welcome to Biko <span className="text-orange-400">Plaza</span></h1>
      <MainSlider/>
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
