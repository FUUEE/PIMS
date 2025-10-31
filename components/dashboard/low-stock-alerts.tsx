import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LowStockItem {
  id: string
  name: string
  stock: number
  threshold: number
}

const mockLowStockItems: LowStockItem[] = [
  { id: "5", name: 'Monitor 27" 4K', stock: 4, threshold: 5 },
  { id: "2", name: "Office Chair Ergonomic", stock: 8, threshold: 10 },
]

export function LowStockAlerts() {
  return (
    <Card className="border-[var(--border)] bg-[var(--surface)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--foreground)]">
          <AlertTriangle className="h-5 w-5 text-[var(--warning)]" />
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mockLowStockItems.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No low stock items</p>
        ) : (
          <div className="space-y-3">
            {mockLowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-[var(--warning)]/20 bg-[var(--warning)]/5 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {item.stock} units left (threshold: {item.threshold})
                  </p>
                </div>
                <Badge variant="outline" className="border-[var(--warning)] text-[var(--warning)]">
                  Low Stock
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
