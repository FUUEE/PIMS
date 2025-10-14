"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/pos/product-grid"
import { Cart, type CartItem } from "@/components/pos/cart"
import { apiService, type InventoryItem } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function POSPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    apiService.getInventory().then(setItems)
  }, [])

  const handleAddToCart = (item: InventoryItem) => {
    const existingItem = cartItems.find((ci) => ci.id === item.id)

    if (existingItem) {
      if (existingItem.quantity >= item.stock) {
        toast({
          title: "Stock limit reached",
          description: `Only ${item.stock} units available`,
          variant: "destructive",
        })
        return
      }
      setCartItems(cartItems.map((ci) => (ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci)))
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleCheckout = (paymentMethod: string, discount: number) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const total = subtotal - (subtotal * discount) / 100

    // Update inventory stock
    const updatedItems = items.map((item) => {
      const cartItem = cartItems.find((ci) => ci.id === item.id)
      if (cartItem) {
        return { ...item, stock: item.stock - cartItem.quantity }
      }
      return item
    })
    setItems(updatedItems)

    // Clear cart
    setCartItems([])

    toast({
      title: "Sale completed",
      description: `Total: ₱${total.toLocaleString()} via ${paymentMethod}`,
    })
  }

  return (
    <div className="flex h-screen flex-col">
      <Header title="Point of Sale" subtitle={`Cashier: ${user?.name}`} />

      <div className="flex flex-1 gap-6 overflow-hidden p-6">
        {/* Products Section */}
        <div className="flex-1 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <ProductGrid items={items} onAddToCart={handleAddToCart} />
        </div>

        {/* Cart Section */}
        <div className="w-96">
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  )
}
