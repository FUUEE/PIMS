"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div>
      <Header title="Settings" subtitle="Manage your system preferences and configurations" />

      <div className="space-y-6 p-6">
        <Card className="border-[var(---border)] bg-[var(---surface)]">
          <CardHeader>
            <CardTitle className="text-[var(---foreground)]">Profile Settings</CardTitle>
            <CardDescription className="text-[var(---muted)]">Update your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[var(---foreground)]">Full Name</Label>
                <Input defaultValue={user?.name} className="bg-[var(---fieldcolor)]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[var(---foreground)]">Email</Label>
                <Input defaultValue={user?.email} type="email" className="bg-[var(---fieldcolor)]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[var(---foreground)]">Role</Label>
              <Input defaultValue={user?.role.toUpperCase()} disabled className="bg-[var(---fieldcolor)]" />
            </div>
            <Button className="bg-[var(--buttoncolor2 text-white hover:bg-[var(---primary-hover)]">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="border-[var(---border)] bg-[var(---surface)]">
          <CardHeader>
            <CardTitle className="text-[var(---foreground)]">Notification Preferences</CardTitle>
            <CardDescription className="text-[var(---muted)]">
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(---foreground)]">Low Stock Alerts</p>
                <p className="text-sm text-[var(---muted)]">Get notified when items are running low</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-[var(---border)]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(---foreground)]">Sales Notifications</p>
                <p className="text-sm text-[var(---muted)]">Receive updates on daily sales</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-[var(---border)]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(---foreground)]">Purchase Order Updates</p>
                <p className="text-sm text-[var(---muted)]">Get notified about purchase order status</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(---border)] bg-[var(---surface)]">
          <CardHeader>
            <CardTitle className="text-[var(---foreground)]">System Settings</CardTitle>
            <CardDescription className="text-[var(---muted)]">Configure system-wide preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[var(---foreground)]">Currency</Label>
              <Input defaultValue="PHP (₱)" disabled className="bg-[var(---fieldcolor)]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[var(---foreground)]">Time Zone</Label>
              <Input defaultValue="Asia/Manila" disabled className="bg-[var(---fieldcolor)]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
