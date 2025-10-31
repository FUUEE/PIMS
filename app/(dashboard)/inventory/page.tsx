"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { AddItemDialog } from "@/components/inventory/add-item-dialog"
import { apiService, type InventoryItem } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [suppliers, setSuppliers] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load inventory and suppliers
    apiService.getInventory().then(setItems)
    apiService.getSuppliers().then((data) => setSuppliers(data.map((s) => s.name)))
  }, [])

  const handleAdd = (newItem: Omit<InventoryItem, "id">) => {
    const item: InventoryItem = {
      ...newItem,
      id: Date.now().toString(),
    }
    setItems([...items, item])
    toast({
      title: "Item added",
      description: `${item.name} has been added to inventory`,
    })
  }

  const handleEdit = (item: InventoryItem) => {
    // TODO: Implement edit dialog
    toast({
      title: "Edit item",
      description: "Edit functionality coming soon",
    })
  }

  const handleDelete = (id: string) => {
    const item = items.find((i) => i.id === id)
    setItems(items.filter((i) => i.id !== id))
    toast({
      title: "Item deleted",
      description: `${item?.name} has been removed from inventory`,
      variant: "destructive",
    })
  }

  return (
    <div>
      <Header title="Inventory Management" subtitle="Manage your stock items and categories" />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">All Items</h2>
            <p className="text-sm text-[var(--muted)]">View and manage your inventory</p>
          </div>
          <AddItemDialog onAdd={handleAdd} suppliers={suppliers} />
        </div>

        <InventoryTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  )
}
