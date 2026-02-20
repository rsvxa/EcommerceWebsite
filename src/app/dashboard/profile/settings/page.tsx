"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Bell, Lock, Palette, CreditCard, Shield, 
  Mail, Smartphone, Loader2, MapPin, Phone, Globe,
  ShoppingBag, Tag, ShieldCheck
} from "lucide-react";
import { useLanguage } from "@/lib/store/use-language";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { toast } from "sonner";

export function SettingsPage() {
  const { lang, setLanguage } = useLanguage();
  const [isUpdating, setIsUpdating] = useState(false);

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProfileData({
        fullName: localStorage.getItem('zway_user_name') || "",
        email: localStorage.getItem('zway_user_email') || "",
        phone: localStorage.getItem('zway_user_phone') || "",
        country: localStorage.getItem('zway_user_country') || "",
        city: localStorage.getItem('zway_user_city') || "",
        zipCode: localStorage.getItem('zway_user_zip') || "",
        address: localStorage.getItem('zway_user_address') || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    setIsUpdating(true);
    try {
      localStorage.setItem('zway_user_name', profileData.fullName);
      localStorage.setItem('zway_user_email', profileData.email);
      localStorage.setItem('zway_user_phone', profileData.phone);
      localStorage.setItem('zway_user_country', profileData.country);
      localStorage.setItem('zway_user_city', profileData.city);
      localStorage.setItem('zway_user_zip', profileData.zipCode);
      localStorage.setItem('zway_user_address', profileData.address);

      window.dispatchEvent(new Event('avatarUpdated'));

      setTimeout(() => {
        setIsUpdating(false);
        toast.success(lang === 'kh' ? "រក្សាទុកជោគជ័យ!" : "Profile updated successfully!");
      }, 800);
    } catch (error) {
      setIsUpdating(false);
      toast.error("Error updating profile");
    }
  };

  const t = (kh: string, en: string) => (lang === "kh" ? kh : en);

  return (
    <div className="min-h-screen bg-white py-12 px-4 italic selection:bg-zinc-900 selection:text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-3 italic">
            {t("ការកំណត់", "Settings")}
          </h1>
          <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">
            {t("គ្រប់គ្រងគណនី ZWAY របស់អ្នក", "Manage your ZWAY account settings")}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2">
            <TabsTrigger value="profile">{lang === 'kh' ? 'ឯកជនភាព' : 'Privacy'}</TabsTrigger>
            <TabsTrigger value="notifications">{lang === 'kh' ? 'ការជូនដំណឹង' : 'Notifications'}</TabsTrigger>
            <TabsTrigger value="security">{lang === 'kh' ? 'សុវត្ថិភាព' : 'Security'}</TabsTrigger>
            <TabsTrigger value="appearance">{lang === 'kh' ? 'រូបរាង' : 'Appearance'}</TabsTrigger>
            <TabsTrigger value="billing">{lang === 'kh' ? 'ការបង់ប្រាក់' : 'Billing'}</TabsTrigger>
          </TabsList>

          {/* 1. Profile Content */}
          <TabsContent value="profile" className="space-y-8">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10 bg-white">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white rotate-3 shadow-lg">
                  <User size={24} />
                </div>
                <h2 className="text-2xl font-black italic">
                  {lang === 'kh' ? 'ព័ត៌មានលម្អិត' : 'Account Details'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                <InputGroup label={lang === 'kh' ? "ឈ្មោះពេញ*" : "Full Name*"} name="fullName" value={profileData.fullName} onChange={handleChange} />
                <InputGroup label={lang === 'kh' ? "អ៊ីមែល*" : "Email Address*"} name="email" value={profileData.email} onChange={handleChange} />
                <InputGroup label={lang === 'kh' ? "លេខទូរស័ព្ទ" : "Phone Number"} name="phone" value={profileData.phone} onChange={handleChange} />
                <InputGroup label={lang === 'kh' ? "ប្រទេស" : "Country"} name="country" value={profileData.country} onChange={handleChange} />
                <InputGroup label={lang === 'kh' ? "ទីក្រុង" : "City"} name="city" value={profileData.city} onChange={handleChange} />
                <InputGroup label={lang === 'kh' ? "លេខកូដតំបន់" : "Zip Code"} name="zipCode" value={profileData.zipCode} onChange={handleChange} />

                <div className="md:col-span-2">
                  <InputGroup label={lang === 'kh' ? "អាសយដ្ឋាន*" : "Address*"} name="address" value={profileData.address} onChange={handleChange} />
                </div>
              </div>

              <Separator className="opacity-50" />

              <div className="bg-zinc-50 rounded-[35px] p-8 border border-zinc-100 relative overflow-hidden group">
                <Shield className="absolute top-[-20px] right-[-20px] opacity-[0.04] group-hover:scale-110 transition-transform duration-700" size={180} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-zinc-900" />
                    <h3 className=" uppercase text-[13px] tracking-widest text-zinc-900">
                      {lang === 'kh' ? 'គោលការណ៍ឯកជនភាព និងការគ្រប់គ្រងទិន្នន័យ' : 'Privacy Policy & Data Handling'}
                    </h3>
                  </div>
                  
                  <p className="text-[13px] text-zinc-500 leading-relaxed italic mb-6">
                    {lang === 'kh' 
                      ? 'យើងខ្ញុំយកចិត្តទុកដាក់បំផុតចំពោះការសម្ងាត់នៃទិន្នន័យរបស់អ្នក។ រាល់ព័ត៌មានផ្ទាល់ខ្លួនដែលអ្នកបានផ្តល់ឱ្យ នឹងត្រូវបានប្រើប្រាស់សម្រាប់តែការកែលម្អសេវាកម្ម និងការដឹកជញ្ជូនទំនិញតែប៉ុណ្ណោះ។' 
                      : 'We take your data privacy seriously. All personal information provided will only be used to improve our services and ensure secure delivery.'}
                  </p>
                  
                  <div className="flex items-center space-x-3 pt-2">
                    <Switch id="data-share" className="data-[state=checked]:bg-zinc-900" />
                    <Label htmlFor="data-share" className="text-[12px] text-zinc-400 uppercase tracking-tighter">
                      {lang === 'kh' 
                        ? 'អនុញ្ញាតឱ្យ ZWAY ចែករំលែកទិន្នន័យអនាមិកជាមួយដៃគូដើម្បីបទពិសោធន៍កាន់តែប្រសើរ' 
                        : 'Allow ZWAY to share anonymized data with partners for better experience'}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-[20px] px-14 py-8 uppercase text-[12px] font-black tracking-[0.2em] shadow-2xl active:scale-95 transition-all italic"
                >
                  {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : t("ធ្វើបច្ចុប្បន្នភាពគណនី", "Update Profile")}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* 2. Notifications Content */}
          <TabsContent value="notifications">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-zinc-900 rounded-2xl text-white -rotate-3 shadow-lg">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">
                      {t("ការជូនដំណឹង", "Alerts & Notifications")}
                    </h2>
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                      {t("កំណត់របៀបដែលអ្នកចង់ទទួលបានព័ត៌មាន", "Manage how you receive updates")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">
                  {t("បណ្តាញជូនដំណឹង", "Notification Channels")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SwitchRow 
                    icon={<Mail size={20} className="text-blue-500" />} 
                    label={t("អ៊ីមែល", "Email Notifications")} 
                    description={t("ផ្ញើទៅកាន់ប្រអប់សំបុត្ររបស់អ្នក", "Direct to your inbox")}
                    checked={notifications.email} 
                    onChange={(v) => setNotifications(p => ({...p, email: v}))} 
                  />
                  <SwitchRow 
                    icon={<Smartphone size={20} className="text-purple-500" />} 
                    label={t("ទូរស័ព្ទ", "Push Notifications")} 
                    description={t("លោតលើអេក្រង់ឧបករណ៍", "Device screen alerts")}
                    checked={notifications.push} 
                    onChange={(v) => setNotifications(p => ({...p, push: v}))} 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">
                  {t("ប្រភេទព័ត៌មាន", "Activity Preferences")}
                </h3>
                <div className="space-y-3">
                  <SwitchRow 
                    icon={<ShoppingBag size={20} className="text-emerald-500" />} 
                    label={t("ស្ថានភាពការបញ្ជាទិញ", "Order Status")} 
                    description={t("រាល់ការផ្លាស់ប្តូរស្ថានភាពទំនិញ", "Updates on your purchases and shipping")}
                    checked={notifications.orders} 
                    onChange={(v) => setNotifications(p => ({...p, orders: v}))} 
                  />
                  <SwitchRow 
                    icon={<Tag size={20} className="text-orange-500" />} 
                    label={t("ការផ្តល់ជូនពិសេស", "Promotions & Sales")} 
                    description={t("ដំណឹងបញ្ចុះតម្លៃ និងទំនិញថ្មីៗ", "Flash sales, coupons, and new arrivals")}
                    checked={notifications.promo} 
                    onChange={(v) => setNotifications(p => ({...p, promo: v}))} 
                  />
                  <SwitchRow 
                    icon={<ShieldCheck size={20} className="text-red-500" />} 
                    label={t("សុវត្ថិភាពគណនី", "Security Alerts")} 
                    description={t("រាល់ការចូលប្រើ ឬប្តូរលេខសម្ងាត់", "Login attempts and password changes")}
                    checked={notifications.security} 
                    onChange={(v) => setNotifications(p => ({...p, security: v}))} 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-50">
                <p className="text-[10px] font-bold text-zinc-400 italic text-center uppercase tracking-widest">
                  {t("* ការផ្លាស់ប្តូរនឹងត្រូវបានរក្សាទុកដោយស្វ័យប្រវត្តិ", "* Changes are saved automatically")}
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* 3. Security */}
          <TabsContent value="security" className="space-y-8">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10 bg-white">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white rotate-2 shadow-lg">
                  <Lock size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter">{t("សុវត្ថិភាព", "Security")}</h2>
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                    {t("ការពារគណនីរបស់អ្នក", "Secure your account access")}
                  </p>
                </div>
              </div>

              {/* ប្តូរលេខសម្ងាត់ */}
              <div className="space-y-6">
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">
                  {t("ប្តូរលេខសម្ងាត់", "Update Password")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroupSimple label={t("លេខសម្ងាត់ចាស់", "Current Password")} type="password" />
                  <InputGroupSimple label={t("លេខសម្ងាត់ថ្មី", "New Password")} type="password" />
                </div>
                <Button className="w-full bg-zinc-900 text-white py-7 rounded-2xl font-black uppercase tracking-widest italic shadow-xl hover:bg-zinc-800 transition-all active:scale-[0.98]">
                  {t("រក្សាទុកលេខសម្ងាត់ថ្មី", "Save New Password")}
                </Button>
              </div>

              <Separator className="opacity-50" />

              {/* Security Log / Device Activity */}
              <div className="space-y-6">
                <div className="flex justify-between items-end px-2">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    {t("ឧបករណ៍ដែលកំពុងប្រើ", "Recent Device Activity")}
                  </h3>
                  <button className="text-[10px] font-black uppercase text-red-500 hover:underline">
                    {t("ចេញពីគ្រប់ឧបករណ៍", "Logout all devices")}
                  </button>
                </div>

                <div className="space-y-3">
                  <DeviceLogItem 
                    device="iPhone 15 Pro" 
                    location="Phnom Penh, KH" 
                    time={t("កំពុងប្រើឥឡូវនេះ", "Active now")} 
                    isCurrent={true} 
                  />
                  <DeviceLogItem 
                    device="Chrome on Windows" 
                    location="Siem Reap, KH" 
                    time="2 hours ago" 
                    isCurrent={false} 
                  />
                  <DeviceLogItem 
                    device="Safari on MacBook Air" 
                    location="Phnom Penh, KH" 
                    time="Yesterday" 
                    isCurrent={false} 
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
          {/* 4. Appearance & Interface Content */}
          <TabsContent value="appearance">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10 bg-white">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white -rotate-2 shadow-lg">
                  <Palette size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter">{t("រូបរាង និងចំណុចប្រទាក់", "Interface Settings")}</h2>
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                    {t("កំណត់បទពិសោធន៍មើលឃើញរបស់អ្នក", "Customize your visual experience")}
                  </p>
                </div>
              </div>

              {/* 1. Language Selection */}
              <div className="space-y-4">
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">
                  {t("ភាសាប្រើប្រាស់", "System Language")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setLanguage("kh")}
                    className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all ${lang === 'kh' ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-50 bg-white hover:border-zinc-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇰🇭</span>
                      <span className="font-black uppercase text-[11px] tracking-widest">ភាសាខ្មែរ</span>
                    </div>
                    {lang === 'kh' && <div className="w-2 h-2 bg-zinc-900 rounded-full" />}
                  </button>

                  <button 
                    onClick={() => setLanguage("en")}
                    className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all ${lang === 'en' ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-50 bg-white hover:border-zinc-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇺🇸</span>
                      <span className="font-black uppercase text-[11px] tracking-widest">English (US)</span>
                    </div>
                    {lang === 'en' && <div className="w-2 h-2 bg-zinc-900 rounded-full" />}
                  </button>
                </div>
              </div>

              {/* 2. UI Density / Scale */}
              <div className="space-y-4">
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">
                  {t("ទំហំផ្ទៃកម្មវិធី", "Interface Scale")}
                </h3>
                <div className="p-6 bg-zinc-50 rounded-[30px] space-y-6">
                  <div className="flex justify-between text-[10px] font-black uppercase text-zinc-400 tracking-tighter">
                    <span>{t("តូច", "Small")}</span>
                    <span>{t("មធ្យម", "Default")}</span>
                    <span>{t("ធំ", "Large")}</span>
                  </div>
                  {/* អ្នកអាចប្រើ Slider component ពី Shadcn UI នៅទីនេះ */}
                  <input 
                    type="range" 
                    min="1" max="3" step="1" defaultValue="2"
                    className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                  />
                </div>
              </div>

              {/* 3. Motion & Animations */}
              <div className="pt-4">
                <SwitchRow 
                  icon={<Globe size={20} className="text-zinc-900" />} 
                  label={t("ចលនាអានីមេសិន", "Interface Animations")} 
                  description={t("បង្ហាញចលនាពេលប្តូរទំព័រ", "Smooth transitions between pages")}
                  checked={true} 
                  onChange={() => {}} 
                />
              </div>

              <div className="pt-4 border-t border-zinc-50">
                <p className="text-[10px] font-bold text-zinc-300 italic text-center uppercase tracking-widest leading-relaxed">
                  {t("ការផ្លាស់ប្តូររូបរាងនឹងជះឥទ្ធិពលលើឧបករណ៍នេះតែប៉ុណ្ណោះ", "Interface changes will only affect this device")}
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* 5. Billing */}
          <TabsContent value="billing">
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

// Reusable Components
function InputGroup({ label, name, value, onChange, type = "text" }: { label: string, name: string, value: string, onChange: (e: any) => void, type?: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">{label}</Label>
      <Input 
        name={name}
        type={type} 
        value={value}
        onChange={onChange}
        className="rounded-2xl border-zinc-100 py-7 font-bold text-lg bg-zinc-50 focus:bg-white transition-all shadow-inner italic" 
      />
    </div>
  );
}

function InputGroupSimple({ label, type = "text" }: { label: string, type?: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">{label}</Label>
      <Input 
        type={type} 
        className="rounded-2xl border-zinc-100 py-7 font-bold text-lg bg-zinc-50 focus:bg-white transition-all shadow-inner italic" 
      />
    </div>
  );
}

function SwitchRow({ icon, label, description, checked, onChange }: { icon: React.ReactNode, label: string, description?: string, checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-[28px] border border-transparent hover:border-zinc-200 hover:bg-white transition-all shadow-sm italic group">
      <div className="flex items-center gap-5">
        <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all">{icon}</div>
        <div>
          <p className="font-black uppercase text-[11px] tracking-widest text-zinc-900">{label}</p>
          {description && <p className="text-[10px] font-bold text-zinc-400 mt-0.5">{description}</p>}
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-zinc-900" />
    </div>
  );
}
function DeviceLogItem({ device, location, time, isCurrent }: { device: string, location: string, time: string, isCurrent: boolean }) {
  return (
    <div className="flex items-center justify-between p-5 bg-zinc-50 rounded-[24px] border border-transparent hover:border-zinc-200 transition-all group shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${isCurrent ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-400'}`}>
          <Smartphone size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-black uppercase text-[11px] tracking-tight">{device}</p>
            {isCurrent && (
              <span className="bg-emerald-500 w-1.5 h-1.5 rounded-full animate-pulse" />
            )}
          </div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
            {location} • {time}
          </p>
        </div>
      </div>
      {!isCurrent && (
        <button className="text-[10px] font-black uppercase text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
          Revoke
        </button>
      )}
    </div>
  );
}