"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cartSlice"

interface Product {
  id: number
  name: string
  price: number
  discountPrice: number | null
  rating: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.image,
        quantity: 1,
      }),
    )

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md dark:border-muted">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="h-[200px] w-full object-cover transition-transform hover:scale-105 product-card-image"
            />
          </div>
        </Link>
        {product.discountPrice && (
          <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
            Sale
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 dark:bg-background/30 dark:hover:bg-background/40"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-medium line-clamp-1">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">{product.category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div>
          {product.discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="font-medium">${product.discountPrice}</span>
              <span className="text-sm text-muted-foreground line-through">${product.price}</span>
            </div>
          ) : (
            <span className="font-medium">${product.price}</span>
          )}
        </div>
        <Button size="sm" variant="ghost" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}

