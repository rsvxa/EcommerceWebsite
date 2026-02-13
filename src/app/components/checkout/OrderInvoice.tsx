"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, ArrowLeft, Truck, ShoppingBag, Hash } from 'lucide-react';
import { formatPrice } from '@/lib/utils/format';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

export function OrderInvoice({ isOpen, onOpenChange, orderData }: any) {
  const [mounted, setMounted] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].invoice;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const items = orderData?.items || [];
  const total = orderData?.total || 0;
  const customer = orderData?.customer || {};
  const orderId = orderData?.orderId || `ZW-${Math.floor(100000 + Math.random() * 900000)}`;
  const date = new Date().toLocaleDateString(lang === 'kh' ? 'km-KH' : 'en-GB');

  const handlePrint = () => window.print();

  const handleTrackOrder = () => {
    toast.success(t.trackingMsg, {
      description: `${t.via}: ${customer.shippingCarrier || 'J&T Express'}`,
    });
  };

  const invoiceContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm" style={{ zIndex: 999999 }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col z-[1000000] print:shadow-none print:m-0"
          >
            {/* Header: Blue Navy */}
            <div className="bg-[#1e3a8a] p-8 md:p-10 text-white flex justify-between items-start">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="text-[#1e3a8a]" size={24} />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tighter">{t.officialTitle}</h1>
                <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] flex items-center gap-1">
                  <Hash size={10} /> {orderId} • {date}
                </p>
              </div>
              <div className="text-right">
                <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1 rounded-full text-[10px] font-black uppercase">
                  {t.paidStatus}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-8">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-6 pb-6 border-b border-zinc-100 italic">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t.billTo}</p>
                  <p className="font-black text-zinc-800 text-lg leading-tight">{customer.fullName || "N/A"}</p>
                  <p className="text-sm text-zinc-500">{customer.phone}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t.shipTo}</p>
                  <p className="text-xs text-zinc-600 leading-tight">
                    {customer.address}, {customer.province}
                  </p>
                  <p className="text-[10px] font-bold text-blue-600 uppercase mt-1">{t.via} {customer.shippingCarrier || "Carrier"}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-4">
                <div className="grid grid-cols-12 pb-4 border-b-2 border-zinc-900 px-2 text-[10px] font-black uppercase tracking-widest">
                  <div className="col-span-6">{t.description}</div>
                  <div className="col-span-3 text-center">{t.qtyPrice}</div>
                  <div className="col-span-3 text-right">{t.total}</div>
                </div>

                <div className="max-h-[250px] overflow-y-auto custom-scrollbar px-2">
                  {items.map((item: any, idx: number) => {
                    const unitPrice = item.product?.price || item.price || 0;
                    const quantity = item.quantity || 0;
                    const subtotal = unitPrice * quantity;

                    return (
                      <div key={idx} className="grid grid-cols-12 py-4 border-b border-zinc-50 items-center">
                        <div className="col-span-6">
                          <p className="font-bold text-zinc-800 text-sm leading-tight">{item.product?.name || item.name}</p>
                        </div>
                        <div className="col-span-3 text-center text-[11px] text-zinc-500 font-medium">
                          {quantity} x {formatPrice(unitPrice)}
                        </div>
                        <div className="col-span-3 text-right font-black text-zinc-900 text-sm">
                          {formatPrice(subtotal)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Totals */}
              <div className="flex flex-col items-end pt-4 space-y-3">
                <div className="flex justify-between w-full md:w-64 text-zinc-400 font-bold text-[10px] uppercase px-2">
                  <span>{t.subtotal}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between w-full md:w-64 text-zinc-400 font-bold text-[10px] uppercase px-2 border-b border-zinc-100 pb-2">
                  <span>{t.shipping}</span>
                  <span className="text-green-600 uppercase">{t.free}</span>
                </div>
                <div className="flex justify-between w-full md:w-80 bg-zinc-900 text-white p-6 rounded-2xl shadow-xl shadow-zinc-200">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.grandTotal}</span>
                  <span className="text-2xl font-black">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row gap-4 no-print pt-4">
                <button 
                  onClick={handleTrackOrder}
                  className="flex-1 flex items-center justify-center gap-2 h-14 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
                >
                  <Truck size={18} /> {t.trackOrder}
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-2 px-6 h-14 border-2 border-zinc-100 rounded-2xl text-[10px] font-black uppercase hover:bg-zinc-50 transition-all text-zinc-600"
                  >
                    <Printer size={18} />
                  </button>
                  <button 
                    onClick={() => onOpenChange(false)}
                    className="flex items-center justify-center gap-2 px-6 h-14 bg-zinc-100 rounded-2xl text-[10px] font-black uppercase hover:bg-zinc-200 transition-all text-zinc-500"
                  >
                    <ArrowLeft size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 py-3 text-center text-[8px] text-zinc-300 font-bold uppercase tracking-[0.3em]">
              {t.footerMsg}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(invoiceContent, document.body);
}