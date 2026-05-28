'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Heart, BookOpen, ArrowLeft } from 'lucide-react';

interface PoemDisplayProps {
  partnerName: string;
  onNext: () => void;
  onBack?: () => void;
}

export default function PoemDisplay({ partnerName, onNext, onBack }: PoemDisplayProps) {
  const [peek, setPeek] = useState<{
    id: number;
    corner: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    imgSrc: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    let timer: NodeJS.Timeout;

    const scheduleNextPeek = () => {
      if (!active) return;
      const nextDelay = 3500 + Math.random() * 4500; // 3.5s to 8s
      
      timer = setTimeout(() => {
        if (!active) return;
        
        const corners: Array<'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'> = [
          'bottom-left', 'bottom-right', 'top-left', 'top-right'
        ];
        const randomCorner = corners[Math.floor(Math.random() * corners.length)];
        
        const snoopyImages = [
          '/images/snoopy_heart.png',
          '/images/snoopy_letter.png',
          '/images/snoopy_poem.png'
        ];
        const randomImg = snoopyImages[Math.floor(Math.random() * snoopyImages.length)];
        
        setPeek({
          id: Date.now(),
          corner: randomCorner,
          imgSrc: randomImg
        });

        // Show for 3 seconds, then hide and schedule next
        setTimeout(() => {
          if (!active) return;
          setPeek(null);
          scheduleNextPeek();
        }, 3000);

      }, nextDelay);
    };

    // Initial delay of 2.5 seconds before peek starts
    timer = setTimeout(() => {
      scheduleNextPeek();
    }, 2500);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const getPeekAnimation = (corner: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right') => {
    switch (corner) {
      case 'bottom-left':
        return {
          initial: { x: '-90%', y: '90%', rotate: 35, opacity: 0 },
          animate: { x: '-15%', y: '15%', rotate: 12, opacity: 1 },
          exit: { x: '-90%', y: '90%', rotate: 35, opacity: 0 }
        };
      case 'bottom-right':
        return {
          initial: { x: '90%', y: '90%', rotate: -35, opacity: 0 },
          animate: { x: '15%', y: '15%', rotate: -12, opacity: 1 },
          exit: { x: '90%', y: '90%', rotate: -35, opacity: 0 }
        };
      case 'top-left':
        return {
          initial: { x: '-90%', y: '-90%', rotate: 145, opacity: 0 },
          animate: { x: '-15%', y: '-15%', rotate: 168, opacity: 1 },
          exit: { x: '-90%', y: '-90%', rotate: 145, opacity: 0 }
        };
      case 'top-right':
        return {
          initial: { x: '90%', y: '-90%', rotate: -145, opacity: 0 },
          animate: { x: '15%', y: '-15%', rotate: -168, opacity: 1 },
          exit: { x: '90%', y: '-90%', rotate: -145, opacity: 0 }
        };
    }
  };

  const getPositionClass = (corner: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right') => {
    switch (corner) {
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
    }
  };
  const poemLines = [
    "Jika aku mencintaimu karena kamu baik, mungkin aku sudah tidak mencintaimu lagi saat pertama kali kau menyakitiku.",
    "",
    "Jika alasanku mencintaimu karna penasaran, mungkin aku sudah tidak mencintaimu lagi saat sudah tahu banyak tentangmu.",
    "",
    "Jika alasanku mencintaimu karna kepribadianmu, mungkin aku sudah tidak mencintaimu lagi saat sudah mengetahui sikapmu.",
    "",
    "Tapi aku mencintaimu karna itu kamu, semua kurang lebihmu."
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.7,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" as const } 
    }
  };

  return (
    <div id="poem-stage" className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 max-w-xl mx-auto relative">
      
      {/* Top action bar with back button */}
      <div className="w-full flex justify-between items-center mb-4 z-20">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-mono text-warm-muted hover:text-warm-ink bg-white/80 border border-warm-ink/20 px-3 py-1.5 rounded transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </button>
        )}
        <div className="text-[10px] font-mono text-warm-muted bg-[#FCFAF2] border border-warm-ink/15 px-2.5 py-1 rounded">
          Halaman 1 dari 3
        </div>
      </div>

      {/* Cartoon Graphic with clean minimalist frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full mb-6 bg-warm-card rounded border-2 border-warm-ink p-4 flex flex-col items-center relative"
      >
        <div className="absolute -top-3 left-4 bg-warm-ink text-white text-[10px] font-mono tracking-widest px-2.5 py-1 rounded">
          SNOOPY WRITING
        </div>

        {/* Snoopy retro speech bubble */}
        <div className="absolute top-8 right-6 bg-[#FCFAF2] border-2 border-warm-ink text-[11px] font-mono px-3 py-1.5 rounded-md shadow-sm z-20 rotate-6 p-0 pointer-events-none after:content-[''] after:absolute after:bottom-0 after:left-4 after:w-2 after:h-2 after:bg-[#FCFAF2] after:border-b-2 after:border-r-2 after:border-warm-ink after:rotate-45 after:translate-y-1">
          🐾 &ldquo;Dear Ghina...&rdquo;
        </div>
        
        <div className="w-full aspect-[4/3] rounded bg-white flex items-center justify-center relative border border-warm-ink/20 mt-2 overflow-hidden">
          <img 
            src="/images/snoopy_poem.png" 
            alt="Snoopy menulis puisi" 
            className="object-contain w-[80%] h-[80%] select-none animate-float-simple"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-warm-muted bg-warm-card px-2 py-0.5 rounded border border-warm-ink/20 flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 text-warm-rose fill-warm-rose" />
            <span>untukmu</span>
          </div>
        </div>
      </motion.div>

      {/* Love Letter/Poem Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full bg-white border-2 border-warm-ink rounded p-6 md:p-8 relative overflow-hidden"
      >
        {/* Muted line indicator representing notebook paper */}
        <div className="absolute top-0 left-6 bottom-0 w-[1.5px] bg-warm-rose/25"></div>

        <div className="pl-6 relative">
          <div className="mb-4 border-b border-warm-ink/10 pb-2 flex items-center justify-between">
            <h2 className="font-mono text-warm-ink font-bold text-sm md:text-base flex items-center gap-1.5 focus:outline-none">
              <BookOpen className="w-4 h-4 text-warm-rose" />
              <span>Surat Cinta</span>
            </h2>
            <div className="text-[10px] font-mono text-warm-muted">
              {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 font-mono text-warm-ink text-xs md:text-sm leading-relaxed"
          >
            {poemLines.map((line, index) => {
              if (line === '') {
                return <div key={`empty-${index}`} className="h-2"></div>;
              }
              return (
                <motion.p 
                  key={`line-${index}`} 
                  variants={lineVariants}
                  className="select-none"
                >
                  {line}
                </motion.p>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Romantic solid-colored buttons, zero raw generic gradients */}
      <motion.button
        id="go-to-polaroids-button"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        onClick={onNext}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-warm-rose hover:bg-warm-darkrose text-white font-mono tracking-wide rounded py-3 shadow-[0_3px_0_#3E342B] active:shadow-none hover:translate-y-[1px] active:translate-y-[3px] border-2 border-warm-ink transition-all text-sm cursor-pointer animate-pulse-heart"
      >
        <Camera className="w-4 h-4" />
        <span>LANJUT</span>
      </motion.button>
      
      {/* Simple Skip trigger without AI-like flow */}
      <motion.button 
        initial={{ opacity: 0.4 }}
        whileHover={{ opacity: 1 }}
        onClick={onNext}
        className="text-warm-muted hover:text-warm-darkrose transition-colors text-xs font-mono mt-3 cursor-pointer underline"
      >
        lewatkan puisi & buka album
      </motion.button>

      {/* Peeking Snoopy Overlay */}
      <AnimatePresence>
        {peek && (
          <motion.div
            key={peek.id}
            {...getPeekAnimation(peek.corner)}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed ${getPositionClass(peek.corner)} z-[99] pointer-events-none w-24 h-24 sm:w-32 sm:h-32 m-0 p-0`}
          >
            <div className="relative w-full h-full">
              <img
                src={peek.imgSrc}
                alt="Snoopy Mengintip"
                className="w-full h-full object-contain select-none"
                referrerPolicy="no-referrer"
              />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute top-1 left-1 bg-warm-rose text-white text-[8px] font-mono rounded-full px-1 py-0.5 shadow-sm border border-warm-ink/15"
              >
                👀
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
