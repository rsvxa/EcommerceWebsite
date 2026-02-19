"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Bell, Lock, Palette, CreditCard, Shield, 
  Mail, Smartphone, Loader2, MapPin, Phone, Globe
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
import { motion } from "framer-motion";

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

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    order: true
  });

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
            <TabsTrigger value="profile">{lang === 'kh' ? 'ឯកជនភាព' : 'Privatcy'}</TabsTrigger>
            <TabsTrigger value="notifications">{lang === 'kh' ? 'ការជូនដំណឹង' : 'Notifications'}</TabsTrigger>
            <TabsTrigger value="security">{lang === 'kh' ? 'សុវត្ថិភាព' : 'Security'}</TabsTrigger>
            <TabsTrigger value="appearance">{lang === 'kh' ? 'រូបរាង' : 'Appearance'}</TabsTrigger>
            <TabsTrigger value="billing">{lang === 'kh' ? 'ការបង់ប្រាក់' : 'Billing'}</TabsTrigger>
          </TabsList>

          {/* 1. Profile Content (Updated with Account Details Form) */}
          <TabsContent value="profile" className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-2xl shadow-zinc-100/50 space-y-8">
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

              {/* ផ្នែក Privacy Policy */}
              <div className="bg-zinc-50 rounded-[35px] p-8 border border-zinc-100 relative overflow-hidden group">
                <Shield className="absolute top-[-20px] right-[-20px] opacity-[0.04] group-hover:scale-110 transition-transform duration-700" size={180} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-zinc-900" />
                    <h3 className="font-black uppercase text-[11px] tracking-widest text-zinc-900">
                      {lang === 'kh' ? 'គោលការណ៍ឯកជនភាព និងការគ្រប់គ្រងទិន្នន័យ' : 'Privacy Policy & Data Handling'}
                    </h3>
                  </div>
                  
                  <p className="text-[13px] font-bold text-zinc-500 leading-relaxed italic mb-6">
                    {lang === 'kh' 
                      ? 'យើងខ្ញុំយកចិត្តទុកដាក់បំផុតចំពោះការសម្ងាត់នៃទិន្នន័យរបស់អ្នក។ រាល់ព័ត៌មានផ្ទាល់ខ្លួនដែលអ្នកបានផ្តល់ឱ្យ នឹងត្រូវបានប្រើប្រាស់សម្រាប់តែការកែលម្អសេវាកម្ម និងការដឹកជញ្ជូនទំនិញតែប៉ុណ្ណោះ។' 
                      : 'We take your data privacy seriously. All personal information provided will only be used to improve our services and ensure secure delivery.'}
                  </p>
                  
                  <div className="flex items-center space-x-3 pt-2">
                    <Switch id="data-share" className="data-[state=checked]:bg-zinc-900" />
                    <Label htmlFor="data-share" className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
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
            </div>
          </TabsContent>

          {/* 2. Notifications */}
          <TabsContent value="notifications">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white -rotate-3 shadow-lg">
                  <Bell size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">{t("ការជូនដំណឹង", "Alerts")}</h2>
              </div>
              <div className="space-y-2">
                <SwitchRow 
                  icon={<Mail size={20}/>} 
                  label={t("អ៊ីមែល", "Email Updates")} 
                  checked={notifications.email} 
                  onChange={(v) => setNotifications(p => ({...p, email: v}))} 
                />
                <SwitchRow 
                  icon={<Smartphone size={20}/>} 
                  label={t("ទូរស័ព្ទ", "Push Alerts")} 
                  checked={notifications.push} 
                  onChange={(v) => setNotifications(p => ({...p, push: v}))} 
                />
              </div>
            </Card>
          </TabsContent>

          {/* 3. Security */}
          <TabsContent value="security">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white rotate-2 shadow-lg">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">{t("សុវត្ថិភាព", "Security")}</h2>
              </div>
              <div className="space-y-6">
                <InputGroupSimple label={t("លេខសម្ងាត់ចាស់", "Current Password")} type="password" />
                <InputGroupSimple label={t("លេខសម្ងាត់ថ្មី", "New Password")} type="password" />
                <Button className="w-full bg-zinc-900 text-white py-7 rounded-2xl font-black uppercase tracking-widest italic shadow-xl hover:bg-zinc-800 transition-all">
                  {t("ប្តូរលេខសម្ងាត់", "Change Password")}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* 4. Appearance */}
          <TabsContent value="appearance">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-zinc-900 rounded-2xl text-white -rotate-2 shadow-lg">
                  <Palette size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">{t("រូបរាង និងភាសា", "Interface")}</h2>
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">{t("ជ្រើសរើសភាសា", "Select Language")}</Label>
                <Select value={lang} onValueChange={(v: "en" | "kh") => setLanguage(v)}>
                  <SelectTrigger className="rounded-2xl py-7 font-bold border-zinc-100 bg-zinc-50 shadow-inner italic">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl font-bold italic">
                    <SelectItem value="kh">ខ្មែរ (Khmer)</SelectItem>
                    <SelectItem value="en">English (US)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </TabsContent>

          {/* 5. Billing */}
          <TabsContent value="billing">
            <Card className="p-8 border-none shadow-2xl shadow-zinc-100 rounded-[40px] space-y-10">
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

// ១. Reusable InputGroup សម្រាប់ Form លម្អិត (ប្រើ name ជំនួស id)
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

// ២. Reusable Input ធម្មតាសម្រាប់ Security Tab
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

function SwitchRow({ icon, label, checked, onChange }: { icon: React.ReactNode, label: string, checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-[24px] border border-transparent hover:border-zinc-200 transition-all mb-4 shadow-sm italic">
      <div className="flex items-center gap-5">
        <div className="p-2 bg-white rounded-xl shadow-sm">{icon}</div>
        <p className="font-black uppercase text-[11px] tracking-widest">{label}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-zinc-900" />
    </div>
  );
}