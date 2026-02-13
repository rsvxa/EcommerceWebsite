"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/store/use-language";
import { Package, ArrowUpRight, Clock, CheckCircle2, Truck } from "lucide-react";

export default function OrdersPage() {
  const { lang } = useLanguage();

  const orders = [
    { id: "#ORD-9921", date: "Oct 24, 2025", status: "Delivered", total: "$240.00", items: 3 },
    { id: "#ORD-8812", date: "Sep 12, 2025", status: "Processing", total: "$120.00", items: 1 },
    { id: "#ORD-7701", date: "Aug 05, 2025", status: "Shipped", total: "$550.00", items: 2 },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Processing': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-zinc-50 text-zinc-600 border-zinc-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 size={12} />;
      case 'Processing': return <Clock size={12} />;
      case 'Shipped': return <Truck size={12} />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-10"
    >
      {/* Header Section */}
      <div className="flex items-end justify-between border-b border-zinc-100 pb-6">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Account Center
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
            {lang === 'kh' ? 'ប្រវត្តិបញ្ជាទិញ' : 'Order History'}
          </h2>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total Orders</p>
          <p className="text-xl font-black text-zinc-900">{orders.length}</p>
        </div>
      </div>

      {/* Luxury Table */}
      <div className="relative overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {lang === 'kh' ? 'លេខកូដ' : 'Reference'}
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {lang === 'kh' ? 'កាលបរិច្ឆេទ' : 'Placement Date'}
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {lang === 'kh' ? 'ស្ថានភាព' : 'Status'}
                </th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {lang === 'kh' ? 'សរុប' : 'Amount'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {orders.map((order) => (
                <tr 
                  key={order.id} 
                  className="group cursor-pointer transition-all hover:bg-zinc-50/80"
                >
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-zinc-900 group-hover:text-blue-600 transition-colors">
                      {order.id}
                    </span>
                    <p className="text-[10px] text-zinc-400 font-medium">{order.items} {lang === 'kh' ? 'មុខទំនិញ' : 'items'}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-zinc-500 italic">
                      {order.date}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 transition-all group-hover:gap-5">
                      <span className="text-sm font-black text-zinc-900">
                        {order.total}
                      </span>
                      <div className="p-2 rounded-xl bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support Teaser */}
      <div className="rounded-[2rem] bg-zinc-900 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
            <Package className="text-white" size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="font-black uppercase tracking-tight">Need assistance?</h4>
            <p className="text-sm text-zinc-400">Our concierge team is available 24/7 for order inquiries.</p>
          </div>
        </div>
        <button className="px-8 py-4 bg-white text-zinc-900 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
          Contact Concierge
        </button>
      </div>
    </motion.div>
  );
}