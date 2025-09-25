"use client";

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { product } from '@/types/products.type';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import Addcartbtn from '../cartbtn/Addcartbtn';
import { addToWishlist, removeFromWishlist } from '@/Wishlist/Wishlist';

export default function ProductCard({ product }: { product: product }) {
  const { category: { name }, title, ratingsAverage, ratingsQuantity, imageCover, price, _id } = product;

  // Calculate stars (full, half, empty)
  const fullStars = Math.floor(ratingsAverage);
  const hasHalfStar = ratingsAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleWishlist() {
    try {
      setLoading(true);
      if (inWishlist) {
        await removeFromWishlist(_id);
        setInWishlist(false);
      } else {
        await addToWishlist(_id);
        setInWishlist(true);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Card className="w-72 shadow-2xl rounded-2xl overflow-hidden">
        {/* Product Image */}
        <CardHeader className="p-0 relative">
          <Image
            src={imageCover}
            alt={title}
            width={288}
            height={180}
            className="object-cover w-full h-72 rounded-2xl"
          />
          {/* Wishlist icon in corner */}
          <button
            onClick={handleWishlist}
            disabled={loading}
            className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow hover:scale-110 transition"
          >
            {inWishlist ? (
              <i className="fa-solid fa-heart text-red-500 text-lg"></i>
            ) : (
              <i className="fa-regular fa-heart text-gray-600 text-lg"></i>
            )}
          </button>
        </CardHeader>

        {/* Product Info */}
        <CardContent className="p-4">
          <CardTitle className="text-lg font-light text-orange-500">{name}</CardTitle>
          <CardTitle className="text-blue-950 text-lg font-semibold">
            {title.split(" ").slice(0, 2).join(" ")}
          </CardTitle>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2 text-yellow-400">
            {[...Array(fullStars)].map((_, i) => (
              <i key={`full-${i}`} className="fa-solid fa-star"></i>
            ))}
            {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}
            {[...Array(emptyStars)].map((_, i) => (
              <i key={`empty-${i}`} className="fa-regular fa-star"></i>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({ratingsAverage.toFixed(1)}) • {ratingsQuantity} reviews
            </span>
          </div>

          {/* Price */}
          <p className="mt-2 text-lg font-bold text-orange-400">{price} EGP</p>
        </CardContent>

        {/* Actions */}
        <CardFooter className="flex justify-between items-center">
          <Addcartbtn id={_id} />
          <Link href={`/products/${_id}`}>
            <Button className="text-sm text-gray-600 hover:text-orange-400 bg-accent">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
