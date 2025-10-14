"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Eye } from "lucide-react"
import { apiService, type Purchase } from "@/lib/api-service"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [suppliers, setSuppliers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    apiService.getPurchases().then(setPurchases)
    apiService.getSuppliers().then((data) => setSuppliers(data.map((s) => s.name)))
  }, [])

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      purchase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPurchases = filteredPurchases.reduce((sum, purchase) => sum + purchase.total, 0)
  const pendingCount = purchases.filter((p) => p.status === "pending").length

  const statusColors = {
    pending: "bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20",
    completed: "bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20",
    cancelled: "bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/20",
  }

  return (
    <div>
      <Header title="Purchase Management" subtitle="Manage purchase orders and supplier deliveries" />

      <div className="space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--color-muted)]">Total Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--color-foreground)]">{filteredPurchases.length}</p>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--color-muted)]">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--color-primary)]">₱{totalPurchases.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--color-muted)]">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--color-warning)]">{pendingCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
              <Input
                placeholder="Search purchases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[var(--color-background)] pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-[var(--color-background)]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]">
                <Plus className="mr-2 h-4 w-4" />
                New Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="border-[var(--color-border)] bg-[var(--color-surface)]">
              <DialogHeader>
                <DialogTitle className="text-[var(--color-foreground)]">Create Purchase Order</DialogTitle>
                <DialogDescription className="text-[var(--color-muted)]">
                  Add a new purchase order from a supplier
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[var(--color-foreground)]">Supplier</Label>
                  <Select>
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
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]">
                    Create Order
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Purchases Table */}
        <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
          <CardHeader>
            <CardTitle className="text-[var(--color-foreground)]">Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[var(--color-border)] hover:bg-transparent">
                  <TableHead className="text-[var(--color-foreground)]">Order ID</TableHead>
                  <TableHead className="text-[var(--color-foreground)]">Date</TableHead>
                  <TableHead className="text-[var(--color-foreground)]">Supplier</TableHead>
                  <TableHead className="text-[var(--color-foreground)]">Items</TableHead>
                  <TableHead className="text-[var(--color-foreground)]">Status</TableHead>
                  <TableHead className="text-[var(--color-foreground)]">Total</TableHead>
                  <TableHead className="text-right text-[var(--color-foreground)]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-[var(--color-muted)]">
                      No purchases found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPurchases.map((purchase) => (
                    <TableRow key={purchase.id} className="border-[var(--color-border)]">
                      <TableCell className="font-mono text-sm text-[var(--color-muted)]">PO-{purchase.id}</TableCell>
                      <TableCell className="text-[var(--color-foreground)]">
                        {format(new Date(purchase.date), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="text-[var(--color-foreground)]">{purchase.supplier}</TableCell>
                      <TableCell className="text-[var(--color-muted)]">{purchase.items.length} items</TableCell>
                      <TableCell>
                        <Badge className={cn("capitalize", statusColors[purchase.status])}>{purchase.status}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-[var(--color-primary)]">
                        ₱{purchase.total.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
