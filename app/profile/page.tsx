"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Package, User, CreditCard, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { logout } from "@/lib/features/auth/authSlice"
import OrderHistory from "@/components/order-history"
import AddressBook from "@/components/address-book"
import PaymentMethods from "@/components/payment-methods"
import LoginForm from "@/components/login-form"

export default function ProfilePage() {
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the user profile via an API
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">Sign in to access your profile and orders</p>
          </div>
          <LoginForm />
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Manage your account settings and view orders</p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-[240px_1fr]">
          <Card className="h-fit md:sticky md:top-20">
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#orders">
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#payment">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment
                </a>
              </Button>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6 md:space-y-8">
            <Card id="profile">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      <Button type="submit">Save Changes</Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <div className="text-sm font-medium">First name</div>
                        <div>{user?.firstName || "John"}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Last name</div>
                        <div>{user?.lastName || "Doe"}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div>{user?.email || "john.doe@example.com"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Phone</div>
                      <div>{user?.phone || "+1 (555) 123-4567"}</div>
                    </div>
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card id="orders">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders and track current ones</CardDescription>
              </CardHeader>
              <CardContent>
                <OrderHistory />
              </CardContent>
            </Card>

            <Card id="payment">
              <CardHeader>
                <CardTitle>Payment & Addresses</CardTitle>
                <CardDescription>Manage your payment methods and addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="payment">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  </TabsList>
                  <TabsContent value="payment" className="space-y-4">
                    <PaymentMethods />
                  </TabsContent>
                  <TabsContent value="addresses" className="space-y-4">
                    <AddressBook />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

