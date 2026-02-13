"use client";

import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  // Reset state ពេល src ប្តូរ
  useEffect(() => {
    setIsLoaded(false);
    setDidError(false);
  }, [src]);

  const handleError = () => {
    setDidError(true);
    setIsLoaded(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className={`relative overflow-hidden bg-zinc-100 ${className ?? ''}`} 
      style={style}
    >
      {/* 1. Loading Skeleton: បង្ហាញពន្លឺរត់កាត់ពេលកំពុង Load */}
      {!isLoaded && !didError && (
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full bg-zinc-200 animate-pulse flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      )}

      {/* 2. Error State: បង្ហាញពេលរូបភាពដាច់ */}
      {didError ? (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[100px] gap-2 p-4">
          <div className="relative">
            <img 
              src={ERROR_IMG_SRC} 
              alt="Error" 
              className="w-12 h-12 opacity-20 grayscale"
            />
            <ImageOff className="absolute inset-0 m-auto text-zinc-400 opacity-40" size={16} />
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-300">
            Image Unavailable
          </span>
        </div>
      ) : (
        /* 3. Normal State: រូបភាពដើម */
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          {...rest}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}