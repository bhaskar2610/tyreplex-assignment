"use client"

import { useEffect } from "react"
import { useOrders } from "@/hooks/useOrders"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"

export function OrderHistoryTable() {
  const { orders, isLoading, error, fetchOrders } = useOrders()

  useEffect(() => {
    fetchOrders().catch(console.error)
  }, [fetchOrders])

  const formatDate = (timestamp: number | string) => {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
  };
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No orders found. Create your first order!</p>
      </div>
    )
  }
  console.log("orders", orders)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>${order.amount.toFixed(2)}</TableCell>

            <TableCell>{formatDate(order.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
