"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { requestOtp, verifyOtp, getAuthToken, setAuthToken, removeAuthToken } from "@/lib/api/auth"
import type { User } from "@/types/user"

interface UseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  requestUserOtp: (phoneNumber: string) => Promise<void>
  verifyUserOtp: (phoneNumber: string, otp: string) => Promise<boolean>


  logout: () => void
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    const token = getAuthToken()
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      } catch (e) {
        console.error("Failed to parse stored user", e)
        removeAuthToken()
        localStorage.removeItem("user")
      }
    }

    setIsLoading(false)
  }, [])

  const requestUserOtp = useCallback(async (phoneNumber: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      await requestOtp(phoneNumber)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request OTP")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const verifyUserOtp = useCallback(async (phoneNumber: string, otp: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await verifyOtp(phoneNumber, otp)
      console.log("response.success", response.success)
      if (response.success && response.data) {
        const { token } = response.data
        setAuthToken(token)
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
        setIsAuthenticated(true)
        return true
      }

      return false
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    removeAuthToken()
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
    router.push("/login")
  }, [router])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    requestUserOtp,
    verifyUserOtp,
    logout,
  }
}
