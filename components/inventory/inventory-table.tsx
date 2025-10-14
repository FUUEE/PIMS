"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Search } from "lucide-react"
import type { InventoryItem } from "@/lib/api-service"
import { cn } from "@/lib/utils"

interface InventoryTableProps {
  items: InventoryItem[]
  onEdit: (item: InventoryItem) => void
  onDelete: (id: string) => void
}

export function InventoryTable({ items, onEdit, onDelete }: InventoryTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))]

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-[var(--color-error)] text-white" }
    if (stock <= threshold) return { label: "Low Stock", color: "bg-[var(--color-warning)] text-white" }
    return { label: "In Stock", color: "bg-[var(--color-success)] text-white" }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
          <Input
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[var(--color-background)] pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full bg-[var(--color-background)] sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
        <Table>
          <TableHeader>
            <TableRow className="border-[var(--color-border)] hover:bg-transparent">
              <TableHead className="text-[var(--color-foreground)]">SKU</TableHead>
              <TableHead className="text-[var(--color-foreground)]">Name</TableHead>
              <TableHead className="text-[var(--color-foreground)]">Category</TableHead>
              <TableHead className="text-[var(--color-foreground)]">Price</TableHead>
              <TableHead className="text-[var(--color-foreground)]">Stock</TableHead>
              <TableHead className="text-[var(--color-foreground)]">Status</TableHead>
              <TableHead className="text-[var(--color-foreground)]">Supplier</TableHead>
              <TableHead className="text-right text-[var(--color-foreground)]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-[var(--color-muted)]">
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => {
                const status = getStockStatus(item.stock, item.lowStockThreshold)
                return (
                  <TableRow key={item.id} className="border-[var(--color-border)]">
                    <TableCell className="font-mono text-sm text-[var(--color-muted)]">{item.sku}</TableCell>
                    <TableCell className="font-medium text-[var(--color-foreground)]">{item.name}</TableCell>
                    <TableCell className="text-[var(--color-muted)]">{item.category}</TableCell>
                    <TableCell className="text-[var(--color-foreground)]">₱{item.price.toLocaleString()}</TableCell>
                    <TableCell className="text-[var(--color-foreground)]">{item.stock}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", status.color)}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-[var(--color-muted)]">{item.supplier}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item)}
                          className="h-8 w-8 text-[var(--color-muted)] hover:text-[var(--color-primary)]"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(item.id)}
                          className="h-8 w-8 text-[var(--color-muted)] hover:text-[var(--color-error)]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--color-muted)]">
        Showing {filteredItems.length} of {items.length} items
      </p>
    </div>
  )
}
