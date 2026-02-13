"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/store/use-language';
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Fingerprint, 
  Bell, 
  Globe, 
  Eye, 
  ChevronRight, 
  ToggleRight, 
  ToggleLeft,
  ArrowUpRight
} from 'lucide-react';

export function SettingsPage() {
  const { lang } = useLanguage();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [isIncognito, setIsIncognito] = useState(false);

  const sections = [
    {
      title: lang === 'kh' ? 'សុវត្ថិភាពគណនី' : 'Security Vault',
      icon: <Lock size={18} />,
      items: [
        { 
          label: lang === 'kh' ? 'ការផ្ទៀងផ្ទាត់ ២ ជាន់ (2FA)' : 'Two-Factor Authentication', 
          desc: lang === 'kh' ? 'បន្ថែមស្រទាប់សុវត្ថិភាពខ្ពស់' : 'Add an extra layer of protection',
          isToggle: true,
          enabled: is2FAEnabled,
          onToggle: () => setIs2FAEnabled(!is2FAEnabled),
          icon: <Smartphone size={20} />
        },
        { 
          label: lang === 'kh' ? 'ការសម្គាល់ជីវមាត្រ' : 'Biometric Access', 
          desc: 'Touch ID / Face ID',
          isToggle: true,
          enabled: isBiometricEnabled,
          onToggle: () => setIsBiometricEnabled(!isBiometricEnabled),
          icon: <Fingerprint size={20} />
        }
      ]
    },
    {
      title: lang === 'kh' ? 'ការកំណត់ឯកជនភាព' : 'Privacy Control',
      icon: <Eye size={18} />,
      items: [
        { 
          label: lang === 'kh' ? 'របៀបមើលមិនឃើញ' : 'Incognito Browsing', 
          desc: lang === 'kh' ? 'លាក់ប្រវត្តិការមើលទំនិញ' : 'Hide your browsing activity',
          isToggle: true,
          enabled: isIncognito,
          onToggle: () => setIsIncognito(!isIncognito),
          icon: <ShieldCheck size={20} />
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Settings Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 italic">
          {lang === 'kh' ? 'ការកំណត់ប្រព័ន្ធ' : 'System Preferences'}
        </h2>
        <p className="text-zinc-400 text-xs font-medium tracking-widest uppercase">
          {lang === 'kh' ? 'គ្រប់គ្រងពិភព ZWAY របស់អ្នក' : 'Tailor your ZWAY experience'}
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-6">
            {/* Section Label */}
            <div className="flex items-center gap-3 px-2">
              <div className="p-2 bg-zinc-900 text-white rounded-lg shadow-lg shadow-zinc-200">
                {section.icon}
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900">
                {section.title}
              </h3>
            </div>

            {/* Section Cards */}
            <div className="bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden shadow-sm">
              {section.items.map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-8 transition-colors hover:bg-zinc-50/50 ${
                    i !== section.items.length - 1 ? 'border-b border-zinc-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className="text-zinc-400">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black uppercase tracking-widest text-zinc-900">{item.label}</p>
                      <p className="text-xs text-zinc-400 font-medium">{item.desc}</p>
                    </div>
                  </div>

                  {item.isToggle ? (
                    <button 
                      onClick={item.onToggle}
                      className={`transition-all duration-300 outline-none ${item.enabled ? 'text-zinc-900' : 'text-zinc-200'}`}
                    >
                      {item.enabled ? (
                        <ToggleRight size={48} strokeWidth={1} className="drop-shadow-sm" />
                      ) : (
                        <ToggleLeft size={48} strokeWidth={1} />
                      )}
                    </button>
                  ) : (
                    <ChevronRight size={18} className="text-zinc-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="pt-10 border-t border-zinc-100">
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="p-8 rounded-[2.5rem] bg-red-50/40 border border-red-100 flex items-center justify-between group cursor-pointer hover:bg-red-50 transition-all"
          >
            <div className="space-y-1">
              <p className="text-sm font-black uppercase tracking-widest text-red-600">
                {lang === 'kh' ? 'លុបគណនី' : 'Deactivate Account'}
              </p>
              <p className="text-[10px] text-red-400 font-medium italic">
                {lang === 'kh' ? 'លុបទិន្នន័យទាំងអស់ជាអចិន្ត្រៃយ៍' : 'Permanently remove all your data from our vault.'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white border border-red-100 flex items-center justify-center text-red-300 group-hover:text-red-600 group-hover:border-red-200 transition-all">
              <ArrowUpRight size={20} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}