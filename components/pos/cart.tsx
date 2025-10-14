"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import type { InventoryItem } from "@/lib/api-service"

export interface CartItem extends InventoryItem {
  quantity: number
}

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onCheckout: (paymentMethod: string, discount: number) => void
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<string>("cash")

  const discountAmount = (subtotal * discount) / 100
  const total = subtotal - discountAmount

  const handleCheckout = () => {
    if (items.length === 0) return
    onCheckout(paymentMethod, discount)
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <ShoppingCart className="h-5 w-5 text-[var(--color-primary)]" />
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Current Order</h2>
        <Badge variant="secondary" className="ml-auto">
          {items.length} items
        </Badge>
      </div>

      <Separator className="mb-4 bg-[var(--color-border)]" />

      {/* Cart Items */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <ShoppingCart className="mb-2 h-12 w-12 text-[var(--color-muted)]" />
            <p className="text-sm text-[var(--color-muted)]">Cart is empty</p>
            <p className="text-xs text-[var(--color-muted)]">Add items to start a sale</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--color-foreground)]">{item.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">₱{item.price.toLocaleString()} each</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-[var(--color-error)] hover:text-[var(--color-error)]"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium text-[var(--color-foreground)]">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm font-bold text-[var(--color-primary)]">
                  ₱{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Checkout Section */}
      {items.length > 0 && (
        <>
          <Separator className="my-4 bg-[var(--color-border)]" />

          <div className="space-y-3">
            {/* Discount */}
            <div className="space-y-2">
              <Label htmlFor="discount" className="text-xs text-[var(--color-muted)]">
                Discount (%)
              </Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                className="h-9 bg-[var(--color-background)]"
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="payment" className="text-xs text-[var(--color-muted)]">
                Payment Method
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="h-9 bg-[var(--color-background)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Totals */}
            <div className="space-y-2 rounded-lg bg-[var(--color-background)] p-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-muted)]">Subtotal</span>
                <span className="text-[var(--color-foreground)]">₱{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted)]">Discount ({discount}%)</span>
                  <span className="text-[var(--color-success)]">-₱{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <Separator className="bg-[var(--color-border)]" />
              <div className="flex justify-between">
                <span className="font-semibold text-[var(--color-foreground)]">Total</span>
                <span className="text-xl font-bold text-[var(--color-primary)]">₱{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
              onClick={handleCheckout}
            >
              Complete Sale
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

function useState<T>(initialValue: T): [T, (value: T) => void] {
  const [state, setState] = React.useState<T>(initialValue)
  return [state, setState]
}

import React from "react"
import { Badge } from "@/components/ui/badge"
