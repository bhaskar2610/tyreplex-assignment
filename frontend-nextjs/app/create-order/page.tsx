"use client"

import { CreateOrderForm } from "@/components/orders/create-order-form"
import { AuthGuard } from "@/components/layout/auth-guard"

export default function CreateOrderPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-10 px-4">
        <CreateOrderForm />
      </div>
    </AuthGuard>
  )
}
