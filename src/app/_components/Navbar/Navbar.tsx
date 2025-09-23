"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { NavigationMenu, NavigationMenuItem , NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle,} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const MenuItems: { path: string; content: string }[] = [
    { path: "/products", content: "Products" },
    { path: "/brands", content: "Brands" },
    { path: "/category", content: "Category" },
    { path: "/cart", content: "Cart" },
    { path: "/wishlist", content: "Wishlist" },
    { path: "/orders", content: "Orders" },
  ];

  const MenuauthItems: { path: string; content: string }[] = [
    { path: "/Login", content: "Login" },
    { path: "/register", content: "Register" },
  ];

  return (
    <nav className="shadow-2xl py-4 px-0 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={"/myimages/BikoPlaza_Logo_without_B-removebg-preview.png"}
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {MenuItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link
                    href={item.path}
                    className="text-blue-950 hover:text-orange-400 transition-colors"
                  >
                    {item.content}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth + Social (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {MenuauthItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link
                      href={item.path}
                      className="text-blue-950 hover:text-orange-400 transition-colors"
                    >
                      {item.content}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem className="flex items-center gap-3">
                {/* Social icons */}
                <span className="flex gap-2 text-lg">
                  <i className="fa-brands fa-youtube text-red-600"></i>
                  <i className="fa-brands fa-linkedin text-blue-800"></i>
                  <i className="fa-brands fa-twitter text-blue-400"></i>
                  <i className="fa-brands fa-tiktok"></i>
                  <i className="fa-brands fa-facebook text-blue-800"></i>
                  <i className="fa-brands fa-instagram text-pink-500"></i>
                </span>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="text-sm font-medium text-blue-950 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Sign out
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-blue-950" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <div className="flex flex-col gap-6">
                {MenuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="text-blue-950 text-lg hover:text-orange-400 transition-colors"
                  >
                    {item.content}
                  </Link>
                ))}

                {MenuauthItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="text-blue-950 text-lg hover:text-orange-400 transition-colors"
                  >
                    {item.content}
                  </Link>
                ))}

                {/* Social + Sign out */}
                <div className="flex flex-col gap-4 mt-4">
                  <span className="flex gap-3 text-xl">
                    <i className="fa-brands fa-youtube text-red-600"></i>
                    <i className="fa-brands fa-linkedin text-blue-800"></i>
                    <i className="fa-brands fa-twitter text-blue-400"></i>
                    <i className="fa-brands fa-tiktok"></i>
                    <i className="fa-brands fa-facebook text-blue-800"></i>
                    <i className="fa-brands fa-instagram text-pink-500"></i>
                  </span>
                  <Link
                    href="/"
                    className="text-base font-medium text-blue-950 hover:text-red-400 transition-colors"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
