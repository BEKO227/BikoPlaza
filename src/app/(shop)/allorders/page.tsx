"use client"

import { useEffect, useState } from "react"
import { getUserToken } from "@/getUserToken"
import { Button } from "@/components/ui/button"
import Loading from "@/app/_components/loading/loading"

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
  cartItems: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token:any = await getUserToken()
        if (!token) {
          setError("User not authenticated")
          setLoading(false)
          return
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/`, {
          headers: { token },
        })

        const data = await res.json()
        console.log("Orders API response:", data)

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : data.orders || data.data || [])
        } else {
          setError(data.message || "Failed to fetch orders")
        }
      } catch {
        setError("Network error")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) return <Loading/>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-950">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-blue-950">No orders found.</p>
      ) : (
        <table className="w-full border border-blue-950 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Total Price</th>
              <th className="px-4 py-3 text-left">Payment Method</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                <tr
                  key={order._id}
                  className="border-b hover:bg-orange-50 transition"
                >
                  <td className="px-4 py-3">{order._id}</td>
                  <td className="px-4 py-3 font-semibold text-blue-950">
                    {order.totalOrderPrice} EGP
                  </td>
                  <td className="px-4 py-3">{order.paymentMethodType}</td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      onClick={() =>
                        setExpanded(expanded === order._id ? null : order._id)
                      }
                      className={`px-3 py-1 rounded-md font-medium transition bg-orange-500 ${
                        expanded === order._id
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "text-blue-950 border border-blue-950 hover:bg-blue-950 hover:text-white"
                      }`}
                    >
                      {expanded === order._id ? "Hide Items" : "View Items"}
                    </Button>
                  </td>
                </tr>

                {expanded === order._id && (
                  <tr>
                    <td colSpan={5} className="bg-orange-50 p-4">
                      <h2 className="font-semibold mb-3 text-blue-950">
                        Order Items
                      </h2>
                      <ul className="space-y-3">
                        {order.cartItems.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-4 border p-3 rounded-md bg-white shadow-sm"
                          >
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-16 h-16 object-cover rounded border border-blue-950"
                            />
                            <div>
                              <p className="font-medium text-blue-950">
                                {item.product.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.count} ×{" "}
                                <span className="text-orange-500 font-semibold">
                                  {item.price} EGP
                                </span>
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
