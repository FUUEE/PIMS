"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockSalesData = [
  { day: "Mon", sales: 45000 },
  { day: "Tue", sales: 52000 },
  { day: "Wed", sales: 38000 },
  { day: "Thu", sales: 61000 },
  { day: "Fri", sales: 73000 },
  { day: "Sat", sales: 89000 },
  { day: "Sun", sales: 42000 },
]

export function SalesChart() {
  return (
    <Card className="border-[var(--border)] bg-[var(--surface)]">
      <CardHeader>
        <CardTitle className="text-[var(--foreground)]">Weekly Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockSalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--barborderforeground)" />
            <YAxis stroke="var(--barborderforeground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "lightblue",
                border: "1px solid #80caff",
                borderRadius: "8px",
                 color: "var(--hoveredtext)"
              }}
              formatter={(value: number) => [
                <span style={{ color: "var(--hoveredtext)", fontWeight: 600 }}>
                  ₱{value.toLocaleString()}
                </span>,
              ]}
            />


            {/* ✅ Active (hovered) bar turns light green */}
            <Bar
              dataKey="sales"
              fill="black"
              radius={[8, 8, 0, 0]}
              activeBar={{
                fill: "var(--barforeground)", // solid light green on hover
                stroke: "var(--barborderforeground)", // optional darker border for definition
                strokeWidth: 2,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
