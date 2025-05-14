import type { ApiResponse } from "@/types/api"
import type { User } from "@/types/user"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export async function requestOtp(mobile: string): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    })
    console.log("data", response);
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to request OTP")
    }

    return await response.json()
  } catch (error) {
    console.error("Request OTP error:", error)
    throw error
  }
}

export async function verifyOtp(mobile: string, otp: string): Promise<ApiResponse<{ token: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, otp }),
    })
    const json = await response.json()
    console.log("data",json );
    if (!response.ok) {
      const errorData = json;
      throw new Error(errorData.message || "Failed to verify OTP")
    }

    return json;
  } catch (error) {
    console.error("Verify OTP error:", error)
    throw error
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token)
  }
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken")
  }
}
