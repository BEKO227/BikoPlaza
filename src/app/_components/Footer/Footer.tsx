"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-blue-950 shadow-2xl p-6 bg-gray-50 bottom-0 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-200 pb-8">
        
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">
            <span className="text-blue-950">Biko</span>Plaza
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Your trusted e-commerce destination for quality products at the best prices.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3"><span className="text-blue-950">Customer</span> Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-orange-500 transition">FAQ</Link></li>
            <li><Link href="/returns" className="hover:text-orange-500 transition">Returns</Link></li>
            <li><Link href="/shipping" className="hover:text-orange-500 transition">Shipping Info</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-500 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3"><span className="text-blue-950">Follow</span> Us</h3>
          <div className="flex gap-3 text-xl">
            <i className="fa-brands fa-youtube text-red-600 hover:scale-110 transition-transform"></i>
            <i className="fa-brands fa-linkedin text-blue-800 hover:scale-110 transition-transform"></i>
            <i className="fa-brands fa-twitter text-blue-400 hover:scale-110 transition-transform"></i>
            <i className="fa-brands fa-tiktok text-black hover:scale-110 transition-transform"></i>
            <i className="fa-brands fa-facebook text-blue-800 hover:scale-110 transition-transform"></i>
            <i className="fa-brands fa-instagram text-pink-500 hover:scale-110 transition-transform"></i>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3"><span className="text-blue-950">We</span>Accept</h3>
          <div className="flex flex-wrap items-center gap-4">
            {[
              { src: "/payment/mastercard.png", alt: "Mastercard" },
              { src: "/payment/visa.png", alt: "Visa" },
              { src: "/payment/paypal.png", alt: "PayPal" },
              { src: "/payment/amazon-pay.png", alt: "Amazon Pay" },
              { src: "/payment/american-express.png", alt: "American Express" },
              { src: "/payment/dollars.png", alt: "Cash on Delivery" },
            ].map((pm, i) => (
              <Image
                key={i}
                src={pm.src}
                alt={pm.alt}
                width={50}
                height={30}
                className="h-8 w-auto object-contain hover:scale-110 transition-transform"
              />
            ))}
          </div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3"><span className="text-blue-950">Download</span> Now</h3>
          <div className="flex flex-wrap items-center gap-4">
            {[
              // 👇 New App Store + Google Play logos
              { src: "/myimages/app-store.png", alt: "App Store" },
              { src: "/myimages/playstore.png", alt: "Google Play" },
            ].map((pm, i) => (
              <Image
                key={i}
                src={pm.src}
                alt={pm.alt}
                width={50}
                height={30}
                className="h-8 w-auto object-contain hover:scale-110 transition-transform"
              />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-blue-950">Biko<span className="text-orange-500">Plaza</span></span>
        .All rights reserved.
      </div>
    </footer>
  );
}
