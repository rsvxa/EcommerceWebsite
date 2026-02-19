"use client";

import { Package, Calendar, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useLanguage } from "@/lib/store/use-language";

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
  status: "neworder" | "delivered" | "shipped" | "cancelled";
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
      { id: "i6", name: "Mechanical Keyboard", quantity: 1, price: 159.99 }
    ]
  }
];

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const { lang } = useLanguage();

  const t = (kh: string, en: string) => (lang === "kh" ? kh : en);

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "neworder": return t("ការកុម្ម៉ង់ថ្មី", "New Order");
      case "delivered": return t("បានដឹកជញ្ជូន", "Delivered");
      case "shipped": return t("កំពុងផ្ញើ", "Shipped");
      case "cancelled": return t("បានបោះបង់", "Cancelled");
      default: return status;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "neworder": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "shipped": return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="p-6 hover:shadow-2xl transition-all duration-500 border-none shadow-xl shadow-zinc-100 rounded-[35px]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-zinc-900" />
            <h3 className="font-black text-lg tracking-tighter uppercase">{order.orderNumber}</h3>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-black uppercase text-zinc-400 tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>{order.date}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-2">
          <Badge className={`rounded-full px-4 py-1 font-black uppercase text-[10px] tracking-widest border-none ${getStatusColor(order.status)}`}>
            {getStatusLabel(order.status)}
          </Badge>
          <span className="text-2xl font-black tracking-tighter text-zinc-900">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-zinc-50 pt-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
            {order.items.length} {t("មុខទំនិញ", "Items")}
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] font-black uppercase tracking-widest hover:bg-zinc-50 rounded-xl"
          >
            {expanded ? (
              <>{t("លាក់ព័ត៌មាន", "Hide Details")} <ChevronUp className="ml-1 w-4 h-4" /></>
            ) : (
              <>{t("មើលលម្អិត", "View Details")} <ChevronDown className="ml-1 w-4 h-4" /></>
            )}
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-zinc-50 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-black text-[13px] uppercase tracking-tight">{item.name}</p>
                    <p className="text-[11px] font-bold text-zinc-400 uppercase">{t("ចំនួន", "Qty")}: {item.quantity}</p>
                  </div>
                  <p className="font-black text-zinc-900">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="bg-zinc-50 p-6 rounded-[25px] space-y-4 border border-zinc-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm"><Package className="w-4 h-4 text-zinc-900" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("អាសយដ្ឋានដឹកជញ្ជូន", "Shipping Address")}</p>
                  <p className="text-[12px] font-bold text-zinc-900 uppercase tracking-tight">{order.shippingAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm"><CreditCard className="w-4 h-4 text-zinc-900" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("វិធីសាស្ត្របង់ប្រាក់", "Payment Method")}</p>
                  <p className="text-[12px] font-bold text-zinc-900 uppercase tracking-tight">{order.paymentMethod}</p>
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
  const { lang } = useLanguage();

  const t = (kh: string, en: string) => (lang === "kh" ? kh : en);

  const filteredOrders = filterStatus === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === filterStatus);

  const filterButtons = [
    { id: "all", kh: "ទាំងអស់", en: "All" },
    { id: "neworder", kh: "ថ្មីៗ", en: "New" },
    { id: "delivered", kh: "បានដឹក", en: "Delivered" },
    { id: "shipped", kh: "កំពុងផ្ញើ", en: "Shipped" },
    { id: "cancelled", kh: "បានបោះបង់", en: "Cancelled" },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 italic">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-3 italic text-zinc-900">
            {t("ប្រវត្តិនៃការទិញ", "Order History")}
          </h1>
          <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">
            {t("ពិនិត្យ និងតាមដានរាល់ការកុម្ម៉ង់របស់អ្នក", "View and track all your past orders")}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-10 flex flex-wrap gap-3">
          {filterButtons.map((btn) => (
            <Button 
              key={btn.id}
              variant={filterStatus === btn.id ? "default" : "outline"}
              onClick={() => setFilterStatus(btn.id as any)}
              className={`rounded-2xl px-6 py-5 font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                filterStatus === btn.id ? "bg-zinc-900 text-white shadow-xl" : "border-zinc-100 text-zinc-400 hover:border-zinc-900 hover:text-zinc-900"
              }`}
            >
              {t(btn.kh, btn.en)}
            </Button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <Card className="p-20 text-center border-none shadow-2xl shadow-zinc-100 rounded-[40px]">
              <Package className="w-16 h-16 text-zinc-100 mx-auto mb-6" />
              <p className="text-[13px] font-black uppercase tracking-widest text-zinc-400">
                {t("មិនមានការកុម្ម៉ង់ក្នុងស្ថានភាពនេះទេ", "No orders found with this status")}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}