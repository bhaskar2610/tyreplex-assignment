"use client"

import { useState, useCallback } from "react"
import { createOrder, getOrderHistory } from "@/lib/api/orders"
import type { Order, CreateOrderInput } from "@/types/order"

interface UseOrdersReturn {
  orders: Order[]
  isLoading: boolean
  error: string | null
  fetchOrders: () => Promise<void>
  submitOrder: (orderData: CreateOrderInput) => Promise<Order | null>
}

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getOrderHistory()

      if (response.success && response.data) {
        setOrders(response.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const submitOrder = useCallback(async (orderData: CreateOrderInput): Promise<Order | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await createOrder(orderData)
      console.log("response", response)
      if (response.success && response.data) {
        // Update the orders list with the new order
        setOrders((prevOrders) => [response.data!, ...prevOrders])
        return response.data
      }

      return null
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order")
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    submitOrder,
  }
}
