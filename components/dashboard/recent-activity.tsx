import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, ShoppingBag, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "inventory" | "sale" | "purchase" | "alert"
  message: string
  time: string
}

const mockActivities: Activity[] = [
  { id: "1", type: "sale", message: "New sale: Laptop Dell XPS 13 - ₱45,000", time: "2 minutes ago" },
  { id: "2", type: "alert", message: 'Low stock alert: Monitor 27" 4K (4 units left)', time: "15 minutes ago" },
  { id: "3", type: "purchase", message: "Purchase order completed from Tech Supplies Inc", time: "1 hour ago" },
  { id: "4", type: "inventory", message: "Stock updated: Wireless Mouse Logitech (+20 units)", time: "2 hours ago" },
  { id: "5", type: "sale", message: "New sale: Desk Lamp LED x3 - ₱7,500", time: "3 hours ago" },
]

const activityIcons = {
  inventory: Package,
  sale: ShoppingCart,
  purchase: ShoppingBag,
  alert: TrendingUp,
}

const activityColors = {
  inventory: "bg-blue-500/10 text-blue-500",
  sale: "bg-green-500/10 text-green-500",
  purchase: "bg-purple-500/10 text-purple-500",
  alert: "bg-[var(--secondary)]/20 text-[var(--secondary)]",
}

export function RecentActivity() {
  return (
    <Card className="border-[var(--border)] bg-[var(--surface)]">
      <CardHeader>
        <CardTitle className="text-[var(--foreground)]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const Icon = activityIcons[activity.type]
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div
                  className={cn("flex h-10 w-10 items-center justify-center rounded-lg", activityColors[activity.type])}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-[var(--foreground)]">{activity.message}</p>
                  <p className="text-xs text-[var(--muted)]">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
