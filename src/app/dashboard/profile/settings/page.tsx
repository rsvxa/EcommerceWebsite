"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Bell, Lock, Palette, CreditCard, Shield, 
  Mail, Smartphone, Loader2, MapPin, Phone, Globe,
  ShoppingBag, Tag, ShieldCheck, Trash2, Building2, Hash
} from "lucide-react";
import axios from 'axios';
import { useLanguage } from "@/lib/store/use-language";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { toast } from "sonner";

export function SettingsPage() {
  const { lang } = useLanguage();
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  // ១. State សម្រាប់គ្រប់គ្រង Profile (ផ្គូផ្គងជាមួយ Database Fields)
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    zipCode: "",
    address: ""
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    orders: true,
    promo: false,
    security: true
  });

  // ២. ទាញទិន្នន័យពី Database នៅពេល Component ចាប់ផ្ដើម
  useEffect(() => {
    // ផ្នែក fetchCurrentData ក្នុង useEffect
const fetchCurrentData = async () => {
  const userEmail = localStorage.getItem('zway_user_email');
  if (!userEmail) {
    setLoading(false);
    return;
  }

  try {
    // កែ endpoint ឱ្យត្រូវនឹង server.js (ប្រើ /api/customer?email=...)
    const response = await fetch(`http://localhost:5000/api/customer?email=${encodeURIComponent(userEmail)}`);
    if (response.ok) {
      const data = await response.json();
      setProfileData({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        country: data.country || "",
        city: data.city || "",
        zipCode: data.zipCode || "",
        address: data.address || ""
      });
    }
  } catch (error) {
    console.error("Load settings error:", error);
  } finally {
    setLoading(false);
  }
};

// ផ្នែក handleUpdateProfile
const handleUpdateProfile = async () => {
  if (!profileData.email) return toast.error("Email is required");

  setIsUpdating(true);
  try {
    const response = await fetch('http://localhost:5000/api/customer/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData) // ផ្ញើ profileData ទាំងមូលដែលរួមមាន email, fullName...
    });

    if (!response.ok) throw new Error("Update failed");

    // ប្រាប់ឱ្យ Component ផ្សេងៗដឹងថាមានការ Update (រូបភាព ឬឈ្មោះ)
    window.dispatchEvent(new Event('avatarUpdated'));
    
    toast.success(lang === 'kh' ? "រក្សាទុកជោគជ័យ!" : "Changes saved to database!");
  } catch (error) {
    toast.error(lang === 'kh' ? "ការតភ្ជាប់មានបញ្ហា" : "Connection failed");
  } finally {
    setIsUpdating(false);
  }
};

    fetchCurrentData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // ៣. មុខងាររក្សាទុកទិន្នន័យទៅ Database (Sync with Backend)
  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch('http://localhost:5000/api/customer/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profileData.email,
          fullName: profileData.fullName,
          phone: profileData.phone,
          country: profileData.country,
          city: profileData.city,
          zipCode: profileData.zipCode,
          address: profileData.address,
        })
      });

      if (!response.ok) throw new Error("Update failed");

      // ប្រាប់ឱ្យ Component ផ្សេងៗ (ដូចជា Sidebar) Update តាម
      window.dispatchEvent(new Event('avatarUpdated'));
      
      toast.success(lang === 'kh' ? "រក្សាទុកជោគជ័យ!" : "Changes saved to database!");
    } catch (error) {
      toast.error(lang === 'kh' ? "ការតភ្ជាប់មានបញ្ហា" : "Connection failed");
    } finally {
      setIsUpdating(false);
    }
  };

