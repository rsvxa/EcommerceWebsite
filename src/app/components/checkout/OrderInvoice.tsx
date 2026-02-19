"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, ArrowLeft, Truck, ShoppingBag, Hash, 
  CheckCircle2, Box, MapPin, Clock, X 
} from 'lucide-react';
import { formatPrice } from '@/lib/utils/format';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

export function OrderInvoice({ isOpen, onOpenChange, orderData }: any) {
  const [mounted, setMounted] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
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

  // ទិន្នន័យគំរូសម្រាប់ Tracking
  const trackingSteps = [
    { status: lang === 'kh' ? 'បានបញ្ជាទិញ' : 'Order Placed', time: '09:30 AM', done: true },
    { status: lang === 'kh' ? 'កំពុងរៀបចំទំនិញ' : 'Preparing', time: '10:45 AM', done: true },
    { status: lang === 'kh' ? 'កំពុងដឹកជញ្ជូន' : 'In Transit', time: '02:15 PM', done: true },
    { status: lang === 'kh' ? 'ជិតដល់កន្លែងអ្នកហើយ' : 'Out for Delivery', time: 'Pending', done: false },
  ];

  const invoiceContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm shadow-2xl" style={{ zIndex: 999999 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white shadow-2xl rounded-[40px] overflow-hidden flex flex-col z-[1000000] print:shadow-none print:m-0"
          >
            {/* Header */}
            <div className="bg-[#1e3a8a] p-8 md:p-10 text-white flex justify-between items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                    <ShoppingBag size={120} />
                </div>
              <div className="relative z-10 space-y-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="text-[#1e3a8a]" size={24} />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tighter italic">{t.officialTitle}</h1>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1">
                  <Hash size={10} /> {orderId} • {date}
                </p>
              </div>
              <div className="text-right relative z-10">
                <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                  {t.paidStatus}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-8 relative">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-6 pb-6 border-b border-zinc-100 italic">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t.billTo}</p>
                  <p className="font-black text-zinc-800 text-lg leading-tight uppercase">{customer.fullName || "N/A"}</p>
                  <p className="text-sm font-bold text-zinc-500">{customer.phone}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t.shipTo}</p>
                  <p className="text-xs font-bold text-zinc-600 leading-tight">
                    {customer.address}, {customer.province}
                  </p>
                  <p className="text-[10px] font-black text-blue-600 uppercase mt-1 tracking-tighter">
                    {t.via} {customer.shippingCarrier || "J&T Express"}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-4">
                <div className="grid grid-cols-12 pb-4 border-b-2 border-zinc-900 px-2 text-[10px] font-black uppercase tracking-widest italic">
                  <div className="col-span-6">{t.description}</div>
                  <div className="col-span-3 text-center">{t.qtyPrice}</div>
                  <div className="col-span-3 text-right">{t.total}</div>
                </div>

                <div className="max-h-[200px] overflow-y-auto custom-scrollbar px-2 italic">
                  {items.map((item: any, idx: number) => {
                    const unitPrice = item.product?.price || item.price || 0;
                    const quantity = item.quantity || 0;
                    const subtotal = unitPrice * quantity;

                    return (
                      <div key={idx} className="grid grid-cols-12 py-4 border-b border-zinc-50 items-center">
                        <div className="col-span-6">
                          <p className="font-black text-zinc-800 text-sm leading-tight uppercase">{item.product?.name || item.name}</p>
                        </div>
                        <div className="col-span-3 text-center text-[11px] text-zinc-400 font-black">
                          {quantity} × {formatPrice(unitPrice)}
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
              <div className="flex flex-col items-end pt-4 space-y-3 italic">
                <div className="flex justify-between w-full md:w-64 text-zinc-400 font-black text-[10px] uppercase px-2">
                  <span>{t.subtotal}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between w-full md:w-80 bg-zinc-900 text-white p-6 rounded-[24px] shadow-2xl shadow-zinc-200 transition-transform hover:scale-105">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.grandTotal}</span>
                  <span className="text-2xl font-black">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row gap-4 no-print pt-4 relative z-20">
                <button 
                  onClick={() => setShowTracking(true)}
                  className="flex-1 flex items-center justify-center gap-3 h-16 bg-blue-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-100 italic"
                >
                  <Truck size={20} /> {t.trackOrder}
                </button>
                <div className="flex gap-2">
                  <button onClick={handlePrint} className="flex items-center justify-center gap-2 px-6 h-16 border-2 border-zinc-100 rounded-[20px] text-[10px] font-black uppercase hover:bg-zinc-50 transition-all text-zinc-400">
                    <Printer size={20} />
                  </button>
                  <button onClick={() => onOpenChange(false)} className="flex items-center justify-center gap-2 px-6 h-16 bg-zinc-100 rounded-[20px] text-[10px] font-black uppercase hover:bg-zinc-200 transition-all text-zinc-500">
                    <ArrowLeft size={20} />
                  </button>
                </div>
              </div>

              {/* --- Tracking Sheet (ផ្ទាំងស្ថានភាពឥវ៉ាន់) --- */}
              <AnimatePresence>
                {showTracking && (
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute inset-x-0 bottom-0 z-[50] bg-white border-t shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[40px] p-8 md:p-10"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                          <Box size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-black uppercase italic italic leading-none">{t.trackOrder}</h3>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">ID: {orderId}</p>
                        </div>
                      </div>
                      <button onClick={() => setShowTracking(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                        <X size={24} className="text-zinc-400" />
                      </button>
                    </div>

                    <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-100">
                      {trackingSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-6 relative">
                          <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${step.done ? 'bg-green-500 text-white' : 'bg-zinc-200 text-zinc-400'}`}>
                            {step.done ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                          </div>
                          <div className="flex-1 italic">
                            <p className={`text-sm font-black uppercase ${step.done ? 'text-zinc-800' : 'text-zinc-400'}`}>{step.status}</p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{step.time}</p>
                          </div>
                          {i === 2 && step.done && (
                             <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                               <MapPin size={10} className="text-blue-600" />
                               <span className="text-[9px] font-black text-blue-600 uppercase">Phnom Penh</span>
                             </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setShowTracking(false)}
                      className="w-full mt-10 py-5 bg-zinc-900 text-white rounded-[22px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95"
                    >
                      {lang === 'kh' ? 'យល់ព្រម' : 'Got it'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            <div className="bg-zinc-50 py-4 text-center text-[9px] text-zinc-300 font-black uppercase tracking-[0.3em] italic">
              {t.footerMsg}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(invoiceContent, document.body);
}