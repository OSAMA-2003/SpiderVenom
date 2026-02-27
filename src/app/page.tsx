"use client";

import  { useState } from 'react';
import { Shuffle, Moon, Globe, User } from 'lucide-react';
import { Anton } from 'next/font/google';
import BlobCursor from '../components/BlobCursor';

import SpiderDrop from '../components/SpiderDrob';


const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
});

const CONTENT = {
  spiderman: { bg: "/spiderman.webp", titleColor: "text-[#E62429]", logoCard: "/movieposter.avif" },
  venom: { bg: "/venom.webp", titleColor: "text-black", logoCard: "/movieposter.avif" }
};

export default function HeroSection() {
  const [theme, setTheme] = useState<'spiderman' | 'venom'>('spiderman');

  const current = CONTENT[theme];
  const hiddenTheme = theme === 'spiderman' ? 'venom' : 'spiderman';
  const hiddenBg = CONTENT[hiddenTheme].bg;

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${anton.className} bg-black`}>

      {/* BASE BACKGROUNDS */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'spiderman' ? 'opacity-100' : 'opacity-0'}`}>
        <img src={CONTENT.spiderman.bg} alt="Spider-Man" className="w-full h-full object-cover" />
      </div>
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'venom' ? 'opacity-100' : 'opacity-0'}`}>
        <img src={CONTENT.venom.bg} alt="Venom" className="w-full h-full object-cover" />
      </div>

      {/* THE CURSOR COMPONENT */}
      <BlobCursor hiddenBg={hiddenBg} />

      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full p-6 px-8 flex justify-between items-center z-30">
        <div className="w-34">
          <img src='/marvel.avif' alt="Marvel" />
        </div>
        <div className="text-black flex items-center gap-6 px-3 py-3 rounded-full shadow-lg border border-gray-200/20 backdrop-blur-sm bg-white/20">
          <button onClick={() => setTheme(p => p === 'spiderman' ? 'venom' : 'spiderman')} className="hover:text-red-500 cursor-pointer transition">
            <Shuffle size={22} />
          </button>

        </div>
      </header>

      {/* MAIN TEXT CONTENT */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center px-5 pointer-events-none">
        <div className="pointer-events-auto max-w-2xl space-y-4">
          <div className={`flex flex-col leading-[0.8] tracking-tighter ${current.titleColor} transition-colors duration-500 drop-shadow-2xl`}>
            <span className="text-8xl uppercase">The</span>
            <span className="text-9xl uppercase">Rivalry</span>
          </div>
          <div className="flex gap-4 mt-8 max-w-md mix-blend-difference">
            <div className="w-1 bg-[#E62429] h-auto"></div>
            <p className="font-sans capitalize text-md font-medium leading-relaxed text-gray-500">
              Spider-Man and Venom is one of the most iconic in comic book history, characterized by intense battles, complex character dynamics            </p>
          </div>
        </div>
      </div>

      {/* FLOATING CARD */}
      <div className="absolute bottom-8 right-8 z-30 md:right-16 md:bottom-16">
        <div className="w-40 md:w-75 h-40 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full flex items-center justify-center relative">
            <img src={current.logoCard} alt="Logo Card" className="object-contain" />
          </div>
        </div>
      </div>
      
      {/* SPIDER DROP */}
      <SpiderDrop/>

    </div>
  );
}