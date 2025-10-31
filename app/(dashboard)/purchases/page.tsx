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
    pending: "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20",
    completed: "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20",
    cancelled: "bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/20",
  }

  return (
    <div>
      <Header title="Purchase Management" subtitle="Manage purchase orders and supplier deliveries" />

      <div className="space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--muted)]">Total Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--foreground)]">{filteredPurchases.length}</p>
            </CardContent>
          </Card>

          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--muted)]">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--primary)]">₱{totalPurchases.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--muted)]">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--warning)]">{pendingCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <Input
                placeholder="Search purchases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[var(--fieldcolor)] pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-[var(--fieldcolor)]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--dropdowncolor)]">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]">
                <Plus className="mr-2 h-4 w-4" />
                New Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="border-[var(--border)] bg-[var(--surface)]">
              <DialogHeader>
                <DialogTitle className="text-[var(--foreground)]">Create Purchase Order</DialogTitle>
                <DialogDescription className="text-[var(--muted)]">
                  Add a new purchase order from a supplier
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[var(--foreground)]">Supplier</Label>
                  <Select>
                    <SelectTrigger className="bg-[var(--background)]">
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
                  <Button className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]">
                    Create Order
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Purchases Table */}
        <Card className="border-[var(--border)] bg-[var(--surface)]">
          <CardHeader>
            <CardTitle className="text-[var(--foreground)]">Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[var(--border)] hover:bg-transparent">
                  <TableHead className="text-[var(--foreground)]">Order ID</TableHead>
                  <TableHead className="text-[var(--foreground)]">Date</TableHead>
                  <TableHead className="text-[var(--foreground)]">Supplier</TableHead>
                  <TableHead className="text-[var(--foreground)]">Items</TableHead>
                  <TableHead className="text-[var(--foreground)]">Status</TableHead>
                  <TableHead className="text-[var(--foreground)]">Total</TableHead>
                  <TableHead className="text-right text-[var(--foreground)]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-[var(--muted)]">
                      No purchases found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPurchases.map((purchase) => (
                    <TableRow key={purchase.id} className="border-[var(--border)]">
                      <TableCell className="font-mono text-sm text-[var(--muted)]">PO-{purchase.id}</TableCell>
                      <TableCell className="text-[var(--foreground)]">
                        {format(new Date(purchase.date), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="text-[var(--foreground)]">{purchase.supplier}</TableCell>
                      <TableCell className="text-[var(--muted)]">{purchase.items.length} items</TableCell>
                      <TableCell>
                        <Badge className={cn("capitalize", statusColors[purchase.status])}>{purchase.status}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-[var(--primary)]">
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
