"use client";

import { getCartData } from "@/CartAction/CartAction";
import { getUserToken } from "@/getUserToken";
import { CartData } from "@/types/cartdata.type";
import { createContext, useEffect, useState } from "react";

type CountContextType = {
  count: number;
  setcount: React.Dispatch<React.SetStateAction<number>>;
};

export const CountContext = createContext<CountContextType | undefined>(undefined);

export default function CountProvider({ children }: { children: React.ReactNode }) {
  const [count, setcount] = useState(0);

  async function getcart() {
    let token: any = await getUserToken();
    if (token) {
      const data: CartData = await getCartData();
      let sum = 0;
      data.data.products.forEach((item) => {
        sum += item.count;
      });
      setcount(sum);
    }
  }

  useEffect(() => {
    getcart();
  }, []); // ✅ added dependency array so it only runs once

  return (
    <CountContext.Provider value={{ count, setcount }}>
      {children}
    </CountContext.Provider>
  );
}
