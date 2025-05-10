"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Plus, Trash2 } from "lucide-react"

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

export default function PaymentMethods() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      cardNumber: "**** **** **** 1234",
      cardType: "Visa",
      expiryDate: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      cardNumber: "**** **** **** 5678",
      cardType: "Mastercard",
      expiryDate: "06/24",
      isDefault: false,
    },
  ])

  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCard((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!newCard.cardNumber || !newCard.cardholderName || !newCard.expiryDate || !newCard.cvv) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Add new card
    const newId = paymentMethods.length > 0 ? Math.max(...paymentMethods.map((pm) => pm.id)) + 1 : 1

    // If new card is default, update other cards
    let updatedPaymentMethods = [...paymentMethods]
    if (newCard.isDefault) {
      updatedPaymentMethods = updatedPaymentMethods.map((pm) => ({
        ...pm,
        isDefault: false,
      }))
    }

    // Mask card number
    const lastFour = newCard.cardNumber.slice(-4)
    const maskedCardNumber = `**** **** **** ${lastFour}`

    // Determine card type (simplified)
    const firstDigit = newCard.cardNumber.charAt(0)
    let cardType = "Unknown"
    if (firstDigit === "4") cardType = "Visa"
    else if (firstDigit === "5") cardType = "Mastercard"
    else if (firstDigit === "3") cardType = "American Express"
    else if (firstDigit === "6") cardType = "Discover"

    setPaymentMethods([
      ...updatedPaymentMethods,
      {
        id: newId,
        cardNumber: maskedCardNumber,
        cardType,
        expiryDate: newCard.expiryDate,
        isDefault: newCard.isDefault,
      },
    ])

    // Reset form and close dialog
    setNewCard({
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    })
    setIsDialogOpen(false)

    toast({
      title: "Card added",
      description: "Your new payment method has been added successfully.",
    })
  }

  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      })),
    )

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    })
  }

  const handleDeleteCard = (id: number) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id))

    toast({
      title: "Payment method deleted",
      description: "The payment method has been removed from your account.",
    })
  }

  return (
    <div className="space-y-4">
      {paymentMethods.map((pm) => (
        <Card key={pm.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-base">{pm.cardType}</CardTitle>
              {pm.isDefault && <Badge variant="outline">Default</Badge>}
            </div>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-sm">
            <p>{pm.cardNumber}</p>
            <p>Expires: {pm.expiryDate}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => handleSetDefault(pm.id)} disabled={pm.isDefault}>
              Set as Default
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDeleteCard(pm.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Card
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCard}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  name="cardholderName"
                  placeholder="John Doe"
                  value={newCard.cardholderName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    placeholder="123"
                    value={newCard.cvv}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefaultCard"
                  checked={newCard.isDefault}
                  onChange={(e) => setNewCard((prev) => ({ ...prev, isDefault: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="isDefaultCard">Set as default payment method</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Card</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

