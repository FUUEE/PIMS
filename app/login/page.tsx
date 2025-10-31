"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--surface)] to-[var(--background)] p-4">
      <Card className="w-full max-w-md border-[var(--border)] bg-[var(--surface)]">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] p-2">
            <Image src="/logo.png" alt="Pandayan Logo" width={80} height={80} className="rounded-full" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-[var(--foreground)]">
              Pandayan <span className="text-[var(--secondary)]">IMS</span>
            </CardTitle>
            <CardDescription className="text-[var(--muted)]">Inventory Management System</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-[var(--error)] bg-[var(--error)]/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[var(--foreground)]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@pandayan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[var(--fieldcolor)] text-[var(--foreground)]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[var(--foreground)]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[var(--fieldcolor)] text-[var(--foreground)]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--buttoncolor2)] text-white hover:bg-[var(--primary-hover)]"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* <div className="mt-6 space-y-2 rounded-lg bg-[var(--background)] p-4 text-xs text-[var(--muted)]">
            <p className="font-semibold text-[var(--foreground)]">Demo Accounts:</p>
            <p>Admin: admin@pandayan.com / admin123</p>
            <p>Staff: staff@pandayan.com / staff123</p>
            <p>Cashier: cashier@pandayan.com / cashier123</p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}
