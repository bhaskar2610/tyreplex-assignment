"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Order {
  id: string
  amount: number
  timestamp: number
}

interface OrderContextType {
  orders: Order[]
  createOrder: (amount: number) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders")
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const createOrder = (amount: number) => {
    const newOrder: Order = {
      id: generateOrderId(),
      amount,
      timestamp: Date.now(),
    }
    setOrders((prevOrders) => [newOrder, ...prevOrders])
  }

  // Generate a random order ID
  const generateOrderId = () => {
    return `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  }

  return <OrderContext.Provider value={{ orders, createOrder }}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
