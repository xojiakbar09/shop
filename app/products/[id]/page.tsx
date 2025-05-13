"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cartSlice"
import ProductReviews from "@/components/product-reviews"
import RelatedProducts from "@/components/related-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("black")
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: Number.parseInt(params.id),
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    price: 249.99,
    discountPrice: 199.99,
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    colors: ["black", "white", "blue"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "",
    ],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Foldable design",
      "Includes carrying case",
    ],
    specifications: {
      Brand: "TechAudio",
      Model: "TA-500",
      Color: "Multiple options",
      Connectivity: "Bluetooth 5.0",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Warranty: "1 year",
    },
    category: "Electronics",
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.images[0],
        quantity,
        color: selectedColor,
      }),
    )

    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    })
  }

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => Math.min(prev + 1, product.stock))
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1))
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-muted">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full object-cover max-h-[500px]"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg border bg-muted min-w-[80px]">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={150}
                  height={150}
                  className="h-full w-full object-cover aspect-square"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                    Save ${(product.price - product.discountPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`h-8 w-8 rounded-full border ${
                      selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Quantity</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange("increase")}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={() => setIsFavorite(!isFavorite)}>
              <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              {isFavorite ? "Saved" : "Save"}
            </Button>
            <Button size="icon" variant="outline">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4 space-y-4">
            <p>
              Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation,
              30-hour battery life, and comfortable over-ear design.
            </p>
            <p>
              These headphones are perfect for music lovers, gamers, and professionals who need reliable audio quality.
              The active noise cancellation technology blocks out ambient noise, allowing you to focus on your audio
              without distractions.
            </p>
            <p>
              With a 30-hour battery life, you can enjoy your favorite music, podcasts, or games all day long without
              worrying about recharging. The comfortable over-ear design ensures you can wear these headphones for
              extended periods without discomfort.
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <ProductReviews productId={product.id} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </div>
    </div>
  )
}

