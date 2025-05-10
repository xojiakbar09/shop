import Link from "next/link"
import { Laptop, Smartphone, Sofa, Watch } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedCategories() {
  const categories = [
    {
      name: "Electronics",
      icon: <Laptop className="h-8 w-8" />,
      href: "/products?category=Electronics",
      description: "TVs, Laptops, Audio & more",
    },
    {
      name: "Phones",
      icon: <Smartphone className="h-8 w-8" />,
      href: "/products?category=Phones",
      description: "Latest smartphones & accessories",
    },
    {
      name: "Furniture",
      icon: <Sofa className="h-8 w-8" />,
      href: "/products?category=Furniture",
      description: "Sofas, Tables, Chairs & more",
    },
    {
      name: "Accessories",
      icon: <Watch className="h-8 w-8" />,
      href: "/products?category=Accessories",
      description: "Watches, Bags, Jewelry & more",
    },
  ]

  return (
    <>
      {categories.map((category) => (
        <Link key={category.name} href={category.href} className="block">
          <Card className="transition-all hover:shadow-md h-full">
            <CardContent className="flex flex-col items-center p-6 text-center h-full">
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{category.icon}</div>
              <h3 className="mb-1 font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}

