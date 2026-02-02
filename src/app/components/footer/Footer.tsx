import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brand Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tighter uppercase">ZWAY Fashion</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We bring you premium clothing and accessories to enhance your beauty and confidence in every occasion.
            </p>
            <div className="flex gap-4">
              <Facebook className="cursor-pointer hover:text-blue-500 transition-colors" size={20} />
              <Instagram className="cursor-pointer hover:text-pink-500 transition-colors" size={20} />
              <Twitter className="cursor-pointer hover:text-blue-400 transition-colors" size={20} />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">New Arrivals</li>
              <li className="hover:text-white cursor-pointer transition-colors">Popular Products</li>
              <li className="hover:text-white cursor-pointer transition-colors">Fashion Blog</li>
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
            </ul>
          </div>

          {/* 3. Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-widest">Customer Care</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Shipping Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Return & Exchange</li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Support</li>
            </ul>
          </div>

          {/* 4. Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-500" />
                Phnom Penh, Cambodia
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gray-500" />
                +855 12 345 678
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gray-500" />
                info@zwayfashion.com
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-xs">
          <p>© 2026 ZWAY Fashion Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}