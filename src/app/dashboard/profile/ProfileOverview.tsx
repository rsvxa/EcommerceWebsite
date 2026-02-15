"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { Camera, ChevronDown, Loader2, CheckCircle2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ProfileOverview() {
  const { lang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Tonmoy";
  
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ១. ឆែកមើលទិន្នន័យពី LocalStorage (ត្រូវប្រាកដថា Key នេះដូចក្នុង AuthDialog)
    const savedName = localStorage.getItem('zway_user_name') || "";
    const savedEmail = localStorage.getItem('zway_user_email') || ""; 
    const checkoutData = JSON.parse(localStorage.getItem('zway_checkout_info') || '{}');
    const savedImage = localStorage.getItem('zway_user_avatar');

    setUserData({
      fullName: savedName,
      email: savedEmail, // ត្រង់នេះនឹងទាញ Email ពី Login មក
      phone: checkoutData.phone || "",
      address: checkoutData.address || "",
      city: checkoutData.city || "",
      zipCode: checkoutData.zipCode || ""
    });

    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // បន្ថែមមុខងារលុបរូបថត
  const handleRemovePhoto = () => {
    setProfileImage(defaultAvatar);
    toast.info(lang === 'kh' ? "បានលុបរូបថត" : "Photo removed");
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    try {
      localStorage.setItem('zway_user_avatar', profileImage);
      localStorage.setItem('zway_user_name', userData.fullName);
      localStorage.setItem('zway_user_email', userData.email); // រក្សាទុក Email ដែលបានកែ

      const updatedCheckoutInfo = {
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        zipCode: userData.zipCode
      };
      localStorage.setItem('zway_checkout_info', JSON.stringify(updatedCheckoutInfo));

      window.dispatchEvent(new Event('avatarUpdated'));

      setTimeout(() => {
        setIsLoading(false);
        toast.success(lang === 'kh' ? "រក្សាទុកជោគជ័យ!" : "Saved successfully!");
      }, 800);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error saving data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      
      {/* Photo Section */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-5">
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-zinc-50 shadow-inner bg-zinc-100">
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black italic">{lang === 'kh' ? 'រូបថតគណនី' : 'Profile Photo'}</h3>
            <div className="flex gap-3 mt-2">
               <button onClick={() => fileInputRef.current?.click()} className="text-[13px] font-black uppercase text-gray-400 hover:text-black cursor-pointer">
                 {lang === 'kh' ? 'ប្តូររូប' : 'Change'}
               </button>
               <button onClick={handleRemovePhoto} className="text-[13px] font-black uppercase text-red-500 flex items-center gap-1 cursor-pointer">
                 <Trash2 size={13} /> {lang === 'kh' ? 'លុប' : 'Remove'}
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-sm space-y-8">
        <h2 className="text-2xl font-black italic">{lang === 'kh' ? 'ព័ត៌មានលម្អិត' : 'Account Details'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
          <InputGroup label={lang === 'kh' ? "ឈ្មោះពេញ*" : "Full Name*"} name="fullName" value={userData.fullName} onChange={handleChange} />
          
          <InputGroup label={lang === 'kh' ? "អ៊ីមែល*" : "Email Address*"} name="email" value={userData.email} onChange={handleChange} />
          
          <InputGroup label={lang === 'kh' ? "លេខទូរស័ព្ទ" : "Phone Number"} name="phone" value={userData.phone} onChange={handleChange} />
          <InputGroup label={lang === 'kh' ? "លេខកូដតំបន់" : "Zip Code"} name="zipCode" value={userData.zipCode} onChange={handleChange} />

          <div className="md:col-span-2">
            <InputGroup label={lang === 'kh' ? "អាសយដ្ឋាន*" : "Address*"} name="address" value={userData.address} onChange={handleChange} />
          </div>

          <InputGroup label={lang === 'kh' ? "ទីក្រុង" : "City"} name="city" value={userData.city} onChange={handleChange} />
        </div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveChanges}
          disabled={isLoading}
          className="w-full py-5 bg-black text-white rounded-2xl text-[13px] font-black uppercase tracking-[0.3em] shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : (lang === 'kh' ? 'រក្សាទុកការផ្លាស់ប្តូរ' : 'Save Changes')}
        </motion.button>
      </div>
    </div>
  );
}

function InputGroup({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: any) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-1">{label}</p>
      <input 
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="..."
        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-xl text-sm font-bold text-zinc-900 outline-none focus:ring-2 ring-indigo-50 focus:bg-white transition-all shadow-inner"
      />
    </div>
  );
}