const handleDeleteOwnProfile = async () => {
  // ប្រើ email ដែលមានស្រាប់ក្នុង profileData
  const userEmail = profileData.email;

  if (!userEmail) {
    return toast.error(lang === 'kh' ? "រកមិនឃើញអ៊ីមែល!" : "Email not found!");
  }

  if (window.confirm(lang === 'kh' 
    ? "⚠️ តើអ្នកពិតជាចង់លុបគណនីរបស់អ្នកមែនទេ? រាល់ទិន្នន័យទាំងអស់នឹងត្រូវបាត់បង់!" 
    : "⚠️ Are you sure you want to delete your account? All data will be permanently lost!")) {
    
    try {
      setIsUpdating(true); // បង្ហាញ Loading
      const res = await axios.delete(`http://localhost:5000/api/customer/delete-profile?email=${encodeURIComponent(userEmail)}`);
      
      if (res.data.success) {
        toast.success(lang === 'kh' ? "គណនីរបស់អ្នកត្រូវបានលុប" : "Your account has been deleted");
        
        // លុបព័ត៌មានពី LocalStorage
        localStorage.removeItem('zway_user_email');
        localStorage.removeItem('zway_user_token'); // បើមាន

        // បញ្ជូនទៅកាន់ទំព័រ Login ឬ Home ក្រោយ 2 វិនាទី
        setTimeout(() => {
          window.location.href = '/'; 
        }, 2000);
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.error || (lang === 'kh' ? "មានបញ្ហាក្នុងការលុប" : "Delete failed"));
    } finally {
      setIsUpdating(false);
    }
  }
};

  const t = (kh: string, en: string) => (lang === "kh" ? kh : en);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-zinc-900" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 italic selection:bg-zinc-900 selection:text-white">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-3 italic">
            {t("ការកំណត់", "Settings")}
          </h1>
          <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">
            {t("គ្រប់គ្រងគណនី ZWAY របស់អ្នក", "Manage your ZWAY account settings")}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 bg-zinc-50 p-1 rounded-2xl shadow-sm">
            <TabsTrigger value="profile" className="rounded-xl font-black uppercase text-[10px] tracking-widest">{t('ឯកជនភាព', 'Profile')}</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl font-black uppercase text-[10px] tracking-widest">{t('ការជូនដំណឹង', 'Alerts')}</TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl font-black uppercase text-[10px] tracking-widest">{t('សុវត្ថិភាព', 'Security')}</TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-xl font-black uppercase text-[10px] tracking-widest">{t('រូបរាង', 'Style')}</TabsTrigger>
            <TabsTrigger value="billing" className="rounded-xl font-black uppercase text-[10px] tracking-widest">{t('ការបង់ប្រាក់', 'Billing')}</TabsTrigger>
          </TabsList>

          {/* 1. Profile Tab Content */}
          <TabsContent value="profile" className="space-y-8 outline-none">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10 bg-white">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white rotate-3 shadow-lg">
                  <User size={24} />
                </div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                  {t('ព័ត៌មានលម្អិត', 'Account Details')}
                </h2>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                <InputGroup 
                  label={t("ឈ្មោះពេញ*", "Full Name*")} 
                  name="fullName" 
                  value={profileData.fullName} 
                  onChange={handleChange} 
                  icon={<User size={14}/>} 
                />
                <InputGroup 
                  label={t("អ៊ីមែល*", "Email Address*")} 
                  name="email" 
                  value={profileData.email} 
                  onChange={handleChange} 
                  icon={<Mail size={14}/>} 
                />
                <InputGroup 
                  label={t("លេខទូរស័ព្ទ", "Phone Number")} 
                  name="phone" 
                  value={profileData.phone} 
                  onChange={handleChange} 
                  icon={<Phone size={14}/>} 
                />
                <InputGroup 
                  label={t("ប្រទេស", "Country")} 
                  name="country" 
                  value={profileData.country} 
                  onChange={handleChange} 
                  icon={<Globe size={14}/>} 
                />
                <InputGroup 
                  label={t("ទីក្រុង", "City")} 
                  name="city" 
                  value={profileData.city} 
                  onChange={handleChange} 
                  icon={<Building2 size={14}/>} 
                />
                <InputGroup 
                  label={t("លេខកូដតំបន់", "Zip Code")} 
                  name="zipCode" 
                  value={profileData.zipCode} 
                  onChange={handleChange} 
                  icon={<Hash size={14}/>} 
                />
                <div className="md:col-span-2">
                  <InputGroup 
                    label={t("អាសយដ្ឋាន*", "Address*")} 
                    name="address" 
                    value={profileData.address} 
                    onChange={handleChange} 
                    icon={<MapPin size={14}/>} 
                  />
                </div>
              </div>

              <Separator className="opacity-50" />

              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <button 
  onClick={handleDeleteOwnProfile}
  disabled={isUpdating}
  className="flex items-center gap-2 text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors uppercase text-[11px] font-black tracking-widest italic"
>
  <Trash2 size={16} />
  {t("លុបគណនី", "Delete Account")}
