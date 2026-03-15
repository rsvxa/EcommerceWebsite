"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../../lib/store/auth-store';
import { useLanguage } from '../../../lib/store/use-language';
import { toast } from 'sonner';
import { 
  Loader2, Eye, EyeOff, ArrowLeft, 
  Mail, Lock, User, CheckCircle 
} from 'lucide-react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type AuthMode = 'login' | 'signup' | 'forgot' | 'success';

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [emailForReset, setEmailForReset] = useState("");
  
  const { login, signup } = useAuthStore();
  const { lang } = useLanguage();

  const t = {
    title: {
      login: lang === 'kh' ? 'ចូលគណនី' : 'Welcome Back',
      signup: lang === 'kh' ? 'បង្កើតគណនី' : 'Create Account',
      forgot: lang === 'kh' ? 'ភ្លេចលេខសម្ងាត់' : 'Forgot Password',
      success: lang === 'kh' ? 'ពិនិត្យអ៊ីមែល' : 'Check Your Email'
    },
    label: {
      firstName: lang === 'kh' ? 'នាមត្រកូល' : 'First Name',
      lastName: lang === 'kh' ? 'នាមខ្លួន' : 'Last Name',
      email: lang === 'kh' ? 'អាសយដ្ឋានអ៊ីមែល' : 'Email Address',
      password: lang === 'kh' ? 'លេខសម្ងាត់' : 'Password',
      remember: lang === 'kh' ? 'ចងចាំខ្ញុំ' : 'Remember me',
      terms: lang === 'kh' ? 'ខ្ញុំយល់ព្រមតាមលក្ខខណ្ឌ' : 'I agree to the Terms & Privacy'
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string).trim().toLowerCase();
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const agree = formData.get('terms') === 'on';

    try {
      if (mode === 'login') {
        const checkRes = await fetch(`http://localhost:5000/api/customer?email=${email}`).catch(() => {
            throw new Error('SERVER_OFFLINE');
        });

        if (!checkRes.ok) throw new Error('FETCH_ERROR');
        
        const customers = await checkRes.json();        if (!customers || customers.length === 0) {
          throw new Error('EMAIL_NOT_IN_DB');
        }

        await login(email, password);
        localStorage.setItem('zway_user_email', email);
        toast.success(lang === 'kh' ? 'ចូលប្រើប្រាស់ជោគជ័យ' : 'Login successful');
        onOpenChange(false);
      } 
      
      else if (mode === 'signup') {
        if (!agree) {
          toast.error(lang === 'kh' ? 'សូមយល់ព្រមតាមលក្ខខណ្ឌ' : 'Please accept terms');
          setIsLoading(false);
          return;
        }

        const fullName = `${firstName} ${lastName}`;

        const response = await fetch('http://localhost:5000/api/customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: fullName, email, status: "Active" })
        }).catch(() => {
            throw new Error('SERVER_OFFLINE');
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'REGISTRATION_FAILED');
        }

        await signup(fullName, email, password);
        localStorage.setItem('zway_user_email', email);
        
        toast.success(lang === 'kh' ? 'ចុះឈ្មោះជោគជ័យ' : 'Account created successfully');
        onOpenChange(false);
      } 
      
      else if (mode === 'forgot') {
        setEmailForReset(email);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMode('success');
      }
    } catch (error: any) {
      console.error("Auth Error:", error.message);
      
      let errorMessage = lang === 'kh' ? 'មានបញ្ហាបច្ចេកទេស' : 'An error occurred';
      
      if (error.message === 'EMAIL_NOT_IN_DB') {
        errorMessage = lang === 'kh' ? 'រកមិនឃើញគណនីក្នុងប្រព័ន្ធឡើយ! សូមចុះឈ្មោះជាមុនសិន។' : 'Email not found in our records. Please sign up first.';
      } else if (error.message === 'SERVER_OFFLINE') {
        errorMessage = lang === 'kh' ? 'មិនអាចភ្ជាប់ទៅកាន់ម៉ាស៊ីនបម្រើ' : 'Cannot connect to server';
      } else if (error.message.includes('auth/email-already-in-use')) {
        errorMessage = lang === 'kh' ? 'អ៊ីមែលនេះមានរួចហើយ' : 'Email already exists';
      } else if (error.message.includes('auth/invalid-credential')) {
        errorMessage = lang === 'kh' ? 'អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ' : 'Invalid email or password';
      } else if (mode === 'login') {
        errorMessage = lang === 'kh' ? 'ការចូលប្រើប្រាស់ត្រូវបានបដិសេធ' : 'Access Denied';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 border-none bg-transparent shadow-none outline-none overflow-visible">
        <DialogTitle className="sr-only">{t.title[mode]}</DialogTitle>
        <DialogDescription className="sr-only">Authentication for ZWAY Fashion</DialogDescription>

        <motion.div 
          layout 
          className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden border border-zinc-100"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight italic uppercase">
                  {t.title[mode]}
                </h1>
                <p className="text-zinc-400 text-[10px] mt-2 font-bold uppercase tracking-[0.2em]">
                  {mode === 'login' ? 'Sign in to your vault' : 'Start your premium experience'}
                </p>
              </div>

              {mode === 'success' ? (
                <div className="text-center space-y-6 py-4">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <p className="text-zinc-600 text-sm leading-relaxed font-bold italic">
                    {lang === 'kh' ? 'យើងបានផ្ញើតំណភ្ជាប់ទៅកាន់' : "Instructions sent to"} <br/>
                    <span className="font-black text-zinc-900 text-lg">{emailForReset}</span>
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full rounded-2xl py-6 border-zinc-200 font-black uppercase tracking-widest text-[10px]" 
                    onClick={() => setMode('login')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> {lang === 'kh' ? 'ត្រឡប់ក្រោយ' : 'Back to Login'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === 'signup' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">{t.label.firstName}</Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                          <Input name="firstName" required className="pl-11 h-12 rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-black/5" />
                        </div>
                      </div>
                      <div className="space-y-1.5 text-left">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">{t.label.lastName}</Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                          <Input name="lastName" required className="pl-11 h-12 rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-black/5" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5 text-left">
                    <Label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">{t.label.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                      <Input name="email" type="email" required className="pl-11 h-12 rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-black/5" />
                    </div>
                  </div>

                  {mode !== 'forgot' && (
                    <div className="space-y-1.5 text-left">
                      <div className="flex justify-between items-center">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">{t.label.password}</Label>
                        {mode === 'login' && (
                          <button type="button" onClick={() => setMode('forgot')} className="text-[10px] font-black text-gray-400 uppercase hover:text-black transition-colors italic">
                            {lang === 'kh' ? 'ភ្លេចលេខសម្ងាត់?' : 'Forgot?'}
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                        <Input 
                          name="password" 
                          type={showPassword ? "text" : "password"} 
                          required 
                          className="pl-11 pr-11 h-12 rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-black/5" 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600">
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 px-1">
                    <Checkbox id="terms" name="terms" className="rounded-md border-zinc-200 data-[state=checked]:bg-black" />
                    <Label htmlFor="terms" className="text-[10px] font-bold text-zinc-500 cursor-pointer uppercase tracking-tighter italic">
                      {mode === 'login' ? t.label.remember : t.label.terms}
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-14 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg active:scale-95 flex items-center justify-center"
                  >
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Link')}
                  </Button>
                </form>
              )}

              <div className="mt-8 space-y-6">
                 <div className="relative">
                   <Separator className="bg-zinc-100" />
                   <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[9px] text-zinc-300 font-black uppercase tracking-[0.4em]">Connect</span>
                 </div>
                 <div className="flex justify-center gap-3">
                   {['google', 'facebook'].map((social) => (
                     <Button key={social} variant="outline" className="flex-1 h-12 rounded-xl border-zinc-100 gap-2 font-black text-[9px] uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-colors">
                       <img src={`https://www.svgrepo.com/show/${social === 'google' ? '475656/google-color' : '475647/facebook-color'}.svg`} className="w-4 h-4" alt={social} />
                       {social}
                     </Button>
                   ))}
                 </div>
                 <p className="text-center text-zinc-400 text-[10px] font-bold uppercase tracking-widest italic">
                   {mode === 'login' ? "New to ZWAY?" : "Already a member?"}
                   <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="ml-2 text-black font-black underline underline-offset-4 hover:opacity-70">
                     {mode === 'login' ? 'Create Account' : 'Sign In Now'}
                   </button>
                 </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}