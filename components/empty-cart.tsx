import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function EmptyCart() {
  return (
    <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6 md:py-24">
      <div className="mb-4 rounded-full bg-muted p-6">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">Your cart is empty</h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
      </p>
      <Link href="/products">
        <Button size="lg">Browse Products</Button>
      </Link>
    </div>
  )
}

