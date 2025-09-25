interface OrderItem {
    product: {
      title: string
      imageCover: string
    }
    price: number
    count: number
  }
  
  interface Order {
    _id: string
    totalOrderPrice: number
    paymentMethodType: string
    createdAt: string
    cartItems: OrderItem[] // 👈 items inside the order
  }