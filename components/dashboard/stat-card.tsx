import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  iconColor?: string
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, iconColor }: StatCardProps) {
  return (
    <Card className="border-[var(--border)] bg-[var(--surface)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--muted)]">{title}</p>
            <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">{value}</p>
            {change && (
              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  changeType === "positive" && "text-[var(--success)]",
                  changeType === "negative" && "text-[var(--error)]",
                  changeType === "neutral" && "text-[var(--muted)]",
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              iconColor || "bg-[var(--primary)]/10",
            )}
          >
            <Icon className={cn("h-6 w-6", iconColor ? "text-current" : "text-[var(--primary)]")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
