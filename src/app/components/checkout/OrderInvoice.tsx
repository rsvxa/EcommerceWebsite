"use client";

import React from 'react';
import { motion } from 'framer-motion';
// លុបការ import Sheet, SheetContent... ចេញពីទីនេះ
import { Separator } from '@/app/components/ui/separator';
import { CheckCircle2, Printer, Download, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/lib/utils/format';

export function OrderInvoice({ total, onClose, cartItems = [] }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-full"
    >
      <div className="text-center space-y-4 py-6">
        <div className="flex justify-center">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="font-black uppercase tracking-tighter text-3xl">Order Success</h2>
      </div>

      <div className="flex-1 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 p-8 space-y-6">
         <div className="space-y-4">
            {cartItems.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-bold">{item.quantity}x {item.name}</span>
                <span className="font-black">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
         </div>
         <Separator />
         <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase text-zinc-400">Total Paid</span>
            <span className="text-2xl font-black">{formatPrice(total)}</span>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <button className="flex items-center justify-center gap-2 h-14 border border-zinc-200 rounded-xl text-[10px] font-bold uppercase hover:bg-zinc-50 transition-all">
          <Printer size={14} /> Print
        </button>
        <button className="flex items-center justify-center gap-2 h-14 bg-black text-white rounded-xl text-[10px] font-bold uppercase hover:bg-zinc-800 transition-all">
          <Download size={14} /> PDF
        </button>
      </div>

      <button onClick={onClose} className="mt-6 text-[10px] font-bold uppercase text-zinc-400 hover:text-black text-center">
        Return to Store
      </button>
    </motion.div>
  );
}