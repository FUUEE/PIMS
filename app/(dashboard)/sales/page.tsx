"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Eye } from "lucide-react"
import { apiService, type Sale } from "@/lib/api-service"
import { format } from "date-fns"

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentFilter, setPaymentFilter] = useState("all")

  useEffect(() => {
    apiService.getSales().then(setSales)
  }, [])

  const filteredSales = sales.filter((sale) => {
    const matchesSearch = sale.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPayment = paymentFilter === "all" || sale.paymentMethod === paymentFilter
    return matchesSearch && matchesPayment
  })

  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0)
  const totalSales = filteredSales.length

  const paymentMethodColors = {
    cash: "bg-green-500/10 text-green-500 border-green-500/20",
    card: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    online: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  }

  return (
    <div>
      <Header title="Sales Management" subtitle="View and manage sales transactions" />

      <div className="space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--muted)]">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--foreground)]">{totalSales}</p>
            </CardContent>
          </Card>

          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--muted)]">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--primary)]">₱{totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--muted)]">Average Sale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--foreground)]">
                ₱{totalSales > 0 ? Math.round(totalRevenue / totalSales).toLocaleString() : 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <Input
                placeholder="Search by transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[var(--fieldcolor)] pl-10"
              />
            </div>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-48 bg-[var(--fieldcolor)]">
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--dropdowncolor)]">
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="gap-2 bg-[var(--buttoncolor2)] text-[var(--hoveredtext)]">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Sales Table */}
        <Card className="border-[var(--border)] bg-[var(--surface)]">
          <CardHeader>
            <CardTitle className="text-[var(--foreground)]">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[var(--border)] hover:bg-transparent">
                  <TableHead className="text-[var(--foreground)]">Transaction ID</TableHead>
                  <TableHead className="text-[var(--foreground)]">Date & Time</TableHead>
                  <TableHead className="text-[var(--foreground)]">Items</TableHead>
                  <TableHead className="text-[var(--foreground)]">Payment Method</TableHead>
                  <TableHead className="text-[var(--foreground)]">Cashier</TableHead>
                  <TableHead className="text-[var(--foreground)]">Total</TableHead>
                  <TableHead className="text-right text-[var(--foreground)]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-[var(--muted)]">
                      No sales found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSales.map((sale) => (
                    <TableRow key={sale.id} className="border-[var(--border)]">
                      <TableCell className="font-mono text-sm text-[var(--muted)]">#{sale.id}</TableCell>
                      <TableCell className="text-[var(--foreground)]">
                        {format(new Date(sale.date), "MMM dd, yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="text-[var(--muted)]">{sale.items.length} items</TableCell>
                      <TableCell>
                        <Badge className={paymentMethodColors[sale.paymentMethod]}>
                          {sale.paymentMethod.charAt(0).toUpperCase() + sale.paymentMethod.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[var(--muted)]">{sale.cashier}</TableCell>
                      <TableCell className="font-semibold text-[var(--primary)]">
                        ₱{sale.total.toLocaleString()}
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
