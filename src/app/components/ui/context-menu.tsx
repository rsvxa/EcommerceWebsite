"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator"; // បើមិនទាន់មាន អាចប្រើ <div className="h-[1px] bg-gray-200 w-full" />
import { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { toast } from "sonner";
import { Chrome, Facebook } from "lucide-react"; // ប្រើ Icon ពី lucide-react

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login({ id: "1", name: "User Test", email });
      toast.success("ចូលប្រើប្រាស់បានជោគជ័យ!");
      onOpenChange(false);
    } else {
      toast.error("សូមបំពេញព័ត៌មានឱ្យបានគ្រប់គ្រាន់");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] border-none shadow-2xl p-8">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-center">ស្វាគមន៍មកកាន់ ZWAY</DialogTitle>
          <DialogDescription className="text-center">
            សូមជ្រើសរើសវិធីសាស្ត្រចូលប្រើប្រាស់របស់អ្នក
          </DialogDescription>
        </DialogHeader>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline" className="flex items-center gap-2 py-6 border-gray-200 hover:bg-gray-50">
            <Chrome className="h-5 w-5 text-red-500" />
            <span className="text-xs font-semibold">Google</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 py-6 border-gray-200 hover:bg-gray-50">
            <Facebook className="h-5 w-5 text-blue-600" />
            <span className="text-xs font-semibold">Facebook</span>
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">ឬ បន្តជាមួយ Email</span>
          </div>
        </div>

        {/* Traditional Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="email" 
              placeholder="អាសយដ្ឋាន Email" 
              className="h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="លេខសម្ងាត់" 
              className="h-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <Button type="submit" className="w-full h-11 bg-black text-white hover:bg-zinc-800 transition-all font-semibold">
            ចូលប្រើប្រាស់
          </Button>

          <p className="text-center text-sm text-gray-500">
            មិនទាន់មានគណនី?{" "}
            <button type="button" className="text-black font-bold hover:underline">
              ចុះឈ្មោះឥឡូវនេះ
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}