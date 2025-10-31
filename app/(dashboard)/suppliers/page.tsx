"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Mail, Phone, MapPin, Package } from "lucide-react"
import { apiService, type Supplier } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    apiService.getSuppliers().then(setSuppliers)
  }, [])

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddSupplier = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newSupplier: Supplier = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      productsSupplied: (formData.get("products") as string).split(",").map((p) => p.trim()),
    }
    setSuppliers([...suppliers, newSupplier])
    setIsAddDialogOpen(false)
    toast({
      title: "Supplier added",
      description: `${newSupplier.name} has been added successfully`,
    })
  }

  return (
    <div>
      <Header title="Supplier Management" subtitle="Manage your suppliers and their information" />

      <div className="space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--muted)]">Total Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--foreground)]">{suppliers.length}</p>
            </CardContent>
          </Card>

          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--muted)]">Active Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--success)]">{suppliers.length}</p>
            </CardContent>
          </Card>

          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[var(--muted)]">Categories Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--foreground)]">
                {new Set(suppliers.flatMap((s) => s.productsSupplied)).size}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Add */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <Input
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[var(--fieldcolor)] pl-10"
            />
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[var(--buttoncolor2)] text-white hover:bg-[var(--primary-hover)]">
                <Plus className="mr-2 h-4 w-4" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto border-[var(--border)] bg-[var(--secondary)] sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-[var(--foreground)]">Add New Supplier</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSupplier} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[var(--foreground)]">
                    Company Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="bg-[var(--fieldcolor)]"
                    placeholder="Tech Supplies Inc"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-[var(--foreground)]">
                    Contact Person
                  </Label>
                  <Input
                    id="contact"
                    name="contact"
                    required
                    className="bg-[var(--fieldcolor)]"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[var(--foreground)]">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-[var(--fieldcolor)]"
                      placeholder="john@techsupplies.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[var(--foreground)]">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      className="bg-[var(--fieldcolor)]"
                      placeholder="+63 912 345 6789"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[var(--foreground)]">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    required
                    className="bg-[var(--fieldcolor)]"
                    placeholder="Manila, Philippines"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="products" className="text-[var(--foreground)]">
                    Products Supplied (comma-separated)
                  </Label>
                  <Input
                    id="products"
                    name="products"
                    required
                    className="bg-[var(--fieldcolor)]"
                    placeholder="Electronics, Accessories"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[var(--buttoncolor2)] text-white hover:bg-[var(--primary-hover)]"
                  >
                    Add Supplier
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Suppliers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSuppliers.map((supplier) => (
            <Card
              key={supplier.id}
              className="cursor-pointer border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--primary)] hover:shadow-lg"
              onClick={() => setSelectedSupplier(supplier)}
            >
              <CardHeader>
                <CardTitle className="text-lg text-[var(--foreground)]">{supplier.name}</CardTitle>
                <p className="text-sm text-[var(--muted)]">{supplier.contact}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Phone className="h-4 w-4" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{supplier.address}</span>
                </div>
                <div className="flex items-start gap-2 pt-2">
                  <Package className="mt-0.5 h-4 w-4 text-[var(--muted)]" />
                  <div className="flex flex-wrap gap-1">
                    {supplier.productsSupplied.map((product, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-[var(--primary)]/20 text-xs text-[var(--primary)]"
                      >
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supplier Details Dialog */}
        <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
          <DialogContent className="border-[var(--border)] bg-[var(--surface)] sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-[var(--foreground)]">{selectedSupplier?.name}</DialogTitle>
            </DialogHeader>
            {selectedSupplier && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs text-[var(--muted)]">Contact Person</Label>
                    <p className="text-sm text-[var(--foreground)]">{selectedSupplier.contact}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-[var(--muted)]">Email</Label>
                    <p className="text-sm text-[var(--foreground)]">{selectedSupplier.email}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-[var(--muted)]">Phone</Label>
                    <p className="text-sm text-[var(--foreground)]">{selectedSupplier.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-[var(--muted)]">Address</Label>
                    <p className="text-sm text-[var(--foreground)]">{selectedSupplier.address}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-[var(--muted)]">Products Supplied</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.productsSupplied.map((product, index) => (
                      <Badge
                        key={index}
                        className="bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20"
                      >
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
                    Close
                  </Button>
                  <Button className="bg-[var(--buttoncolor2)] text-white hover:bg-[var(--primary-hover)]">
                    Edit Supplier
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
