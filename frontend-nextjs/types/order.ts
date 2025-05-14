export interface Order {
  id: string
  amount: number
  createdAt: string
  status: "pending" | "completed" | "cancelled"
  userId: string
}

export interface CreateOrderInput {
  amount: number
}
