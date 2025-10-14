import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
}

const mockTopProducts: TopProduct[] = [
  { id: "1", name: "Laptop Dell XPS 13", sales: 12, revenue: 540000 },
  { id: "5", name: 'Monitor 27" 4K', sales: 8, revenue: 144000 },
  { id: "3", name: "Wireless Mouse Logitech", sales: 45, revenue: 54000 },
  { id: "6", name: "Desk Lamp LED", sales: 18, revenue: 45000 },
]

export function TopProducts() {
  return (
    <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--color-foreground)]">
          <TrendingUp className="h-5 w-5 text-[var(--color-success)]" />
          Top Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTopProducts.map((product, index) => (
            <div key={product.id} className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-secondary)]/20 text-sm font-bold text-[var(--color-secondary)]">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--color-foreground)]">{product.name}</p>
                <p className="text-xs text-[var(--color-muted)]">
                  {product.sales} sales • ₱{product.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
