"use client";

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface BlobCursorProps {
  hiddenBg: string;
}

const BLOB_SIZE = 350;

export default function BlobCursor({ hiddenBg }: BlobCursorProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 4, stiffness: 100, mass: 0.3 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const negativeX = useTransform(springX, (x) => -x);
  const negativeY = useTransform(springY, (y) => -y);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - BLOB_SIZE / 2);
      mouseY.set(e.clientY - BLOB_SIZE / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 z-10 pointer-events-none" style={{ filter: 'url(#goo)' }}>
        <motion.div
          style={{ x: springX, y: springY, width: BLOB_SIZE, height: BLOB_SIZE }}
          className="slime-blob absolute top-0 left-0 overflow-hidden"
        >
          <motion.div 
            className="w-[100vw] h-[100vh] absolute top-0 left-0 scale-105"
            style={{
              x: negativeX,
              y: negativeY,
              backgroundImage: `url(${hiddenBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob-morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 45% 55% 50% 50% / 55% 45% 60% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          75% { border-radius: 70% 30% 50% 50% / 30% 70% 40% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        .slime-blob {
          animation: blob-morph 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}