// API Service Layer - Mock data for now, will connect to Django REST API later

export interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  lowStockThreshold: number
  supplier: string
  lastRestocked: string
}

export interface Sale {
  id: string
  date: string
  items: { itemId: string; quantity: number; price: number }[]
  total: number
  cashier: string
  paymentMethod: "cash" | "card" | "online"
}

export interface Purchase {
  id: string
  date: string
  supplier: string
  items: { itemId: string; quantity: number; cost: number }[]
  total: number
  status: "pending" | "completed" | "cancelled"
}

export interface Supplier {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  address: string
  productsSupplied: string[]
}

// Mock Data
export const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Laptop Dell XPS 13",
    sku: "LAP-001",
    category: "Electronics",
    price: 45000,
    stock: 15,
    lowStockThreshold: 5,
    supplier: "Tech Supplies Inc",
    lastRestocked: "2025-09-15",
  },
  {
    id: "2",
    name: "Office Chair Ergonomic",
    sku: "FUR-001",
    category: "Furniture",
    price: 8500,
    stock: 8,
    lowStockThreshold: 3,
    supplier: "Furniture World",
    lastRestocked: "2025-09-20",
  },
  {
    id: "3",
    name: "Wireless Mouse Logitech",
    sku: "ACC-001",
    category: "Accessories",
    price: 1200,
    stock: 45,
    lowStockThreshold: 10,
    supplier: "Tech Supplies Inc",
    lastRestocked: "2025-09-25",
  },
  {
    id: "4",
    name: "USB-C Cable 2m",
    sku: "ACC-002",
    category: "Accessories",
    price: 350,
    stock: 120,
    lowStockThreshold: 20,
    supplier: "Cable Co",
    lastRestocked: "2025-09-28",
  },
  {
    id: "5",
    name: 'Monitor 27" 4K',
    sku: "ELC-002",
    category: "Electronics",
    price: 18000,
    stock: 4,
    lowStockThreshold: 5,
    supplier: "Tech Supplies Inc",
    lastRestocked: "2025-09-10",
  },
  {
    id: "6",
    name: "Desk Lamp LED",
    sku: "FUR-002",
    category: "Furniture",
    price: 2500,
    stock: 22,
    lowStockThreshold: 8,
    supplier: "Lighting Plus",
    lastRestocked: "2025-09-22",
  },
]

export const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Tech Supplies Inc",
    contact: "John Doe",
    email: "john@techsupplies.com",
    phone: "+63 912 345 6789",
    address: "Manila, Philippines",
    productsSupplied: ["Electronics", "Accessories"],
  },
  {
    id: "2",
    name: "Furniture World",
    contact: "Jane Smith",
    email: "jane@furnitureworld.com",
    phone: "+63 923 456 7890",
    address: "Quezon City, Philippines",
    productsSupplied: ["Furniture"],
  },
  {
    id: "3",
    name: "Cable Co",
    contact: "Bob Johnson",
    email: "bob@cableco.com",
    phone: "+63 934 567 8901",
    address: "Makati, Philippines",
    productsSupplied: ["Accessories"],
  },
  {
    id: "4",
    name: "Lighting Plus",
    contact: "Alice Brown",
    email: "alice@lightingplus.com",
    phone: "+63 945 678 9012",
    address: "Pasig, Philippines",
    productsSupplied: ["Furniture", "Electronics"],
  },
]

export const mockSales: Sale[] = [
  {
    id: "1",
    date: "2025-10-01T10:30:00",
    items: [{ itemId: "3", quantity: 2, price: 1200 }],
    total: 2400,
    cashier: "Cashier User",
    paymentMethod: "cash",
  },
  {
    id: "2",
    date: "2025-10-01T11:15:00",
    items: [
      { itemId: "1", quantity: 1, price: 45000 },
      { itemId: "3", quantity: 1, price: 1200 },
    ],
    total: 46200,
    cashier: "Cashier User",
    paymentMethod: "card",
  },
  {
    id: "3",
    date: "2025-10-01T14:20:00",
    items: [{ itemId: "6", quantity: 3, price: 2500 }],
    total: 7500,
    cashier: "Cashier User",
    paymentMethod: "online",
  },
]

export const mockPurchases: Purchase[] = [
  {
    id: "1",
    date: "2025-09-28",
    supplier: "Tech Supplies Inc",
    items: [{ itemId: "1", quantity: 10, cost: 40000 }],
    total: 400000,
    status: "completed",
  },
  {
    id: "2",
    date: "2025-09-29",
    supplier: "Furniture World",
    items: [{ itemId: "2", quantity: 5, cost: 7500 }],
    total: 37500,
    status: "completed",
  },
  {
    id: "3",
    date: "2025-09-30",
    supplier: "Cable Co",
    items: [{ itemId: "4", quantity: 100, cost: 300 }],
    total: 30000,
    status: "pending",
  },
]

// API functions that will later connect to Django
export const apiService = {
  // Inventory
  getInventory: async (): Promise<InventoryItem[]> => {
    // TODO: Replace with fetch('/api/inventory')
    return Promise.resolve(mockInventory)
  },

  // Suppliers
  getSuppliers: async (): Promise<Supplier[]> => {
    // TODO: Replace with fetch('/api/suppliers')
    return Promise.resolve(mockSuppliers)
  },

  // Sales
  getSales: async (): Promise<Sale[]> => {
    // TODO: Replace with fetch('/api/sales')
    return Promise.resolve(mockSales)
  },

  // Purchases
  getPurchases: async (): Promise<Purchase[]> => {
    // TODO: Replace with fetch('/api/purchases')
    return Promise.resolve(mockPurchases)
  },
}
