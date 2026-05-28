/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RefreshCw, ArrowLeft, Heart } from 'lucide-react';

interface BouquetBuilderProps {
  partnerName: string;
  onBack?: () => void;
  onReset?: () => void;
}

export default function BouquetBuilder({ partnerName, onBack, onReset }: BouquetBuilderProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    tx: number;
    ty: number;
    color: string;
    size: number;
    shape: 'circle' | 'square' | 'heart' | 'star';
    rotate: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate 35 festive particles on mount and set them in a deferred timer
    // to strictly prevent synchronous setState updates in the React render flow.
    const colors = [
      '#DE8D8C', // warm rose
      '#CE736F', // deeper rose
      '#7F9F72', // soft foliage green
      '#DCAE1D', // yellow gold
      '#B6ABCC', // lavender purple
      '#EBB097', // peach
      '#F4A261', // soft orange
      '#E76F51', // coral
    ];
    
    const shapes: Array<'circle' | 'square' | 'heart' | 'star'> = ['circle', 'square', 'heart', 'star'];
    
    const generated = Array.from({ length: 35 }).map((_, i) => {
      // Random angle from -30deg to -150deg (pointing upwards)
      const angle = -Math.PI / 6 - Math.random() * (Math.PI * 2 / 3); 
      // Dispersion distance
      const distance = 120 + Math.random() * 260;
      
      return {
        id: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance - 80, // Target elevation (negative is up)
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 7 + Math.random() * 10,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotate: 180 + Math.random() * 360,
        delay: Math.random() * 0.15, // slight delay stagger for explosion feel
        duration: 2.4 + Math.random() * 1.4,
      };
    });

    const timer = setTimeout(() => {
      setParticles(generated);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="bouquet-builder-stage" className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-6 max-w-xl mx-auto relative">
      
      {/* Dynamic Framer Motion Confetti Explosion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        {particles.map((p) => {
          let particleElement;
          if (p.shape === 'circle') {
            particleElement = (
              <div 
                className="rounded-full w-full h-full" 
                style={{ backgroundColor: p.color }} 
              />
            );
          } else if (p.shape === 'square') {
            particleElement = (
              <div 
                className="w-full h-full rotate-12" 
                style={{ backgroundColor: p.color }} 
              />
            );
          } else if (p.shape === 'heart') {
            particleElement = (
              <span className="text-xl leading-none select-none" style={{ color: p.color }}>
                ♥
              </span>
            );
          } else {
            particleElement = (
              <span className="text-lg leading-none select-none" style={{ color: p.color }}>
                ★
              </span>
            );
          }

          return (
            <motion.div
              key={p.id}
              initial={{ 
                x: 0, 
                y: 50, 
                scale: 0, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                x: p.tx, 
                // Creating a beautiful gravity path using keyframes (flies up first, then falls down further)
                y: [50, p.ty * 1.1, p.ty, p.ty + 250], 
                scale: [0, 1.3, 1.1, 0.5],
                rotate: [0, p.rotate / 2, p.rotate, p.rotate * 2.5],
                opacity: [1, 1, 0.9, 0] 
              }}
              transition={{ 
                duration: p.duration,
                delay: p.delay,
                ease: [0.1, 0.8, 0.3, 1] // swift explosion then soft ease
              }}
              className="absolute"
              style={{
                left: '50%',
                top: '40%',
                width: p.size,
                height: p.size,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {particleElement}
            </motion.div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="w-full flex justify-between items-center mb-6 z-20">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono text-warm-muted hover:text-warm-ink bg-white border border-warm-ink/20 px-3.5 py-2 rounded transition-all cursor-pointer shadow-sm active:translate-y-[1px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </button>
        )}
        <div className="text-[10px] font-mono text-warm-muted bg-[#FCFAF2] border border-warm-ink/15 px-2.5 py-1.5 rounded">
          Halaman Akhir 🌸
        </div>
      </div>

      {/* Floating retro hearts or leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 5 }).map((_, i) => {
          const left = (i * 19) % 100;
          const top = (i * 17) % 80;
          const delay = (i * 0.4) % 3;
          const duration = 4.5 + (i * 0.5) % 4;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: [0, 0.7, 0], y: [0, 80], scale: [0.8, 1.1, 0.8] }}
              transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
              className="absolute text-sm font-sans text-warm-rose/60"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              ♥
            </motion.div>
          );
        })}
      </div>

      {/* Love Certificate Card containing Snoopy Presenting Bouquet */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white border-2 border-warm-ink rounded-lg p-5 sm:p-7 relative overflow-hidden shadow-sm z-20"
      >
        <div className="border border-warm-ink/15 p-4 sm:p-5 rounded-md flex flex-col items-center text-center relative">
          
          {/* Main Visual Display */}
          <div className="relative w-full max-w-sm aspect-[4/3] bg-warm-bg rounded-lg border-2 border-warm-ink/20 flex items-center justify-center p-2 shadow-xs mb-6 group overflow-visible">
            
            {/* Real-time Hand-drawn Speech Bubble animated nicely */}
            <motion.div 
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 120 }}
              className="absolute -top-7 sm:-top-8 left-[10%] sm:left-[15%] bg-white border-2 border-warm-ink px-3 py-1.5 rounded-lg shadow-sm z-30 font-mono text-[11px] sm:text-xs text-warm-ink font-bold rotate-[-4deg] after:content-[''] after:absolute after:bottom-[-8px] after:left-5 after:w-3 after:h-3 after:bg-white after:border-b-2 after:border-r-2 after:border-warm-ink after:rotate-45"
            >
              🐾 &ldquo;untuk abuy! 💖&rdquo;
            </motion.div>

            <img 
              src="/images/snoopy_abuy_bouquet.png" 
              alt="Snoopy membawa buket cantik untuk Abuy" 
              className="object-contain w-full h-full select-none rounded duration-500 transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#CE736F] font-bold uppercase">
            Surat Istimewa dari Aghna
          </span>

          <div className="w-16 h-[2px] bg-warm-rose/30 my-3 rounded-full"></div>

          <p className="text-warm-muted text-[10px] sm:text-xs font-mono italic">
            Ditulis sepenuh hati untuk Abuy:
          </p>

          {/* Recipient name display */}
          <h1 className="font-mono text-2xl sm:text-3xl font-bold text-warm-ink tracking-tight my-2 border-b-2 border-warm-rose pb-1.5 px-3 max-w-full truncate">
            {partnerName} 💖
          </h1>

          {/* Direct warm romance message */}
          <p className="font-mono text-warm-muted text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-4 select-none whitespace-pre-line text-justify">
            {`“Buy, you're really the best part of my life. Ever since I met you, everything feels different. I never thought I could fall in love w someone this deeply. Every day feels more meaningful bcs of u.

From the first time we talk, something in my heart just felt like you were someone special. You always know how to make me feel happy, even on my worst days. Thank you for accepting me for who I am and always being there for me.

I love you more than words can explain, honestly. And I truly hope this feeling never changes.”`}
          </p>

          {/* Signatures */}
          <div className="flex justify-between items-center w-full max-w-xs mt-4 border-t border-warm-ink/10 pt-4 text-warm-muted font-mono text-[10px] sm:text-xs">
            <div className="flex flex-col items-center">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-warm-muted/70">Pengirim</span>
              <span className="text-warm-ink font-bold mt-1">Aghna</span>
            </div>
            
            <Heart className="w-4 h-4 text-warm-rose animate-pulse fill-warm-rose" />

            <div className="flex flex-col items-center">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#CE736F]">Penerima</span>
              <span className="text-warm-ink font-bold mt-1">Ghina</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Button */}
      <div className="mt-6 w-full max-w-xs px-2 z-20">
        <button
          onClick={() => {
            if (onReset) {
              onReset();
            } else if (onBack) {
              onBack();
              onBack();
              onBack(); // Reset all the way to stage 0
            } else {
              window.location.reload();
            }
          }}
          className="w-full flex items-center justify-center gap-2 bg-warm-rose hover:bg-warm-darkrose text-white font-mono font-bold py-3 px-6 rounded shadow-[0_3px_0_#3E342B] active:shadow-none hover:translate-y-[1px] active:translate-y-[3.5px] border-2 border-[#3E342B] transition-all text-xs cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-white animate-spin-slow" />
          <span>MULAI DARI AWAL 🌸</span>
        </button>
      </div>
    </div>
  );
}
