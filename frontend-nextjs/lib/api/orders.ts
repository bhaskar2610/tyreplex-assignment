import type { ApiResponse } from "@/types/api"
import type { Order, CreateOrderInput } from "@/types/order"
import { getAuthToken } from "./auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export async function createOrder(orderData: CreateOrderInput): Promise<ApiResponse<Order>> {
  const token = getAuthToken()

  if (!token) {
    throw new Error("Authentication required")
  }

  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to create order")
    }

    return await response.json()
  } catch (error) {
    console.error("Create order error:", error)
    throw error
  }
}

export async function getOrderHistory(): Promise<ApiResponse<Order[]>> {
  const token = getAuthToken()

  if (!token) {
    throw new Error("Authentication required")
  }

  try {
    const response = await fetch(`${API_BASE_URL}/orders/order-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch order history")
    }

    return await response.json()
  } catch (error) {
    console.error("Get order history error:", error)
    throw error
  }
}
