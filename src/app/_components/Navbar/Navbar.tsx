"use client";

import {useContext} from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import {NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import  { CountContext } from "@/app/CountProvider";

export function Navbar() {
  const { data: session, status } = useSession();
  const context = useContext(CountContext);

  if (!context) return null; // safety check if provider missing

  const { count } = context;
  // console.log(count)
  function logout() {
    signOut({
      callbackUrl: "/Login",
    })
  }
  /*Always visible items*/
  const PublicMenuItems: { path: string; content: string }[] = [
    { path: "/products", content: "Products" },
    { path: "/brands", content: "Brands" },
    { path: "/category", content: "Category" },
    { path: "/wishlist", content: "Wishlist" },
  ];

  // Visible only when logged in
  const AuthOnlyItems: { path: string; content: string }[] = [
    // { path: "/cart", content: "Cart" },
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
          {status === "authenticated" && (
            <span className="text-sm font-medium text-blue-950 cursor-pointer">
              Welcome Back{" "}
              <span className="text-orange-500">{session?.user?.name}</span>
            </span>
          )}
        </Link>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {PublicMenuItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    href={item.path}
                    className="text-blue-950 hover:text-orange-400 transition-colors"
                  >
                    {item.content}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            {status === "authenticated" && <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className={navigationMenuTriggerStyle()}
                        >
                          <Link
                            href="/cart"
                            className="text-blue-950 hover:text-orange-400 transition-colors cursor-pointer"
                          >
                            
                          <button type="button" className="relative inline-flex items-center p-3 font-medium text-center">
                          cart
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{count}</div>
                          </button>

                          </Link>
                        </NavigationMenuLink>
                </NavigationMenuItem>
                }

            {/* Auth-only menu */}
            {status === "authenticated" &&
              AuthOnlyItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
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
              {status !== "authenticated" &&
                MenuauthItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        href={item.path}
                        className="text-blue-950 hover:text-orange-400 transition-colors"
                      >
                        {item.content}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                  <span className="flex gap-3 text-xl">
                    <i className="fa-brands fa-youtube text-red-600"></i>
                    <i className="fa-brands fa-linkedin text-blue-800"></i>
                    <i className="fa-brands fa-twitter text-blue-400"></i>
                    <i className="fa-brands fa-tiktok"></i>
                    <i className="fa-brands fa-facebook text-blue-800"></i>
                    <i className="fa-brands fa-instagram text-pink-500"></i>
                  </span>
              {status === "authenticated" && (
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="text-blue-950 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Sign out
                  </Button>
                </NavigationMenuItem>
              )}
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
                {PublicMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="text-blue-950 text-lg hover:text-orange-400 transition-colors"
                  >
                    {item.content}
                  </Link>
                ))}
                           {status === "authenticated" && <>
                          <Link
                            href="/cart"
                            className="text-blue-950 hover:text-orange-400 transition-colors"
                          >
                            
                          <button type="button" className="relative inline-flex items-center p-3 font-medium text-center text-blue-950 text-lg hover:text-orange-400 transition-colors">
                          cart
                          <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">20</div>
                          </button>

                          </Link>
                         </>
                          
                }

                {status === "authenticated" &&
                  AuthOnlyItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="text-blue-950 text-lg hover:text-orange-400 transition-colors"
                    >
                      {item.content}
                    </Link>
                  ))}

                {status !== "authenticated" &&
                  MenuauthItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="text-blue-950 text-lg hover:text-orange-400 transition-colors"
                    >
                      {item.content}
                    </Link>
                  ))}
                {status === "authenticated" && (
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="text-blue-950 hover:text-red-400 transition-colors text-lg cursor-pointer"
                  >
                    Sign out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
