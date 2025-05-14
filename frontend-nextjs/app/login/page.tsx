"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  )
}
