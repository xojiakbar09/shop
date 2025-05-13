"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  // Mock data for products
  const allProducts = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: 999,
      discountPrice: 899,
      rating: 4.8,
      image: "https://olcha.uz/image/original/products/2022-07-13/apple-iphone-14-pro-makh-64967-1.jpeg",
      category: "Phones",
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 1299,
      discountPrice: null,
      rating: 4.9,
      image: "https://olcha.uz/image/700x700/products/2022-08-26/macbook-air-m2-13-2022-256gb-ssd-starlight-102141-0.jpeg",
      category: "Laptops",
    },
    {
      id: 3,
      name: "Samsung QLED TV",
      price: 1499,
      discountPrice: 1299,
      rating: 4.7,
      image: "https://images.samsung.com/is/image/samsung/p6pim/ae/qa98q80cauxzn/gallery/ae-qled-98q80c-qa98q80cauxzn-536847452?$684_547_PNG$",
      category: "Electronics",
    },
    {
      id: 4,
      name: "Modern Sofa",
      price: 899,
      discountPrice: 799,
      rating: 4.5,
      image: "https://exohom.ae/cdn/shop/articles/Comfort_and_Support-654085.webp?v=1721042461",
      category: "Furniture",
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      price: 199,
      discountPrice: 149,
      rating: 4.6,
      image: "https://olcha.uz/image/600x600/products/2022-03-29/besprovodnye-naushniki-honor-choice-earbuds-x1-43580-0.jpeg",
      category: "Electronics",
    },
    {
      id: 6,
      name: "Smart Watch",
      price: 299,
      discountPrice: 249,
      rating: 4.4,
      image: "https://olcha.uz/image/700x700/products/2022-02-16/umnye-smart-chasy-smart-watch-x22-pro-44-mm-chernyy-37219-0.png",
      category: "Accessories",
    },
    {
      id: 7,
      name: "Coffee Table",
      price: 399,
      discountPrice: 349,
      rating: 4.3,
      image: "https://media.homecentre.com/i/homecentre/165555908-165555908-HC18052023_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-m-sqr-pdp-2x$",
      category: "Furniture",
    },
    {
      id: 8,
      name: "Gaming Keyboard",
      price: 129,
      discountPrice: 99,
      rating: 4.7,
      image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:2000,ch:1125,q:80,w:2000/XMDNCcbVWnrYj3zdapKrGb.jpg",
      category: "Accessories",
    },
    {
      id: 9,
      name: "Desk Chair",
      price: 249,
      discountPrice: 199,
      rating: 4.2,
      image: "https://www.ryman.co.uk/media/catalog/product/1/0/1026010138_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=550&width=550&canvas=550:550",
      category: "Furniture",
    },
    {
      id: 10,
      name: "Bluetooth Speaker",
      price: 89,
      discountPrice: 69,
      rating: 4.5,
      image: "https://www.dlkphoto.co.uk/images/fenton-ft15led-portable-pa-speaker-system-with-2-wireless-mics-p1259-6359_image.jpg",
      category: "Electronics",
    },
    {
      id: 11,
      name: "Samsung Galaxy S23",
      price: 899,
      discountPrice: 849,
      rating: 4.6,
      image: "https://olcha.uz/image/700x700/products/cdn_1/supplier/stores/1/2024-05-28/LrgKv7j4wE45e2RNyx7T8vGZnlNXkyRzgWIvjx7rdHMfzcbSuYuIoP1SJycT.JPG",
      category: "Phones",
    },
    {
      id: 12,
      name: "Dell XPS 13",
      price: 1199,
      discountPrice: null,
      rating: 4.8,
      image: "https://olcha.uz/image/700x700/products/2022-08-01/noutbuk-dell-xps-13-9310-i7-1165g7-16512gb-ssd-134-87164-0.jpeg",
      category: "Laptops",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  // Filter products based on search, category, price range, and sort
  useEffect(() => {
    let filtered = allProducts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      if (selectedCategory === "sale") {
        filtered = filtered.filter((product) => product.discountPrice !== null)
      } else {
        filtered = filtered.filter((product) => product.category === selectedCategory)
      }
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = product.discountPrice || product.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => {
          const priceA = a.discountPrice || a.price
          const priceB = b.discountPrice || b.price
          return priceA - priceB
        })
        break
      case "price-high":
        filtered = [...filtered].sort((a, b) => {
          const priceA = a.discountPrice || a.price
          const priceB = b.discountPrice || b.price
          return priceB - priceA
        })
        break
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      default:
        // Featured - no sorting needed
        break
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, priceRange, sortBy, categoryParam])

  // Update selected category when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">Browse our collection of products</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Filter products by category, price, and more.</SheetDescription>
                </SheetHeader>
                <ProductFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  isMobile={true}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="hidden md:block">
            <ProductFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              isMobile={false}
            />
          </div>
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <div className="text-center">
                  <h2 className="text-xl font-semibold">No products found</h2>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setPriceRange([0, 2000])
                    setSortBy("featured")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

