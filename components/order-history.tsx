import Link from "next/link"
import { Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function OrderHistory() {
  // Mock order data
  const orders = [
    {
      id: "ORD-12345",
      date: "March 15, 2023",
      status: "Delivered",
      total: 249.99,
      items: [
        {
          name: "Wireless Headphones",
          quantity: 1,
          price: 199.99,
        },
        {
          name: "Phone Case",
          quantity: 1,
          price: 49.99,
        },
      ],
    },
    {
      id: "ORD-12346",
      date: "February 28, 2023",
      status: "Delivered",
      total: 899.99,
      items: [
        {
          name: "Smartphone",
          quantity: 1,
          price: 899.99,
        },
      ],
    },
    {
      id: "ORD-12347",
      date: "January 10, 2023",
      status: "Delivered",
      total: 149.99,
      items: [
        {
          name: "Bluetooth Speaker",
          quantity: 1,
          price: 149.99,
        },
      ],
    },
  ]

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-6">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-medium">No orders yet</h3>
        <p className="mb-6 text-muted-foreground">When you place orders, they will appear here.</p>
        <Link href="/products">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="rounded-lg border shadow-sm">
          <div className="flex flex-col justify-between p-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Order {order.id}</h3>
                <Badge variant={order.status === "Delivered" ? "default" : "outline"}>{order.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="font-medium">${order.total.toFixed(2)}</span>
            </div>
          </div>
          <Separator />
          <div className="p-4">
            <h4 className="mb-2 text-sm font-medium">Items</h4>
            <ul className="space-y-2">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-2 p-4">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button variant="outline" size="sm">
              Track Order
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

