import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import FeaturedCategories from "@/components/featured-categories"
import ProductCard from "@/components/product-card"

export default function Home() {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: 999,
      discountPrice: 899,
      rating: 4.8,
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
      category: "Phones",
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 1299,
      discountPrice: null,
      rating: 4.9,
      image: "https://olcha.uz/image/700x700/products/2022-08-26/macbook-air-m2-13-2022-512gb-ssd-starlight-102142-0.jpeg",
      category: "Laptops",
    },
    {
      id: 3,
      name: "Samsung QLED TV",
      price: 1499,
      discountPrice: 1299,
      rating: 4.7,
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS0tyCKxhoovjjOyJStBNc3SQb6l1Np80789Q5YFVU4JMju6QO6Nm__tDZ72oSxXigrBVFLQu_wsNvXu0gmGJza6SXQEO-c33Nf-3fv_O1oXl2ldEYUscSO2aXTLLDIz4EtqgXLdQ&usqp=CAc",
      category: "Electronics",
    },
    {
      id: 4,
      name: "Modern Sofa",
      price: 899,
      discountPrice: 799,
      rating: 4.5,
      image: "data:image/jpeg;base64,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",
      category: "Furniture",
    },
  ]

  // Mock data for discounted products
  const discountedProducts = [
    {
      id: 5,
      name: "Wireless Earbuds",
      price: 199,
      discountPrice: 149,
      rating: 4.6,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTfSVZxDyTeyOBL2w9NaCBJgG2ya_6rAdLSdQGSd93jM0vifd2m2QCrzxGNSE5dd8FV41jpyvu5Vd3EnEyQyU0ezHzmj4QQcZc6e5psrYIlyXFQtY7S-LUROeGoFnYnbchJ44Ox4w&usqp=CAc",
      category: "Accessories",
    },
    {
      id: 6,
      name: "Smart Watch",
      price: 299,
      discountPrice: 249,
      rating: 4.4,
      image: "data:image/webp;base64,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",
      category: "Accessories",
    },
    {
      id: 7,
      name: "Coffee Table",
      price: 399,
      discountPrice: 349,
      rating: 4.3,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTgNdHRFUxHj7Jl_Jyvtxbbq9RZvXAi73JKLaztMwUT_jcbbVLTsHAGKX0iVr1UKKNj8_vQtmu4NtdVw8eu11ie8jVpJpp-kIM5Z8WE71MISJjddFnQIluRMpTOsm83d5wroclFAulNnw&usqp=CAc",
      category: "Furniture",
    },
    {
      id: 8,
      name: "Gaming Keyboard",
      price: 129,
      discountPrice: 99,
      rating: 4.7,
      image: "https://assets-prd.ignimgs.com/2024/10/15/81l4fpes3vl-ac-sl1500-1728983194819.jpg",
      category: "Accessories",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-muted dark:bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Quality Products for Your Lifestyle
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Shop the latest tech, stylish furniture, and must-have accessories at unbeatable prices.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/products">
                    <Button size="lg" className="inline-flex items-center">
                      Shop Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/products?category=sale">
                    <Button size="lg" variant="outline">
                      View Deals
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto w-full lg:ml-auto">
                <Carousel className="w-full max-w-full">
                  <CarouselContent>
                    {featuredProducts.map((product) => (
                      <CarouselItem key={product.id} className="carousel-item">
                        <div className="p-1">
                          <Card className="border-0 shadow-none bg-transparent">
                            <CardContent className="flex aspect-square items-center justify-center p-0 md:p-6">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={600}
                                height={600}
                                className="h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover rounded-lg"
                              />
                            </CardContent>
                            <CardFooter className="flex flex-col items-start p-4">
                              <div className="text-lg font-semibold">{product.name}</div>
                              <div className="flex items-center gap-2">
                                {product.discountPrice ? (
                                  <>
                                    <span className="text-lg font-bold">${product.discountPrice}</span>
                                    <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                                  </>
                                ) : (
                                  <span className="text-lg font-bold">${product.price}</span>
                                )}
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden sm:block">
                    <CarouselPrevious className="absolute left-2 top-1/2" />
                    <CarouselNext className="absolute right-2 top-1/2" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our wide selection of products across different categories
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 pt-8">
              <FeaturedCategories />
            </div>
          </div>
        </section>

        {/* Latest Products */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Latest Products</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out our newest arrivals and trending products
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Discounted Products */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Special Offers</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Limited time deals on popular products
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8">
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Link href="/products?category=sale">
                <Button variant="outline" size="lg">
                  View All Deals
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
                  <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Subscribe to our newsletter to receive updates on new products, special offers, and more.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" className="bg-background text-primary hover:bg-background/90">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

