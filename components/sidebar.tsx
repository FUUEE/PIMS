"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ShoppingBag,
  Users,
  FileText,
  Bell,
  Settings,
  LogOut,
  CreditCard,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: ("admin" | "staff" | "cashier")[]
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "staff", "cashier"] },
  { name: "Inventory", href: "/inventory", icon: Package, roles: ["admin", "staff"] },
  { name: "Point of Sale", href: "/pos", icon: CreditCard, roles: ["admin", "cashier"] },
  { name: "Sales", href: "/sales", icon: ShoppingCart, roles: ["admin", "staff"] },
  { name: "Purchases", href: "/purchases", icon: ShoppingBag, roles: ["admin", "staff"] },
  { name: "Suppliers", href: "/suppliers", icon: Users, roles: ["admin", "staff"] },
  { name: "Reports", href: "/reports", icon: FileText, roles: ["admin", "staff"] },
  { name: "Notifications", href: "/notifications", icon: Bell, roles: ["admin", "staff", "cashier"] },
  { name: "Settings", href: "/settings", icon: Settings, roles: ["admin"] },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const filteredNavItems = navItems.filter((item) => user && item.roles.includes(user.role))

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-[var(--color-border)] px-6">
          <Image src="/logo.png" alt="Pandayan Logo" width={40} height={40} className="rounded-full" />
          <div>
            <h1 className="text-lg font-bold text-[var(--color-secondary)]">Pandayan</h1>
            <p className="text-xs text-[var(--color-muted)]">IMS</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-foreground)]",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-[var(--color-border)] p-4">
          <div className="mb-3 rounded-lg bg-[var(--color-background)] p-3">
            <p className="text-sm font-medium text-[var(--color-foreground)]">{user?.name}</p>
            <p className="text-xs text-[var(--color-muted)]">{user?.email}</p>
            <p className="mt-1 inline-block rounded bg-[var(--color-primary)] px-2 py-0.5 text-xs font-medium text-white">
              {user?.role.toUpperCase()}
            </p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-error)]"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
