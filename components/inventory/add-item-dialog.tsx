"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import type { InventoryItem } from "@/lib/api-service"

interface AddItemDialogProps {
  onAdd: (item: Omit<InventoryItem, "id">) => void
  suppliers: string[]
}

export function AddItemDialog({ onAdd, suppliers }: AddItemDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    lowStockThreshold: "",
    supplier: "",
    lastRestocked: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      lowStockThreshold: Number.parseInt(formData.lowStockThreshold),
      supplier: formData.supplier,
      lastRestocked: formData.lastRestocked,
    })
    setOpen(false)
    setFormData({
      name: "",
      sku: "",
      category: "",
      price: "",
      stock: "",
      lowStockThreshold: "",
      supplier: "",
      lastRestocked: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-[var(--color-border)] bg-[var(--color-surface)] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[var(--color-foreground)]">Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[var(--color-foreground)]">
                Item Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-[var(--color-background)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku" className="text-[var(--color-foreground)]">
                SKU
              </Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                required
                className="bg-[var(--color-background)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-[var(--color-foreground)]">
              Category
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="bg-[var(--color-background)]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-[var(--color-foreground)]">
                Price (₱)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="bg-[var(--color-background)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-[var(--color-foreground)]">
                Stock Quantity
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
                className="bg-[var(--color-background)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="threshold" className="text-[var(--color-foreground)]">
              Low Stock Threshold
            </Label>
            <Input
              id="threshold"
              type="number"
              value={formData.lowStockThreshold}
              onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
              required
              className="bg-[var(--color-background)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier" className="text-[var(--color-foreground)]">
              Supplier
            </Label>
            <Select value={formData.supplier} onValueChange={(value) => setFormData({ ...formData, supplier: value })}>
              <SelectTrigger className="bg-[var(--color-background)]">
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier} value={supplier}>
                    {supplier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
            >
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
