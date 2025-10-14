"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 450000, purchases: 320000, profit: 130000 },
  { month: "Feb", sales: 520000, purchases: 380000, profit: 140000 },
  { month: "Mar", sales: 380000, purchases: 290000, profit: 90000 },
  { month: "Apr", sales: 610000, purchases: 420000, profit: 190000 },
  { month: "May", sales: 730000, purchases: 510000, profit: 220000 },
  { month: "Jun", sales: 890000, purchases: 620000, profit: 270000 },
]

const categoryData = [
  { name: "Electronics", value: 45, color: "var(--color-primary)" },
  { name: "Furniture", value: 25, color: "var(--color-secondary)" },
  { name: "Accessories", value: 20, color: "#3B82F6" },
  { name: "Others", value: 10, color: "#10B981" },
]

const topProducts = [
  { name: "Laptop Dell XPS 13", revenue: 540000, units: 12 },
  { name: 'Monitor 27" 4K', revenue: 144000, units: 8 },
  { name: "Office Chair Ergonomic", revenue: 68000, units: 8 },
  { name: "Wireless Mouse Logitech", revenue: 54000, units: 45 },
  { name: "Desk Lamp LED", revenue: 45000, units: 18 },
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <div>
      <Header title="Reports & Analytics" subtitle="View detailed reports and insights" />

      <div className="space-y-6 p-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList className="bg-[var(--color-surface)]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40 bg-[var(--color-background)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Key Metrics */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-muted)]">Total Revenue</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-foreground)]">₱3.58M</p>
                        <p className="mt-1 flex items-center text-sm text-[var(--color-success)]">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +12.5%
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                        <DollarSign className="h-6 w-6 text-[var(--color-primary)]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-muted)]">Total Profit</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-foreground)]">₱1.04M</p>
                        <p className="mt-1 flex items-center text-sm text-[var(--color-success)]">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +18.2%
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-success)]/10">
                        <TrendingUp className="h-6 w-6 text-[var(--color-success)]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-muted)]">Items Sold</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-foreground)]">1,247</p>
                        <p className="mt-1 flex items-center text-sm text-[var(--color-error)]">
                          <TrendingDown className="mr-1 h-3 w-3" />
                          -3.1%
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                        <ShoppingCart className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-muted)]">Inventory Value</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-foreground)]">₱2.1M</p>
                        <p className="mt-1 flex items-center text-sm text-[var(--color-success)]">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +5.4%
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                        <Package className="h-6 w-6 text-purple-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                  <CardHeader>
                    <CardTitle className="text-[var(--color-foreground)]">Revenue vs Profit Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="month" stroke="var(--color-muted)" />
                        <YAxis stroke="var(--color-muted)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => `₱${value.toLocaleString()}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="var(--color-primary)"
                          strokeWidth={2}
                          name="Sales"
                        />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          stroke="var(--color-success)"
                          strokeWidth={2}
                          name="Profit"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                  <CardHeader>
                    <CardTitle className="text-[var(--color-foreground)]">Sales by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          // ...existing code...
                          label={({ percent, name }) => `${name ?? ""} ${(percent * 100).toFixed(0)}%`}
                          // ...existing code...
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Top Products */}
              <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-foreground)]">Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-secondary)]/20 text-sm font-bold text-[var(--color-secondary)]">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-[var(--color-foreground)]">{product.name}</p>
                            <p className="text-sm text-[var(--color-muted)]">{product.units} units sold</p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-[var(--color-primary)]">
                          ₱{product.revenue.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="mt-6">
              <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-foreground)]">Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="month" stroke="var(--color-muted)" />
                      <YAxis stroke="var(--color-muted)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-surface)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => `₱${value.toLocaleString()}`}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="var(--color-primary)" radius={[8, 8, 0, 0]} name="Sales" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="mt-6">
              <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-foreground)]">Inventory Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--color-muted)]">Inventory reports coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases" className="mt-6">
              <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-foreground)]">Purchase Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="month" stroke="var(--color-muted)" />
                      <YAxis stroke="var(--color-muted)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-surface)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => `₱${value.toLocaleString()}`}
                      />
                      <Legend />
                      <Bar dataKey="purchases" fill="#3B82F6" radius={[8, 8, 0, 0]} name="Purchases" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
