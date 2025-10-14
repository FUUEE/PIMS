import { Header } from "@/components/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { LowStockAlerts } from "@/components/dashboard/low-stock-alerts"
import { TopProducts } from "@/components/dashboard/top-products"
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div>
      <Header title="Dashboard" subtitle="Welcome back to Pandayan Inventory Management System" />

      <div className="space-y-6 p-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="₱400,000"
            change="+12.5% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatCard
            title="Total Sales"
            value="156"
            change="+8.2% from last month"
            changeType="positive"
            icon={ShoppingCart}
          />
          <StatCard
            title="Inventory Items"
            value="254"
            change="6 items low stock"
            changeType="negative"
            icon={Package}
          />
          <StatCard title="Active Suppliers" value="12" change="2 new this month" changeType="positive" icon={Users} />
        </div>

        {/* Charts and Analytics */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SalesChart />
          <TopProducts />
        </div>

        {/* Activity and Alerts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivity />
          <LowStockAlerts />
        </div>
      </div>
    </div>
  )
}
