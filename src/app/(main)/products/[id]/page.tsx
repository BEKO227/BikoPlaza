import { Button } from '@/components/ui/button';
import { productDetails, productDetailsitem } from '@/types/productDetails.type';
import React from 'react'
import DetailSlider from './../../../_components/DetailSlider/DetailSlider';

export default async function page({params}:{params:{id:string}}) {
    
    const StarRating = ({ rating, quantity }: { rating: number; quantity: number }) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      
        return (
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(fullStars)].map((_, i) => (
              <i key={`full-${i}`} className="fa-solid fa-star"></i>
            ))}
            {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}
            {[...Array(emptyStars)].map((_, i) => (
              <i key={`empty-${i}`} className="fa-regular fa-star"></i>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({rating.toFixed(1)}) • {quantity} reviews
            </span>
          </div>
        );
      };

    const {id}= await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`);
    const data:productDetails = await res.json();
    const product:productDetailsitem = data.data;
    const {images} = product;
    return (
   
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Product Image */}
          <div className=" justify-center">
          <DetailSlider images={images} />
          </div>
      
          {/* Product Info */}
          <div className="flex flex-col justify-between ">
            <div>
              <h2 className="text-orange-500 text-base sm:text-lg font-light">
                {product.category.name}
              </h2>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-950 mt-2">
                {product.title}
              </h1>
      
              {/* Rating */}
              <div className="mt-3">
                <StarRating
                  rating={product.ratingsAverage}
                  quantity={product.ratingsQuantity}
                />
              </div>
      
              {/* Price */}
              <p className="mt-4 text-xl sm:text-2xl font-bold text-orange-600">
                {product.price} EGP
              </p>
      
              {/* Description */}
              <p className="mt-6 text-gray-700 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            </div>
      
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <Button className="w-full sm:w-auto px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
       );
}
