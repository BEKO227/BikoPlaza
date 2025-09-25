import { getUserToken } from "@/getUserToken";


const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function addToWishlist(productId: string) {
  const token:any = await getUserToken();
  if (!token) throw new Error("User not logged in");

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ productId }),
  });

  return res.json();
}

export async function removeFromWishlist(productId: string) {
  const token:any = await getUserToken();
  if (!token) throw new Error("User not logged in");

  const res = await fetch(BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ productId }),
  });

  return res.json();
}

// ✅ Get logged user wishlist
export async function getWishlist() {
  const token:any = await getUserToken();
  if (!token) throw new Error("User not logged in");

  const res = await fetch(BASE_URL, {
    headers: {
      token: token,
    },
  });

  return res.json();
}
