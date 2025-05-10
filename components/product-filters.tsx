"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface ProductFiltersProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  sortBy: string
  setSortBy: (sort: string) => void
  isMobile: boolean
}

export default function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  isMobile,
}: ProductFiltersProps) {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Phones", label: "Phones" },
    { value: "Laptops", label: "Laptops" },
    { value: "Furniture", label: "Furniture" },
    { value: "Accessories", label: "Accessories" },
    { value: "sale", label: "On Sale" },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ]

  const handleReset = () => {
    setSelectedCategory("all")
    setPriceRange([0, 2000])
    setSortBy("featured")
  }

  return (
    <div className={`space-y-6 ${isMobile ? "pb-20 pt-6" : ""}`}>
      <div>
        <h3 className="mb-4 text-lg font-medium">Categories</h3>
        <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <RadioGroupItem value={category.value} id={`category-${category.value}`} />
                <Label htmlFor={`category-${category.value}`}>{category.label}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-lg font-medium">Price Range</h3>
        <div className="space-y-4">
          <Slider value={priceRange} min={0} max={2000} step={10} onValueChange={setPriceRange} />
          <div className="flex items-center justify-between">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-lg font-medium">Sort By</h3>
        <RadioGroup value={sortBy} onValueChange={setSortBy}>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                <Label htmlFor={`sort-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  )
}

