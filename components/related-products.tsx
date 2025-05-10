"use client"

import { useEffect, useState } from "react"
import ProductCard from "@/components/product-card"

interface RelatedProductsProps {
  category: string
  currentProductId: number
}

export default function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<any[]>([])

  // Mock data for related products
  useEffect(() => {
    // In a real app, this would fetch related products from an API
    const mockRelatedProducts = [
      {
        id: 101,
        name: "Wireless Earbuds",
        price: 129,
        discountPrice: 99,
        rating: 4.5,
        image: "/placeholder.svg?height=300&width=300",
        category: "Electronics",
      },
      {
        id: 102,
        name: "Bluetooth Speaker",
        price: 79,
        discountPrice: null,
        rating: 4.3,
        image: "/placeholder.svg?height=300&width=300",
        category: "Electronics",
      },
      {
        id: 103,
        name: "Noise Cancelling Headphones",
        price: 199,
        discountPrice: 159,
        rating: 4.7,
        image: "/placeholder.svg?height=300&width=300",
        category: "Electronics",
      },
      {
        id: 104,
        name: "Portable Charger",
        price: 49,
        discountPrice: null,
        rating: 4.4,
        image: "/placeholder.svg?height=300&width=300",
        category: "Electronics",
      },
    ]

    // Filter out the current product
    const filteredProducts = mockRelatedProducts.filter((product) => product.id !== currentProductId)

    setProducts(filteredProducts)
  }, [category, currentProductId])

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

