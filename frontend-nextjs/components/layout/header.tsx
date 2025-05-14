"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { LogOut, ShoppingCart, ClipboardList } from "lucide-react"

export function Header() {
  const { isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Order App
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/create-order">
            <Button variant="ghost" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </Link>

          <Link href="/order-history">
            <Button variant="ghost" size="sm">
              <ClipboardList className="h-4 w-4 mr-2" />
              History
            </Button>
          </Link>

          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
