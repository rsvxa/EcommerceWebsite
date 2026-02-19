"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/store/use-language';
import { Camera, Trash2, User, Mail, Phone, Globe, MapPin, Hash, Building2 } from 'lucide-react';
import { toast } from 'sonner';

export function ProfileOverview() {
  const { lang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Tonmoy";
  
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    zipCode: "",
    address: ""
  });

  const [profileImage, setProfileImage] = useState(defaultAvatar);

  useEffect(() => {
    const savedName = localStorage.getItem('zway_user_name') || "N/A";
    const savedEmail = localStorage.getItem('zway_user_email') || "N/A"; 
    const checkoutData = JSON.parse(localStorage.getItem('zway_checkout_info') || '{}');
    const savedImage = localStorage.getItem('zway_user_avatar');

    setUserData({
      fullName: savedName,
      email: savedEmail,
      phone: checkoutData.phone || "N/A",
      country: checkoutData.country || "N/A",
      city: checkoutData.city || "N/A",
      zipCode: checkoutData.zipCode || "N/A",
      address: checkoutData.address || "N/A"
    });

    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('zway_user_avatar', base64String);
        window.dispatchEvent(new Event('avatarUpdated'));
        toast.success(lang === 'kh' ? "បានប្តូររូបភាពជោគជ័យ" : "Photo updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(defaultAvatar);
    localStorage.removeItem('zway_user_avatar');
    window.dispatchEvent(new Event('avatarUpdated'));
    toast.info(lang === 'kh' ? "បានលុបរូបថត" : "Photo removed");
  };

  const t = (kh: string, en: string) => (lang === 'kh' ? kh : en);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10 italic">
      
      {/* Photo Section */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-zinc-50 shadow-md bg-zinc-100 transition-transform group-hover:scale-105">
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={24} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">{t('រូបថតគណនី', 'Profile Photo')}</h3>
            <div className="flex gap-4 mt-2">
               <button onClick={() => fileInputRef.current?.click()} className="text-[12px] font-black uppercase text-zinc-400 hover:text-black transition-colors cursor-pointer">
                 {t('ប្តូររូប', 'Change Photo')}
               </button>
               <button onClick={handleRemovePhoto} className="text-[12px] font-black uppercase text-red-500 flex items-center gap-1 hover:text-red-700 transition-colors cursor-pointer">
                 <Trash2 size={14} /> {t('លុប', 'Remove')}
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Information Table Section */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter">{t('ព័ត៌មានលម្អិត', 'Account Details')}</h2>
        </div>

        <div className="divide-y divide-zinc-50 border-t border-zinc-50">
          <DataRow icon={<User size={18}/>} label={t("ឈ្មោះពេញ", "Full Name")} value={userData.fullName} />
          <DataRow icon={<Mail size={18}/>} label={t("អ៊ីមែល", "Email Address")} value={userData.email} />
          <DataRow icon={<Phone size={18}/>} label={t("លេខទូរស័ព្ទ", "Phone Number")} value={userData.phone} />
          <DataRow icon={<Globe size={18}/>} label={t("ប្រទេស", "Country")} value={userData.country} />
          <DataRow icon={<Building2 size={18}/>} label={t("ទីក្រុង", "City")} value={userData.city} />
          <DataRow icon={<Hash size={18}/>} label={t("លេខកូដតំបន់", "Zip Code")} value={userData.zipCode} />
          <DataRow icon={<MapPin size={18}/>} label={t("អាសយដ្ឋាន", "Address")} value={userData.address} fullWidth />
        </div>

        <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-[11px] font-bold text-zinc-400 leading-relaxed">
            {t("* ប្រសិនបើអ្នកចង់កែប្រែព័ត៌មានទាំងនេះ សូមចូលទៅកាន់ផ្នែកកែប្រែគណនី ឬទាក់ទងមកកាន់ផ្នែកគាំទ្រ។", 
               "* To update these details, please navigate to the edit section or contact our support team.")}
          </p>
        </div>
      </div>
    </div>
  );
}

// Table Row Component
function DataRow({ icon, label, value, fullWidth = false }: { icon: React.ReactNode, label: string, value: string, fullWidth?: boolean }) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center py-5 gap-2 md:gap-0`}>
      <div className="flex items-center gap-3 w-full md:w-1/3">
        <div className="text-zinc-900">{icon}</div>
        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">{label}</span>
      </div>
      <div className="w-full md:w-2/3">
        <p className="text-base font-bold text-zinc-900 truncate">{value || "---"}</p>
      </div>
    </div>
  );
}