</button>

                <Button 
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-[20px] px-14 py-8 uppercase text-[12px] font-black tracking-[0.2em] shadow-2xl active:scale-95 transition-all italic"
                >
                  {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : t("ធ្វើបច្ចុប្បន្នភាព", "Update Profile")}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* 2. Notifications Tab Content */}
          <TabsContent value="notifications" className="outline-none">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10 bg-white">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white -rotate-3 shadow-lg">
                  <Bell size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">{t("ការជូនដំណឹង", "Alerts")}</h2>
              </div>

              <div className="space-y-4">
                <SwitchRow 
                  icon={<Mail size={20} className="text-blue-500" />} 
                  label={t("អ៊ីមែល", "Email Notifications")} 
                  checked={notifications.email} 
                  onChange={(v) => setNotifications(p => ({...p, email: v}))} 
                />
                <SwitchRow 
                  icon={<ShoppingBag size={20} className="text-emerald-500" />} 
                  label={t("ស្ថានភាពការបញ្ជាទិញ", "Order Updates")} 
                  checked={notifications.orders} 
                  onChange={(v) => setNotifications(p => ({...p, orders: v}))} 
                />
              </div>
            </Card>
          </TabsContent>

          {/* 3. Security Tab Content */}
          <TabsContent value="security" className="outline-none">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10 bg-white">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white rotate-2 shadow-lg">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">{t("សុវត្ថិភាព", "Security")}</h2>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400 px-2">
                  {t("ឧបករណ៍ដែលកំពុងប្រើ", "Active Sessions")}
                </h3>
                <DeviceLogItem 
                  device="Current Browser" 
                  location="Detected via IP" 
                  time={t("កំពុងប្រើឥឡូវនេះ", "Active now")} 
                  isCurrent={true} 
                />
              </div>
            </Card>
          </TabsContent>

          {/* 4. Billing Tab Content */}
          <TabsContent value="billing" className="outline-none">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10 bg-white">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white rotate-3 shadow-lg">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">{t("ការបង់ប្រាក់", "Billing")}</h2>
              </div>
              <div className="p-16 border-2 border-dashed border-zinc-100 rounded-[35px] text-center italic">
                <p className="font-black uppercase text-[12px] tracking-widest text-zinc-400">
                  {t("មិនទាន់មានព័ត៌មានបង់ប្រាក់", "No Payment Method Saved")}
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// --- Reusable Sub-Components ---

function InputGroup({ 
  label, name, value, onChange, icon, type = "text" 
}: { 
  label: string, name: string, value: string, onChange: (e: any) => void, icon?: React.ReactNode, type?: string 
}) {
  return (
    <div className="space-y-2 group">
      <div className="flex items-center gap-2 ml-1">
        {icon && <span className="text-zinc-400 group-focus-within:text-zinc-900 transition-colors">{icon}</span>}
        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
          {label}
        </Label>
      </div>
      <Input 
        name={name}
        type={type} 
        value={value}
        onChange={onChange}
        className="rounded-2xl border-zinc-100 py-7 font-bold text-lg bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all shadow-inner italic" 
      />
    </div>
  );
}

function SwitchRow({ 
  icon, label, checked, onChange 
}: { 
  icon: React.ReactNode, label: string, checked: boolean, onChange: (v: boolean) => void 
}) {
  return (
    <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-[28px] border border-transparent hover:border-zinc-200 hover:bg-white transition-all shadow-sm italic group">
      <div className="flex items-center gap-5">
        <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all">{icon}</div>
        <p className="font-black uppercase text-[11px] tracking-widest text-zinc-900">{label}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-zinc-900" />
    </div>
  );
}

function DeviceLogItem({ 
  device, location, time, isCurrent 
}: { 
  device: string, location: string, time: string, isCurrent: boolean 
}) {
  return (
    <div className="flex items-center justify-between p-5 bg-zinc-50 rounded-[24px] border border-transparent hover:border-zinc-200 transition-all group shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${isCurrent ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-400'}`}>
          <Smartphone size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-black uppercase text-[11px] tracking-tight">{device}</p>
            {isCurrent && <span className="bg-emerald-500 w-1.5 h-1.5 rounded-full animate-pulse" />}
          </div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
            {location} • {time}
          </p>
        </div>
      </div>
    </div>
  );
}