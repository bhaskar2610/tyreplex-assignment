"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/layout/auth-guard"
import { ShoppingCart, ClipboardList } from "lucide-react"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <AuthGuard>
      <div className="container mx-auto py-10 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Welcome{user?.name ? `, ${user.name}` : ""}!</CardTitle>
            <CardDescription>Manage your orders from this dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full flex items-center justify-center" onClick={() => router.push("/create-order")}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Create New Order
            </Button>
            <Button
              className="w-full flex items-center justify-center"
              onClick={() => router.push("/order-history")}
              variant="outline"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              View Order History
            </Button>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}
