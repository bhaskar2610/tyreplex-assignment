"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderHistoryTable } from "@/components/orders/order-history-table"
import { AuthGuard } from "@/components/layout/auth-guard"

export default function OrderHistoryPage() {
  const router = useRouter()

  return (
    <AuthGuard>
      <div className="container mx-auto py-10 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>View all your past orders</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderHistoryTable />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
              Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AuthGuard>
  )
}
