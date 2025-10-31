"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"
import type { InventoryItem } from "@/lib/api-service"
import { cn } from "@/lib/utils"

interface ProductGridProps {
  items: InventoryItem[]
  onAddToCart: (item: InventoryItem) => void
}

export function ProductGrid({ items, onAddToCart }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[var(--background)] pl-10"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              className={cn(
                "h-auto flex-col items-start gap-2 border-[var(--border)] bg-[var(--surface)] p-4 text-left hover:border-[var(--primary)] hover:bg-[var(--surface)]",
                item.stock === 0 && "opacity-50",
              )}
              onClick={() => item.stock > 0 && onAddToCart(item)}
              disabled={item.stock === 0}
            >
              <div className="flex w-full items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--foreground)] line-clamp-2">{item.name}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item.category}</p>
                </div>
                <Plus className="h-4 w-4 text-[var(--primary)]" />
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-lg font-bold text-[var(--primary)]">₱{item.price.toLocaleString()}</p>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    item.stock === 0
                      ? "border-[var(--error)] text-[var(--error)]"
                      : item.stock <= item.lowStockThreshold
                        ? "border-[var(--warning)] text-[var(--warning)]"
                        : "border-[var(--success)] text-[var(--success)]",
                  )}
                >
                  {item.stock} left
                </Badge>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
