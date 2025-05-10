"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsDown, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAppSelector } from "@/lib/hooks"

interface ProductReviewsProps {
  productId: number
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { toast } = useToast()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "2 months ago",
      text: "These headphones are amazing! The sound quality is crystal clear, and the noise cancellation works perfectly. Battery life is impressive too - I've been using them for a week without needing to recharge.",
      helpful: 24,
      unhelpful: 2,
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "1 month ago",
      text: "Great headphones overall. The sound quality is excellent and they're very comfortable to wear for long periods. The only downside is that the app can be a bit buggy sometimes.",
      helpful: 15,
      unhelpful: 1,
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "3 weeks ago",
      text: "Absolutely love these! The sound is incredible and they fit perfectly. The noise cancellation is a game-changer for my daily commute.",
      helpful: 10,
      unhelpful: 0,
    },
  ]

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a review.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would submit the review to an API
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    })
    setReviewText("")
    setRating(5)
  }

  const handleHelpful = (reviewId: number, type: "helpful" | "unhelpful") => {
    // In a real app, this would update the helpful/unhelpful count via an API
    toast({
      title: "Feedback recorded",
      description: `You marked this review as ${type}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(4.7) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium">4.7 out of 5</span>
        </div>
      </div>

      {isAuthenticated && (
        <div className="rounded-lg border p-4">
          <h4 className="mb-2 font-medium">Write a Review</h4>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= (hoveredRating || rating) ? "fill-primary text-primary" : "text-muted"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm">{rating} stars</span>
              </div>
            </div>
            <Textarea
              placeholder="Share your experience with this product..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="mb-4 min-h-[100px]"
            />
            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      )}

      <Separator />

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.user.name}</div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm">{review.text}</p>
            <div className="flex items-center space-x-4 text-sm">
              <button
                onClick={() => handleHelpful(review.id, "helpful")}
                className="flex items-center text-muted-foreground hover:text-primary"
              >
                <ThumbsUp className="mr-1 h-4 w-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button
                onClick={() => handleHelpful(review.id, "unhelpful")}
                className="flex items-center text-muted-foreground hover:text-primary"
              >
                <ThumbsDown className="mr-1 h-4 w-4" />
                <span>Not helpful ({review.unhelpful})</span>
              </button>
            </div>
            <Separator className="mt-4" />
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Load More Reviews
      </Button>
    </div>
  )
}

