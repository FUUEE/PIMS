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
    <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--color-muted)]">{title}</p>
            <p className="mt-2 text-3xl font-bold text-[var(--color-foreground)]">{value}</p>
            {change && (
              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  changeType === "positive" && "text-[var(--color-success)]",
                  changeType === "negative" && "text-[var(--color-error)]",
                  changeType === "neutral" && "text-[var(--color-muted)]",
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              iconColor || "bg-[var(--color-primary)]/10",
            )}
          >
            <Icon className={cn("h-6 w-6", iconColor ? "text-current" : "text-[var(--color-primary)]")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
