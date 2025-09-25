"use client";

import Loading from "@/app/_components/loading/loading";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { getWishlist } from "@/Wishlist/Wishlist";
import { useEffect, useState } from "react";


export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await getWishlist();
        setWishlist(res.data);
      } catch (err) {
        console.error("Error loading wishlist:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  if (loading) return <Loading/>;

  if (wishlist.length === 0) return <p>No items in wishlist</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {wishlist.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
