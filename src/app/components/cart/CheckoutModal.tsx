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
import { Truck, ShieldCheck, CreditCard, MapPin, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils/format';
import { OrderInvoice } from '../checkout/OrderInvoice';
import { toast } from 'sonner';
import { useCartStore } from "@/lib/store/cart-store";

 const TELEGRAM_BOT_TOKEN = "8174063017:AAEvRhmDVFJ_gX6wCS1D0-8cs0tECZkbnZA";
  const TELEGRAM_CHAT_ID = "8174063017";

export function CheckoutModal({ isOpen, onOpenChange, total, cartItems }: any) {
  const [paymentMethod, setPaymentMethod] = useState('khqr');
  const [country, setCountry] = useState('cambodia');
  const [shippingCarrier, setShippingCarrier] = useState('');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [finalOrderData, setFinalOrderData] = useState<any>(null);
  
  const { clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    province: '',
    district: '',
    commune: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const shippingData: any = {
    cambodia: [{ id: 'vireak', name: 'Vireak Buntham' }, { id: 'j&t', name: 'J&T Express' }],
    usa: [{ id: 'fedex', name: 'FedEx' }, { id: 'ups', name: 'UPS Worldwide' }],
  };

  const sendToTelegram = async (order: any) => {
    const message = `
📦 **ការបញ្ជាទិញថ្មី!**
━━━━━━━━━━━━━━━━━━
🆔 **Order ID:** \`${order.orderId}\`
👤 **ឈ្មោះ:** ${order.customer.fullName}
📞 **ទូរសព្ទ:** ${order.customer.phone}
📍 **ទីតាំង:** ${order.customer.address}, ${order.customer.province}
🚚 **ដឹកជញ្ជូន:** ${order.customer.shippingCarrier}
💳 **បង់ប្រាក់:** ${order.customer.paymentMethod}
━━━━━━━━━━━━━━━━━━
🛒 **ទំនិញ:**
${order.items.map((item: any) => `• ${item.product?.name || item.name} (x${item.quantity})`).join('\n')}

💰 **សរុប: ${formatPrice(order.total)}**
━━━━━━━━━━━━━━━━━━
    `;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    } catch (e) { console.error(e); }
  };
 

  const handleConfirmOrder = async () => {
    if (!formData.fullName.trim()) return toast.error("Please input your full name!");
    if (!formData.phone.trim()) return toast.error("Please input your phone number!");
    if (!shippingCarrier) return toast.error("Please select shipping delivery!");
    if (!formData.province.trim() || !formData.address.trim()) return toast.error("Please input your fuul location!");

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      const orderSummary = {
        orderId: `ZW-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cartItems],
        total: total,    
        customer: {
          ...formData,
          paymentMethod: paymentMethod.toUpperCase(),
          shippingCarrier: shippingData[country]?.find((c: any) => c.id === shippingCarrier)?.name || shippingCarrier
        }
      };

      await sendToTelegram(orderSummary);
      setFinalOrderData(orderSummary); 

      toast.success("Payment successfully!");

      if (typeof onOpenChange === 'function') {
        onOpenChange(false); 
      }

      setTimeout(() => {
        setIsInvoiceOpen(true);
        clearCart(); 
      }, 400);

    } catch (error) {
      toast.error("Your information involed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col sm:max-w-2xl p-10 md:p-12 overflow-y-auto z-[999]">
          
          <SheetHeader className="pb-8 text-center">
            <SheetTitle className="font-black uppercase tracking-tighter text-3xl">Checkout</SheetTitle>
            <SheetDescription className="text-sm mt-2">Provide your delivery and payment details.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-12">
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">Shipping Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2 border-b border-gray-100 italic">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Full Name</p>
                  <input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="John Doe" />
                </div>
                <div className="space-y-2 border-b border-gray-100 italic">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Phone Number</p>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="+855..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 italic">
                <div className="space-y-2 border-b border-gray-100">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Country</p>
                  <select value={country} onChange={(e) => { setCountry(e.target.value); setShippingCarrier(''); }} className="w-full py-2 outline-none text-sm bg-transparent cursor-pointer">
                    {Object.keys(shippingData).map((key) => (
                      <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 border-b border-gray-100">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Shipping Carrier</p>
                  <select value={shippingCarrier} onChange={(e) => setShippingCarrier(e.target.value)} className="w-full py-2 outline-none text-sm bg-transparent cursor-pointer font-bold text-blue-600">
                    <option value="">Select Carrier</option>
                    {shippingData[country]?.map((carrier: any) => (
                      <option key={carrier.id} value={carrier.id}>{carrier.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 italic">
                <div className="space-y-2 border-b border-gray-100">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Province / City</p>
                  <input name="province" value={formData.province} onChange={handleInputChange} type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="Phnom Penh" />
                </div>
                <div className="space-y-2 border-b border-gray-100">
                  <p className="text-[10px] font-bold uppercase text-gray-400">District / Khan</p>
                  <input name="district" value={formData.district} onChange={handleInputChange} type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="Daun Penh" />
                </div>
                <div className="space-y-2 border-b border-gray-100">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Commune / Sangkat</p>
                  <input name="commune" value={formData.commune} onChange={handleInputChange} type="text" className="w-full py-2 outline-none text-sm bg-transparent" placeholder="Phsar Thmei" />
                </div>
              </div>

              <div className="space-y-2 border-b border-gray-100 italic">
                <p className="text-[10px] font-bold uppercase text-gray-400">Specific Address</p>
                <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="e.g. St. 123, House 45B..." className="w-full py-2 outline-none text-sm bg-transparent resize-none" rows={1} />
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* --- Payment Method Section --- */}
            <div className="space-y-10 flex flex-col items-center italic">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center w-full">Payment Method</h3>
              
              <div className="inline-flex p-1.5 bg-zinc-100/50 rounded-full border border-zinc-100">
                {['khqr', 'visa', 'cod'].map((method) => (
                  <button key={method} type="button" onClick={() => setPaymentMethod(method)}
                    className={`px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      paymentMethod === method ? 'bg-black text-white shadow-xl' : 'text-zinc-400 hover:text-black'
                    }`}
                  >
                    {method.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="w-full pt-4">
                <AnimatePresence mode="wait">
                  {paymentMethod === 'khqr' && (
                    <motion.div key="khqr" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center p-12 bg-zinc-50 rounded-[2.5rem] border border-zinc-100">
                      <div className="bg-white p-6 rounded-[2rem] shadow-sm mb-6 border border-zinc-50">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PAY_TO_STORE_${total}`} alt="QR" className="w-40 h-40" />
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Amount to Pay</p>
                        <p className="text-3xl font-black text-blue-600">{formatPrice(total)}</p>
                      </div>
                      <Button onClick={handleConfirmOrder} disabled={isSubmitting} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white w-full rounded-xl uppercase text-[10px] tracking-widest font-black py-6 shadow-lg transition-transform active:scale-95">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "I have paid via KHQR"}
                      </Button>
                    </motion.div>
                  )}

                  {paymentMethod === 'visa' && (
                    <motion.div key="visa" className="p-10 bg-zinc-50 rounded-[2.5rem] space-y-6 border border-zinc-100">
                       <input type="text" placeholder="Card Number" className="w-full p-4 rounded-xl border bg-white outline-none" />
                       <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="MM/YY" className="p-4 rounded-xl border bg-white outline-none" />
                          <input type="text" placeholder="CVC" className="p-4 rounded-xl border bg-white outline-none" />
                       </div>
                    </motion.div>
                  )}
                  
                  {paymentMethod === 'cod' && (
                    <motion.div key="cod" className="p-12 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 text-center">
                       <Truck className="mx-auto mb-4 text-zinc-400" size={48} />
                       <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Cash on Delivery</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

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

            {paymentMethod !== 'khqr' && (
              <Button 
                onClick={handleConfirmOrder}
                disabled={isSubmitting}
                className="w-full bg-black text-white h-20 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-zinc-800 transition-all"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm Order"}
              </Button>
            )}
            
            {paymentMethod === 'khqr' && (
               <button 
                onClick={() => onOpenChange(false)} 
                className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors italic"
              >
                Cancel and Return to Cart
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* ការហៅ Invoice បង្ហាញចេញពី Snapshot Data */}
      {finalOrderData && (
        <OrderInvoice 
          isOpen={isInvoiceOpen} 
          onOpenChange={setIsInvoiceOpen} 
          orderData={finalOrderData} 
        />
      )}
    </>
  );
}
