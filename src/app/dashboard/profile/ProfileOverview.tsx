"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/store/use-language';
import { Camera, User, Mail, Phone, Globe, MapPin, Hash, Building2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function ProfileOverview() {
  const { lang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Tonmoy";
  
  const [loading, setLoading] = useState(true);
  
  // ១. State រៀបចំឱ្យត្រូវតាម Key ដែល Backend បោះមក (fullName, image, etc.)
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    zipCode: "",
    address: "",
    status: "Active"
  });

  const [profileImage, setProfileImage] = useState(defaultAvatar);

  const fetchUserProfile = async () => {
    // ទាញ Email ពី LocalStorage ដែលយើងរក្សាទុកពេល Login
    const userEmail = localStorage.getItem('zway_user_email');
    
    if (!userEmail || userEmail === "N/A") {
      setLoading(false);
      return;
    }

    try {
      // ២. ហៅទៅកាន់ API `/api/customer` (ដែលយើងទើបតែកែក្នុង server.js)
      const response = await fetch(`http://localhost:5000/api/customer?email=${encodeURIComponent(userEmail)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch");
      }

      const data = await response.json();
      
      // ៣. បំពេញទិន្នន័យចូល State (ធានាថាប្រើ Key: data.fullName មិនមែន data.name)
      setUserData({
        fullName: data.fullName || "---",
        email: data.email || "---",
        phone: data.phone || "---",
        country: data.country || "---",
        city: data.city || "---",
        zipCode: data.zipCode || "---",
        address: data.address || "---",
        status: data.status || "Active"
      });

      // បើក្នុង DB មានរូបភាព ឱ្យបង្ហាញរូបហ្នឹង បើអត់ទេប្រើ Default
      setProfileImage(data.image || defaultAvatar);

    } catch (error: any) {
      console.error("Fetch Error:", error);
      // បង្ហាញ Error Message ជាភាសាខ្មែរ ឬអង់គ្លេស
      toast.error(lang === 'kh' ? "មិនអាចទាញទិន្នន័យបានទេ" : "Could not sync profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    
    // បន្ថែម Event Listener ដើម្បី Update រូបភាពភ្លាមៗពេលមានការកែប្រែពីកន្លែងផ្សេង
    const handleUpdate = () => fetchUserProfile();
    window.addEventListener('avatarUpdated', handleUpdate);
    return () => window.removeEventListener('avatarUpdated', handleUpdate);
  }, [lang]);

  // --- Logic សម្រាប់ Update រូបភាព និង លុបរូបភាព រក្សាទុកដដែល ប៉ុន្តែប្រើ API `/api/customer/update-profile` ---
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          const response = await fetch('http://localhost:5000/api/customer/update-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: userData.email,
              image: base64String
            })
          });

          if (response.ok) {
            setProfileImage(base64String);
            window.dispatchEvent(new Event('avatarUpdated'));
            toast.success(lang === 'kh' ? "បានប្តូររូបភាពជោគជ័យ" : "Profile photo updated!");
          }
        } catch (error) {
          toast.error("Upload failed");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const t = (kh: string, en: string) => (lang === 'kh' ? kh : en);

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-zinc-300" size={48} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 italic">
            {t("កំពុងផ្ទៀងផ្ទាត់ទិន្នន័យ...", "Synchronizing Profile...")}
          </p>
        </div>
      </div>
    );
  }

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
            <div className="mt-2">
              <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${
                userData.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                {userData.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Details */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-sm overflow-hidden">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">{t('ព័ត៌មានលម្អិត', 'Account Details')}</h2>

        <div className="divide-y divide-zinc-50 border-t border-zinc-50">
          <DataRow icon={<User size={18}/>} label={t("ឈ្មោះពេញ", "Full Name")} value={userData.fullName} />
          <DataRow icon={<Mail size={18}/>} label={t("អ៊ីមែល", "Email Address")} value={userData.email} />
          <DataRow icon={<Phone size={18}/>} label={t("លេខទូរស័ព្ទ", "Phone Number")} value={userData.phone} />
          <DataRow icon={<Globe size={18}/>} label={t("ប្រទេស", "Country")} value={userData.country} />
          <DataRow icon={<Building2 size={18}/>} label={t("ទីក្រុង", "City")} value={userData.city} />
          <DataRow icon={<Hash size={18}/>} label={t("លេខកូដតំបន់", "Zip Code")} value={userData.zipCode} />
          <DataRow icon={<MapPin size={18}/>} label={t("អាសយដ្ឋាន", "Address")} value={userData.address} />
        </div>
                <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
          <p className="text-[11px] font-bold text-zinc-400 leading-relaxed uppercase tracking-widest">
            {t("* ទិន្នន័យត្រូវបានរក្សាទុកដោយសុវត្ថិភាពក្នុង Database", "* Your data is securely synchronized with our database")}
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusable Row Component
function DataRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center py-6 group transition-colors hover:bg-zinc-50/50 px-2 rounded-xl">
      <div className="flex items-center gap-3 w-full md:w-1/3 mb-1 md:mb-0">
        <div className="text-zinc-900">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{label}</span>
      </div>
      <div className="w-full md:w-2/3">
        <p className="text-sm font-black text-zinc-900 uppercase tracking-tight truncate">
          {value && value !== "---" ? value : "---"}
        </p>
      </div>
    </div>
  );
}