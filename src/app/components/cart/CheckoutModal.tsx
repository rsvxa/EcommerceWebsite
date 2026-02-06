"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
} from '@/app/components/ui/sheet';
import { Separator } from '@/app/components/ui/separator';
import { Button } from '@/app/components/ui/button';
import { Truck, ShieldCheck, CreditCard, MapPin } from 'lucide-react';
import { formatPrice } from '@/lib/utils/format';
import { OrderInvoice } from '../checkout/OrderInvoice';

interface CheckoutModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CheckoutModal({ isOpen, onOpenChange, total, cartItems }: any){
  const [paymentMethod, setPaymentMethod] = useState('khqr');
  const [country, setCountry] = useState('cambodia');
  const [shippingCarrier, setShippingCarrier] = useState('');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);


  const shippingData: any = {
    cambodia: [{ id: 'vireak', name: 'Vireak Buntham' }, { id: 'j&t', name: 'J&T Express' }],
    usa: [{ id: 'fedex', name: 'FedEx' }, { id: 'ups', name: 'UPS Worldwide' }],
    uk: [{ id: 'royal', name: 'Royal Mail' }, { id: 'dhl_uk', name: 'DHL UK' }],
    france: [{ id: 'chronopost', name: 'Chronopost' }, { id: 'dhl_eu', name: 'DHL Express' }],
    germany: [{ id: 'hermes', name: 'Hermes' }, { id: 'dhl_de', name: 'DHL Deutschland' }],
    korea: [{ id: 'korea_post', name: 'Korea Post (EMS)' }, { id: 'cj', name: 'CJ Logistics' }],
    japan: [{ id: 'yamato', name: 'Yamato Transport' }, { id: 'sagawa', name: 'Sagawa Express' }],
    china: [{ id: 'sf', name: 'SF Express' }, { id: 'ems_cn', name: 'China Post EMS' }],
    australia: [{ id: 'aus_post', name: 'Australia Post' }, { id: 'toll', name: 'Toll Global' }],
    canada: [{ id: 'canada_post', name: 'Canada Post' }, { id: 'purolator', name: 'Purolator' }],
    singapore: [{ id: 'singpost', name: 'SingPost' }, { id: 'ninja', name: 'Ninja Van' }],
    vietnam: [{ id: 'viettel', name: 'Viettel Post' }, { id: 'ghn', name: 'Giao Hang Nhanh' }]
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-2xl p-10 md:p-12 overflow-y-auto">
        
        <SheetHeader className="pb-8 text-center">
          <SheetTitle className="font-black uppercase tracking-tighter text-3xl">Checkout</SheetTitle>
          <SheetDescription className="text-sm mt-2">Provide your delivery and payment details.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-12">
          {/* Section 1: Shipping Information */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">Shipping Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase text-gray-400">Full Name</p>
                <input type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="John Doe" />
              </div>
              <div className="space-y-2 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase text-gray-400">Phone Number</p>
                <input type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="+855..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase text-gray-400">Country</p>
                <select 
                  value={country} 
                  onChange={(e) => { setCountry(e.target.value); setShippingCarrier(''); }}
                  className="w-full py-2 outline-none text-sm bg-transparent cursor-pointer"
                >
                  {Object.keys(shippingData).map((key) => (
                    <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase text-gray-400">Shipping Carrier</p>
                <select 
                  value={shippingCarrier} 
                  onChange={(e) => setShippingCarrier(e.target.value)}
                  className="w-full py-2 outline-none text-sm bg-transparent cursor-pointer"
                >
                  <option value="">Select Carrier</option>
                  {shippingData[country]?.map((carrier: any) => (
                    <option key={carrier.id} value={carrier.id}>{carrier.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Added: Province, District, Commune Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase text-gray-400">Province / City</p>
                <input type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="Phnom Penh" />
              </div>
              <div className="space-y-2 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase text-gray-400">District / Khan</p>
                <input type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="Daun Penh" />
              </div>
              <div className="space-y-2 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase text-gray-400">Commune / Sangkat</p>
                <input type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="Phsar Thmei" />
              </div>
            </div>

            <div className="space-y-2 border-b border-gray-100">
              <p className="text-[10px] font-bold uppercase text-gray-400">Specific Address (House No / Street)</p>
              <textarea placeholder="e.g. St. 123, House 45B..." className="w-full py-2 outline-none text-sm bg-transparent resize-none" rows={1} />
            </div>
          </div>

          <Separator className="opacity-50" />

          {/* Section 2: Payment Selection */}
          <div className="space-y-10 flex flex-col items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center w-full">Payment Method</h3>
            
            <div className="inline-flex p-1.5 bg-zinc-100/50 rounded-full border border-zinc-100">
              {['khqr', 'visa', 'cod'].map((method) => (
                <button 
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    paymentMethod === method ? 'bg-black text-white shadow-xl' : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  {method === 'khqr' ? 'KHQR' : method === 'visa' ? 'Visa' : 'COD'}
                </button>
              ))}
            </div>

            <div className="w-full pt-4">
              <AnimatePresence mode="wait">
                {paymentMethod === 'khqr' && (
                  <motion.div 
                    key="khqr"
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center p-12 bg-zinc-50 rounded-[2.5rem] border border-zinc-100"
                  >
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm mb-6 border border-zinc-50">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ABA_PAY_TOTAL_${total}`} alt="QR" className="w-40 h-40" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Amount to Pay</p>
                      <p className="text-3xl font-black text-blue-600">{formatPrice(total)}</p>
                    </div>
                  </motion.div>
                )}

                {/* RESTORED: Visa Card Form */}
                {paymentMethod === 'visa' && (
                  <motion.div 
                    key="visa"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="p-10 bg-zinc-50 rounded-[2.5rem] space-y-6 border border-zinc-100"
                  >
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest px-1">Card Number</p>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 rounded-xl border border-zinc-200 outline-none text-sm bg-white focus:ring-1 focus:ring-black transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest px-1">Expiry</p>
                        <input type="text" placeholder="MM/YY" className="w-full p-4 rounded-xl border border-zinc-200 outline-none text-sm bg-white focus:ring-1 focus:ring-black transition-all" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest px-1">CVC</p>
                        <input type="text" placeholder="123" className="w-full p-4 rounded-xl border border-zinc-200 outline-none text-sm bg-white focus:ring-1 focus:ring-black transition-all" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* RESTORED: Cash on Delivery View */}
                {paymentMethod === 'cod' && (
                  <motion.div 
                    key="cod"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="p-12 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 text-center"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Truck className="text-zinc-900" size={28} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">Cash on Delivery</p>
                    <p className="text-xs text-zinc-400 mt-2 max-w-[200px] mx-auto">Please have the exact amount ready for the courier upon arrival.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 mt-auto space-y-8">
          <Separator className="opacity-50" />
          <div className="flex justify-between items-center px-2">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Payable</p>
              <p className="text-4xl font-black tracking-tighter">{formatPrice(total)}</p>
            </div>
            <div className="flex items-center gap-2 opacity-40 text-green-600">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-bold uppercase">Secure</span>
            </div>
          </div>

          {paymentMethod !== 'khqr' ? (
            <Button onClick={() => setIsInvoiceOpen(true)}
            className="w-full bg-black text-white h-20 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-zinc-800 active:scale-[0.98] transition-all">
              Confirm Order
            </Button>
          ) : (
            <button onClick={onOpenChange} className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors font-medium">
              Cancel and Return to Cart
            </button>
          )}
        </div>

      </SheetContent>
    </Sheet>
  );
}