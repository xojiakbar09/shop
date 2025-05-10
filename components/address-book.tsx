"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function AddressBook() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      street: "456 Office Blvd",
      city: "New York",
      state: "NY",
      zip: "10002",
      country: "United States",
      isDefault: false,
    },
  ])

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    isDefault: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zip) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Add new address
    const newId = addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1

    // If new address is default, update other addresses
    let updatedAddresses = [...addresses]
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((address) => ({
        ...address,
        isDefault: false,
      }))
    }

    setAddresses([
      ...updatedAddresses,
      {
        ...newAddress,
        id: newId,
      },
    ])

    // Reset form and close dialog
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      isDefault: false,
    })
    setIsDialogOpen(false)

    toast({
      title: "Address added",
      description: "Your new address has been added successfully.",
    })
  }

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )

    toast({
      title: "Default address updated",
      description: "Your default address has been updated.",
    })
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id))

    toast({
      title: "Address deleted",
      description: "The address has been removed from your account.",
    })
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <Card key={address.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-base">{address.name}</CardTitle>
              {address.isDefault && <Badge variant="outline">Default</Badge>}
            </div>
          </CardHeader>
          <CardContent className="text-sm">
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zip}
            </p>
            <p>{address.country}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSetDefault(address.id)}
              disabled={address.isDefault}
            >
              Set as Default
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDeleteAddress(address.id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>Add a new shipping or billing address to your account.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddAddress}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Address Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Home, Work, etc."
                  value={newAddress.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  placeholder="123 Main St"
                  value={newAddress.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="New York"
                    value={newAddress.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="NY"
                    value={newAddress.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" name="zip" placeholder="10001" value={newAddress.zip} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={newAddress.country} onChange={handleInputChange} />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, isDefault: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="isDefault">Set as default address</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Address</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

