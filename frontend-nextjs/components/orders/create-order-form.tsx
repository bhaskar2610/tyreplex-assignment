"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useOrders } from "@/hooks/useOrders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export function CreateOrderForm() {
  const [amount, setAmount] = useState("")
  const { isLoading, error, submitOrder } = useOrders()
  const router = useRouter()

  const handleCreateOrder = async () => {
    const amountValue = Number.parseFloat(amount)

    if (isNaN(amountValue) || amountValue <= 0) {
      return
    }

    try {
      const order = await submitOrder({ amount: amountValue })
      if (order) {
        setAmount("")
        router.push("/order-history")
      }
    } catch (error) {
      console.error("Failed to create order:", error)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Order</CardTitle>
        <CardDescription>Enter the order amount to create a new order</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="amount">Order Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            disabled={isLoading}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          className="w-full"
          onClick={handleCreateOrder}
          disabled={isLoading || !amount || Number.parseFloat(amount) <= 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Order
            </>
          ) : (
            "Create Order"
          )}
        </Button>
        <Button variant="outline" className="w-full" onClick={() => router.push("/")} disabled={isLoading}>
          Back to Dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}
