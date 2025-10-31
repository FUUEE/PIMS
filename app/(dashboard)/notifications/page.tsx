"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bell, CheckCircle, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "alert" | "info" | "success" | "warning"
  category: "inventory" | "sales" | "purchase" | "system"
  title: string
  message: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    category: "inventory",
    title: "Low Stock Alert",
    message: 'Monitor 27" 4K is running low on stock (4 units remaining)',
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "alert",
    category: "inventory",
    title: "Critical Stock Level",
    message: "Office Chair Ergonomic has reached critical stock level (8 units)",
    time: "15 minutes ago",
    read: false,
  },
  {
    id: "3",
    type: "success",
    category: "purchase",
    title: "Purchase Order Completed",
    message: "Purchase order PO-001 from Tech Supplies Inc has been completed",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "info",
    category: "sales",
    title: "High Sales Volume",
    message: "Today's sales have exceeded the daily average by 25%",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "warning",
    category: "purchase",
    title: "Pending Purchase Order",
    message: "Purchase order PO-003 from Cable Co is still pending delivery",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "6",
    type: "success",
    category: "inventory",
    title: "Stock Restocked",
    message: "Wireless Mouse Logitech has been restocked (+20 units)",
    time: "5 hours ago",
    read: true,
  },
]

const notificationIcons = {
  alert: AlertTriangle,
  info: Bell,
  success: CheckCircle,
  warning: AlertTriangle,
}

const notificationColors = {
  alert: "border-[var(--error)] bg-[var(--error)]/5",
  info: "border-blue-500 bg-blue-500/5",
  success: "border-[var(--success)] bg-[var(--success)]/5",
  warning: "border-[var(--warning)] bg-[var(--warning)]/5",
}

const iconColors = {
  alert: "text-[var(--error)]",
  info: "text-blue-500",
  success: "text-[var(--success)]",
  warning: "text-[var(--warning)]",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = notifications.filter((n) => (filter === "all" ? true : !n.read))

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <div>
      <Header title="Notifications" subtitle="Stay updated with system alerts and updates" />

      <div className="space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--muted)]">Total</p>
                  <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">{notifications.length}</p>
                </div>
                <Bell className="h-8 w-8 text-[var(--muted)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--muted)]">Unread</p>
                  <p className="mt-2 text-3xl font-bold text-[var(--primary)]">{unreadCount}</p>
                </div>
                <Clock className="h-8 w-8 text-[var(--primary)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--muted)]">Alerts</p>
                  <p className="mt-2 text-3xl font-bold text-[var(--error)]">
                    {notifications.filter((n) => n.type === "alert" || n.type === "warning").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-[var(--error)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--muted)]">Success</p>
                  <p className="mt-2 text-3xl font-bold text-[var(--success)]">
                    {notifications.filter((n) => n.type === "success").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-[var(--success)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card className="border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] p-6">
            <div className="flex items-center justify-between">
              <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "unread")}>
                <TabsList className="bg-[var(--background)]">
                  <TabsTrigger value="all">All Notifications</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread
                    {unreadCount > 0 && (
                      <Badge className="ml-2 bg-[var(--primary)] text-white" variant="secondary">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead} className="bg-[var(--buttoncolor1)] text-white">
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          <CardContent className="p-0">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="mb-4 h-12 w-12 text-[var(--muted)]" />
                <p className="text-[var(--muted)]">No notifications to display</p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {filteredNotifications.map((notification) => {
                  const Icon = notificationIcons[notification.type]
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-4 p-6 transition-colors hover:bg-[var(--background)]",
                        !notification.read && "bg-[var(--background)]",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg border",
                          notificationColors[notification.type],
                        )}
                      >
                        <Icon className={cn("h-5 w-5", iconColors[notification.type])} />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-[var(--foreground)]">{notification.title}</p>
                              {!notification.read && <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />}
                            </div>
                            <p className="mt-1 text-sm text-[var(--muted)]">{notification.message}</p>
                            <p className="mt-2 text-xs text-[var(--muted)]">{notification.time}</p>
                          </div>

                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 text-xs bg-[var(--buttoncolor1)] text-white"
                              >
                                Mark as read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 text-[var(--error)] hover:text-[var(--error)]"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
