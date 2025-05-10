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
      image: "/https://www.google.com/imgres?q=iphone%2014%20pro%20max&imgurl=https%3A%2F%2Fcdsassets.apple.com%2Flive%2FSZLF0YNV%2Fimages%2Fsp%2F111846_sp875-sp876-iphone14-pro-promax.png&imgrefurl=https%3A%2F%2Fsupport.apple.com%2Fen-gb%2F111846&docid=2Ibe-bwAnj4lQM&tbnid=TNjyf-Tx6dqyjM&vet=12ahUKEwivwonBw5iNAxVL3QIHHY_hDSIQM3oECGYQAA..i&w=920&h=674&hcb=2&ved=2ahUKEwivwonBw5iNAxVL3QIHHY_hDSIQM3oECGYQAA",
      category: "Phones",
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 1299,
      discountPrice: null,
      rating: 4.9,
      image: "/https://www.google.com/aclk?sa=l&ai=DChsSEwiokpy7xZiNAxV2hnwGHbHcEPMYACICCAEQARoCd3M&co=1&gclid=Cj0KCQjw8vvABhCcARIsAOCfwwqTx2TPkB98zOywm0PLxeH-9jbeWXoJHXiOp2drZVxz6jQyF_ClWUwaAq40EALw_wcB&sig=AOD64_0pcOQKQkYFkl2KKClyy-H18BcwfA&ctype=5&q=&ved=2ahUKEwiuhpi7xZiNAxW8_7sIHc5MFHsQ9aACKAB6BAgEEA4&adurl=",
      category: "Laptops",
    },
    {
      id: 3,
      name: "Samsung QLED TV",
      price: 1499,
      discountPrice: 1299,
      rating: 4.7,
      image: "/https://www.google.com/imgres?q=Samsung%20QLED%20TV&imgurl=https%3A%2F%2Fimages.samsung.com%2Fis%2Fimage%2Fsamsung%2Fp6pim%2Fuz_ru%2Fqe85q80dauxuz%2Fgallery%2Fuz-ru-qled-q80d-qe85q80dauxuz-thumb-542909953%3F%24UX_EXT2_PNG%24&imgrefurl=https%3A%2F%2Fwww.samsung.com%2Fuz_ru%2Ftvs%2Fqled-tv%2F&docid=Ii251VCQ7WMnCM&tbnid=1NXx6lzQ7r2WUM&vet=12ahUKEwjP2LXfxZiNAxVfgP0HHR2XM1AQM3oECGUQAA..i&w=560&h=560&hcb=2&ved=2ahUKEwjP2LXfxZiNAxVfgP0HHR2XM1AQM3oECGUQAA",
      category: "Electronics",
    },
    {
      id: 4,
      name: "Modern Sofa",
      price: 899,
      discountPrice: 799,
      rating: 4.5,
      image: "/placeholder.svg?height=300&width=300",
      category: "Furniture",
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      price: 199,
      discountPrice: 149,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
    },
    {
      id: 6,
      name: "Smart Watch",
      price: 299,
      discountPrice: 249,
      rating: 4.4,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
    },
    {
      id: 7,
      name: "Coffee Table",
      price: 399,
      discountPrice: 349,
      rating: 4.3,
      image: "/placeholder.svg?height=300&width=300",
      category: "Furniture",
    },
    {
      id: 8,
      name: "Gaming Keyboard",
      price: 129,
      discountPrice: 99,
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
    },
    {
      id: 9,
      name: "Desk Chair",
      price: 249,
      discountPrice: 199,
      rating: 4.2,
      image: "/placeholder.svg?height=300&width=300",
      category: "Furniture",
    },
    {
      id: 10,
      name: "Bluetooth Speaker",
      price: 89,
      discountPrice: 69,
      rating: 4.5,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
    },
    {
      id: 11,
      name: "Samsung Galaxy S23",
      price: 899,
      discountPrice: 849,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300",
      category: "Phones",
    },
    {
      id: 12,
      name: "Dell XPS 13",
      price: 1199,
      discountPrice: null,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=300",
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

