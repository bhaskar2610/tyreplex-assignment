"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const { isLoading, error, requestUserOtp, verifyUserOtp } = useAuth()
  const router = useRouter()

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      return
    }

    try {
      await requestUserOtp(phoneNumber)
      setOtpSent(true)
    } catch (error) {
      console.error("Failed to send OTP:", error)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      return
    }

    try {
      const success = await verifyUserOtp(phoneNumber, otp)
      if (success) {
        router.push("/")
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login with your phone number and OTP</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!otpSent ? (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isLoading}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter the OTP sent to your phone"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">OTP has been sent to your phone number</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!otpSent ? (
          <Button className="w-full" onClick={handleSendOtp} disabled={isLoading || phoneNumber.length < 10}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
        ) : (
          <div className="w-full space-y-2">
            <Button className="w-full" onClick={handleVerifyOtp} disabled={isLoading || otp.length < 4}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setOtpSent(false)
                setOtp("")
              }}
              disabled={isLoading}
            >
              Back
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
