import React from 'react'
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

export default function ProductCard({ product }: { product: product }) {
  const { category: { name }, title, ratingsAverage, ratingsQuantity, imageCover, price, _id } = product;

  // Calculate stars (full, half, empty)
  const fullStars = Math.floor(ratingsAverage);
  const hasHalfStar = ratingsAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div>
      <Card className="w-72 shadow-2xl rounded-2xl overflow-hidden">
        {/* Product Image */}
        <CardHeader className="p-0">
          <Image
            src={imageCover}
            alt={title}
            width={288}
            height={180}
            className="object-cover w-full h-72 rounded-2xl"
          />
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
          <Button className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors">
            Add to cart
          </Button>
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
