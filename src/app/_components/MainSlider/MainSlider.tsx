'use client';
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-lg">
      {/* Main Slider */}
      <div className="md:col-span-9">
        <Slider {...settings} className="mb-4 md:mb-0">
          <div>
            <Image
              src="/images/slider-image-1.jpeg"
              alt="Slider Image 1"
              width={1000}
              height={500}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <Image
              src="/images/slider-image-2.jpeg"
              alt="Slider Image 2"
              width={1000}
              height={500}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <Image
              src="/images/slider-image-3.jpeg"
              alt="Slider Image 3"
              width={1000}
              height={500}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
            />
          </div>
        </Slider>
      </div>

      {/* Side Images */}
      <div className="md:col-span-3 flex flex-row md:flex-col gap-4">
        <Image
          src="/myimages/slider-side-1.png"
          alt="Side Image 1"
          width={200}
          height={250}
          className="w-1/2 md:w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg"
        />
        <Image
          src="/myimages/slider-side-2.png"
          alt="Side Image 2"
          width={200}
          height={250}
          className="w-1/2 md:w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
