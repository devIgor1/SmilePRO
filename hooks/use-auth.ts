"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual authentication check
    // This is a placeholder that checks localStorage
    // In a real app, you'd check cookies, tokens, or make an API call
    const checkAuth = () => {
      try {
        const userStr = localStorage.getItem("user")
        if (userStr) {
          setUser(JSON.parse(userStr))
        }
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        checkAuth()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    // TODO: Add actual logout logic (clear tokens, API call, etc.)
    window.location.href = "/"
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
  }
}

