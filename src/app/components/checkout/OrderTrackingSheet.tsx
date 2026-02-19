"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package, Truck, Home, MapPin } from 'lucide-react';

export function OrderTrackingSheet({ isOpen, onClose, orderData }: any) {
  const steps = [
    { title: "បានបញ្ជាទិញ", date: "18 Feb, 09:30 AM", status: "completed", icon: Package },
    { title: "កំពុងរៀបចំឥវ៉ាន់", date: "18 Feb, 11:45 AM", status: "completed", icon: CheckCircle2 },
    { title: "កំពុងដឹកជញ្ជូន", date: "កំពុងដំណើរការ", status: "current", icon: Truck },
    { title: "ផ្ដល់ដល់ដៃអតិថិជន", date: "រំពឹងទុកនៅថ្ងៃស្អែក", status: "pending", icon: Home },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000000]"
          />
          
          {/* Sheet Content */}
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[2000001] flex flex-col italic"
          >
            {/* Header */}
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter">ស្ថានភាពដឹកជញ្ជូន</h2>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Order ID: {orderData?.orderId}</p>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm border border-zinc-100">
                <X size={20} />
              </button>
            </div>

            {/* Carrier Card */}
            <div className="p-8">
              <div className="bg-blue-600 rounded-[32px] p-6 text-white flex items-center justify-between shadow-xl shadow-blue-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-60">ក្រុមហ៊ុនដឹកជញ្ជូន</p>
                  <p className="text-lg font-black uppercase tracking-tight">{orderData?.customer?.shippingCarrier || 'J&T Express'}</p>
                </div>
                <Truck size={32} className="opacity-40" />
              </div>

              {/* Timeline Items */}
              <div className="mt-12 space-y-10 relative">
                {/* Vertical Line */}
                <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-zinc-100" />

                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-6 relative">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 shadow-sm border ${
                      step.status === 'completed' ? 'bg-zinc-900 border-zinc-900 text-white' : 
                      step.status === 'current' ? 'bg-blue-600 border-blue-600 text-white ring-8 ring-blue-50' : 
                      'bg-white border-zinc-100 text-zinc-300'
                    }`}>
                      <step.icon size={20} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className={`font-black text-sm uppercase tracking-tight ${step.status === 'pending' ? 'text-zinc-300' : 'text-zinc-900'}`}>
                        {step.title}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Last Location */}
              <div className="mt-12 p-6 bg-zinc-50 rounded-3xl border border-zinc-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-400">ទីតាំងចុងក្រោយ</p>
                  <p className="text-xs font-bold text-zinc-800 mt-1">ឃ្លាំងស្ដុកទំនិញ - ភ្នំពេញ (Phnom Penh Hub)</p>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="mt-auto p-8 border-t border-zinc-50">
              <button onClick={onClose} className="w-full py-5 bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:bg-zinc-200 transition-all">
                បិទផ្ទាំងនេះ
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}