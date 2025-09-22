"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"



export function Navbar() {
    const MenuItems:{path:string , content:string}[] =[
        {path: "/products", content: "Products"},
        {path: "/brands", content: "Brands"},
        {path: "/category", content: "Category"},
        {path: "/cart", content: "Cart"},
        {path: "/wishlist", content: "wishlist"},
        {path: "/orders", content: "Orders"}
    ]
    const MenuauthItems:{path:string , content:string}[] =[
        {path: "/login", content: "Login"},
        {path: "/register", content: "Register"}
    ]
  return (

    <NavigationMenu viewport={false} className="max-w-full justify-between shadow-2xl p-4">
      <NavigationMenuList>
      <NavigationMenuItem >
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/">
                        <Image src={'/myimages/BikoPlaza_Logo_without_B-removebg-preview.png'} alt="Logo" width={100} height={100} />
                      </Link>
                    </NavigationMenuLink>
        </NavigationMenuItem>    
        {
            MenuItems.map((item)=>{
                return(
                    <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={item.path}><span className="text-blue-950 hover:text-orange-400 transition-colors">{item.content}</span></Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
            })
        }
      </NavigationMenuList>
      <NavigationMenuList>
        {
            MenuauthItems.map((item)=>{
                return(
                    <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={item.path}><span className="text-blue-950 hover:text-orange-400 transition-colors">{item.content}</span></Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
            })
        }
              <NavigationMenuItem className="flex items-center 2-">
                      <span className="flex gap-2 text-l">
                      <i className="fa-brands fa-youtube text-red-600"></i>
                      <i className="fa-brands fa-linkedin text-blue-800"></i>
                      <i className="fa-brands fa-twitter text-blue-400"></i>
                      <i className="fa-brands fa-tiktok"></i>
                      <i className="fa-brands fa-facebook text-blue-800"></i>
                      <i className="fa-brands fa-instagram text-pink-500"></i>
                      </span>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/">
                      <span className="text-sm bold font-medium text-blue-950 hover:text-red-400 transition-colors cursor-pointer">
                        Sign out
                      </span>
                      </Link>
                    </NavigationMenuLink>
        </NavigationMenuItem>   
      </NavigationMenuList>
    </NavigationMenu>
  )
}


