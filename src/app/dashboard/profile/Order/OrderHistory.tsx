import { Package, Calendar, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2026-001234",
    date: "2026-02-10",
    status: "delivered",
    total: 129.99,
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Visa ending in 4242",
    items: [
      { id: "i1", name: "Wireless Bluetooth Headphones", quantity: 1, price: 79.99 },
      { id: "i2", name: "Phone Case - Navy Blue", quantity: 2, price: 25.00 }
    ]
  },
  {
    id: "2",
    orderNumber: "ORD-2026-001189",
    date: "2026-02-05",
    status: "shipped",
    total: 299.99,
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Mastercard ending in 5555",
    items: [
      { id: "i3", name: "Smart Watch Series 5", quantity: 1, price: 299.99 }
    ]
  },
  {
    id: "3",
    orderNumber: "ORD-2026-001045",
    date: "2026-01-28",
    status: "delivered",
    total: 459.97,
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Visa ending in 4242",
    items: [
      { id: "i4", name: "Laptop Stand - Aluminum", quantity: 1, price: 89.99 },
      { id: "i5", name: "Wireless Mouse", quantity: 1, price: 49.99 },
      { id: "i6", name: "Mechanical Keyboard", quantity: 1, price: 159.99 },
      { id: "i7", name: "USB-C Hub", quantity: 2, price: 79.99 }
    ]
  },
  {
    id: "4",
    orderNumber: "ORD-2026-000923",
    date: "2026-01-15",
    status: "delivered",
    total: 199.99,
    shippingAddress: "456 Oak Ave, Brooklyn, NY 11201",
    paymentMethod: "PayPal",
    items: [
      { id: "i8", name: "Running Shoes - Size 10", quantity: 1, price: 199.99 }
    ]
  },
  {
    id: "5",
    orderNumber: "ORD-2025-008756",
    date: "2025-12-20",
    status: "cancelled",
    total: 89.99,
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Visa ending in 4242",
    items: [
      { id: "i9", name: "Tablet Case", quantity: 1, price: 89.99 }
    ]
  }
];

function getStatusColor(status: Order["status"]) {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "shipped":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "processing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(order.date)}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-2">
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
          <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-sm"
          >
            {expanded ? (
              <>
                Hide Details <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                View Details <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex items-start gap-2">
                <Package className="w-4 h-4 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Shipping Address</p>
                  <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CreditCard className="w-4 h-4 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Payment Method</p>
                  <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export function OrderHistory() {
  const [filterStatus, setFilterStatus] = useState<Order["status"] | "all">("all");

  const filteredOrders = filterStatus === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order History</h1>
          <p className="text-gray-600">View and track all your past orders</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            size="sm"
          >
            All Orders
          </Button>
          <Button 
            variant={filterStatus === "delivered" ? "default" : "outline"}
            onClick={() => setFilterStatus("delivered")}
            size="sm"
          >
            Delivered
          </Button>
          <Button 
            variant={filterStatus === "shipped" ? "default" : "outline"}
            onClick={() => setFilterStatus("shipped")}
            size="sm"
          >
            Shipped
          </Button>
          <Button 
            variant={filterStatus === "processing" ? "default" : "outline"}
            onClick={() => setFilterStatus("processing")}
            size="sm"
          >
            Processing
          </Button>
          <Button 
            variant={filterStatus === "cancelled" ? "default" : "outline"}
            onClick={() => setFilterStatus("cancelled")}
            size="sm"
          >
            Cancelled
          </Button>
        </div>

        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <Card className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No orders found with this status</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
