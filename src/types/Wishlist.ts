export interface WishlistData {
    status: string;
    numOfWishlistItems: number;
    data: Wishlist;
  }
  
  export interface Wishlist {
    _id: string;
    totalWishlistPrice: number;
    products: WishlistItem[];
  }
  
  export interface WishlistItem {
    _id: string;
    count: number;
    price: number;
    product: Product;
  }
  
  export interface Product {
    id: string;
    title: string;
    imageCover: string;
    price: number;
  }
  