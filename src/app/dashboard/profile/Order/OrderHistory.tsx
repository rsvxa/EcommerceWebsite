"use client";

import { Package, Calendar, CreditCard, ChevronDown, ChevronUp, Printer, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useLanguage } from "@/lib/store/use-language";
import { useOrderStore, Order } from "@/lib/store/use-order-store";
import { OrderInvoice } from "../../../../app/components/checkout/OrderInvoice";
import { formatPrice } from "@/lib/utils/format";

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const { lang } = useLanguage();

  const t = (kh: string, en: string) => (lang === "kh" ? kh : en);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "neworder": return "bg-blue-50 text-blue-600";
      case "delivered": return "bg-green-50 text-green-600";
      case "shipped": return "bg-orange-50 text-orange-600";
      case "cancelled": return "bg-red-50 text-red-600";
      default: return "bg-zinc-50 text-zinc-600";
    }
  };

  return (
    <>
      <Card className="p-6 hover:shadow-2xl transition-all duration-500 border border-zinc-50 shadow-xl shadow-zinc-100/50 rounded-[35px] bg-white italic overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-zinc-900 rounded-xl text-white">
                <Package size={18} />
              </div>
              <h3 className="font-black text-lg tracking-tighter uppercase">{order.orderNumber}</h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-11">
              <Calendar size={12} />
              <span>{order.date}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-2">
            <Badge className={`rounded-full px-4 py-1 font-black uppercase text-[9px] tracking-widest border-none ${getStatusColor(order.status)}`}>
              {order.status}
            </Badge>
            <span className="text-2xl font-black tracking-tighter text-zinc-900">
                {formatPrice(order.total)}
            </span>
          </div>
        </div>

        <div className="border-t border-zinc-50 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowInvoice(true)}
                    className="h-10 rounded-xl border-zinc-100 text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-zinc-900 hover:text-white transition-all"
                >
                    <Printer size={14} /> {t("វិក្កយបត្រ", "Invoice")}
                </Button>
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setExpanded(!expanded)}
                    className="h-10 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 rounded-xl"
                >
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {order.items.length} {t("មុខទំនិញ", "Items")}
            </span>
          </div>

          {expanded && (
            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="bg-zinc-50/50 rounded-[30px] p-3 border border-zinc-100/50">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 border-b border-white last:border-b-0">
                    <div className="flex items-center gap-4">
                        {/* រូបភាពផលិតផល */}
                        <div className="relative w-16 h-16 bg-white rounded-2xl border border-zinc-100 overflow-hidden flex-shrink-0">
                            {item.product?.image || item.image ? (
                                <img 
                                    src={item.product?.image || item.image} 
                                    alt={item.product?.name || item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                                    <ShoppingBag size={20} className="text-zinc-200" />
                                </div>
                            )}
                            <div className="absolute top-0 right-0 bg-black text-white text-[9px] font-black px-1.5 py-0.5 rounded-bl-lg">
                                x{item.quantity}
                            </div>
                        </div>

                        <div>
                            <p className="font-black text-[13px] uppercase tracking-tight text-zinc-800 leading-none mb-1">
                                {item.product?.name || item.name}
                            </p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                                {formatPrice(item.price || item.product?.price)} / unit
                            </p>
                        </div>
                    </div>
                    <p className="font-black text-zinc-900 text-sm tracking-tighter">
                        {formatPrice((item.price || item.product?.price) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-zinc-50 rounded-[25px] border border-zinc-100 flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-zinc-400">
                        <CreditCard size={14} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">{t("ការបង់ប្រាក់", "Payment")}</p>
                        <p className="text-[11px] font-bold text-zinc-900 uppercase leading-tight">
                            {order.customer?.paymentMethod || "ABA Pay"}
                        </p>
                    </div>
                </div>
                <div className="p-5 bg-zinc-50 rounded-[25px] border border-zinc-100 flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-zinc-400">
                        <Package size={14} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">{t("អាសយដ្ឋាន", "Shipping")}</p>
                        <p className="text-[11px] font-bold text-zinc-900 uppercase leading-tight">
                            {order.customer?.address}, {order.customer?.province}
                        </p>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <OrderInvoice 
        isOpen={showInvoice} 
        onOpenChange={setShowInvoice} 
        orderData={order} 
      />
    </>
  );
}

export function OrderHistory() {
  const { orders } = useOrderStore();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { lang } = useLanguage();

  const t = (kh: string, en: string) => (lang === "kh" ? kh : en);

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const filterButtons = [
    { id: "all", kh: "ទាំងអស់", en: "All" },
    { id: "neworder", kh: "ថ្មីៗ", en: "New" },
    { id: "shipped", kh: "កំពុងផ្ញើ", en: "Shipped" },
    { id: "delivered", kh: "បានដឹក", en: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC] py-16 px-4 italic">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Personal Archive</span>
          <h1 className="text-6xl font-black uppercase tracking-tighter italic text-zinc-900">
            {t("ប្រវត្តិនៃការទិញ", "Orders")}
          </h1>
          <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">
            {orders.length} {t("ប្រតិបត្តិការសរុប", "Total Transactions Found")}
          </p>
        </div>

        {/* Filter Tab */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {filterButtons.map((btn) => (
            <button 
              key={btn.id}
              onClick={() => setFilterStatus(btn.id)}
              className={`whitespace-nowrap rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                filterStatus === btn.id 
                ? "bg-zinc-900 text-white shadow-lg scale-105" 
                : "bg-white text-zinc-400 border border-zinc-100 hover:border-zinc-900 hover:text-zinc-900"
              }`}
            >
              {t(btn.kh, btn.en)}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="py-24 text-center bg-white rounded-[40px] border border-dashed border-zinc-200">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-zinc-200" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-zinc-300">
                {t("មិនទាន់មានទិន្នន័យ", "No records found")}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}