"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-blue-950 shadow-2xl p-4">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500"> <span className=" text-blue-950">Biko</span> Plaza</h2>
          <p className="mt-3 text-sm">
            Your trusted e-commerce destination for quality products at the best prices.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-orange-500 transition">FAQ</Link></li>
            <li><Link href="/returns" className="hover:text-orange-500 transition">Returns</Link></li>
            <li><Link href="/shipping" className="hover:text-orange-500 transition">Shipping Info</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-500 transition">Privacy Policy</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-orange-500 transition">FAQ</Link></li>
            <li><Link href="/returns" className="hover:text-orange-500 transition">Returns</Link></li>
            <li><Link href="/shipping" className="hover:text-orange-500 transition">Shipping Info</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-500 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">                      
            <span className="flex gap-2 text-l">
                <i className="fa-brands fa-youtube text-red-600"></i>
                <i className="fa-brands fa-linkedin text-blue-800"></i>
                <i className="fa-brands fa-twitter text-blue-400"></i>
                <i className="fa-brands fa-tiktok text-black"></i>
                <i className="fa-brands fa-facebook text-blue-800"></i>
                <i className="fa-brands fa-instagram text-pink-500"></i>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" mt-5 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BikoPlaza. All rights reserved.
      </div>
    </footer>
  );
}
