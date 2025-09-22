'use client';
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

export default function DetailSlider({images}:{images:string[]}) {
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
    <div>
        <Slider {...settings} className="mb-8">
        {
            images.map((image) => (
                <div key={image}>
                <Image
                    src={image}
                    alt="Slider Image"
                    width={1000}
                    height={500}
                    className="w-full h-96 object-cover rounded"
                />
                </div>
            ))
        }
        </Slider>
    </div>
  )
}
