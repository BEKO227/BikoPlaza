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
    autoplaySpeed: 1000,
    arrows: false,
  };

  return (
    <div className="grid grid-cols-12 rounded-lg">
        <div className="col-span-10">
            <Slider {...settings} className="mb-8">
            <div>
                <Image
                src="/images/slider-image-1.jpeg"
                alt="Slider Image 1"
                width={1000}
                height={500}
                className="w-full h-96 object-cover"
                />
            </div>
            <div>
                <Image
                src="/images/slider-image-2.jpeg"
                alt="Slider Image 2"
                width={1000}
                height={500}
                className="w-full h-96 object-cover"
                />
            </div>
            <div>
                <Image
                src="/images/slider-image-3.jpeg"
                alt="Slider Image 3"
                width={1000}
                height={500}
                className="w-full h-96 object-cover"
                />
            </div>
            </Slider>
        </div>
        <div className="col-span-2">
            <div className="flex flex-col h-full">
                <Image
                src="/myimages/slider-side-1.png"
                alt="Side Image 1"
                width={200}
                height={250}
                className="w-full h-48 object-cover"
                />
                <Image
                src="/myimages/slider-side-2.png"
                alt="Side Image 2"
                width={200}
                height={250}
                className="w-full h-48 object-fill"
                />
            </div>
        </div>
    </div>
  );
}
