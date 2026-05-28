'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import SnoopyMusic from '../components/SnoopyMusic';
import RomanticEnvelope from '../components/RomanticEnvelope';
import PoemDisplay from '../components/PoemDisplay';
import MemoryPolaroids from '../components/MemoryPolaroids';
import BouquetBuilder from '../components/BouquetBuilder';

type StageType = 0 | 1 | 2 | 3;

export default function Home() {
  const [stage, setStage] = useState<StageType>(0);
  const [partnerName, setPartnerName] = useState('Ghina Ayundia');
  const [showOpening, setShowOpening] = useState(true);

  return (
    <main className="relative min-h-screen pb-12 pt-6 overflow-x-hidden flex flex-col justify-between vintage-paper-texture text-warm-ink">
      
      {/* Background audio controller (Automatic silent playback on interaction) */}
      <SnoopyMusic />

      {/* Elegant organic backdrop illustrations: paws & flowers texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-45 sm:opacity-55">
        
        {/* Footprint Paw and Small Flower textures spread gracefully */}
        {[
          { char: '♥', x: '5%', y: '12%', s: 1.25, d: 0, r: 8, col: 'text-[#DE8D8C]/70' },
          { char: '✿', x: '88%', y: '8%', s: 1.35, d: 1.5, r: -20, col: 'text-[#DE8D8C]/75' },
          { char: '🐾', x: '12%', y: '35%', s: 1.5, d: 2, r: 15, col: 'text-[#3E342B]/35' },
          { char: '✿', x: '82%', y: '42%', s: 1.2, d: 0.5, r: 12, col: 'text-[#EEC973]/70' },
          { char: '♥', x: '91%', y: '65%', s: 1.55, d: 3, r: -10, col: 'text-[#CE736F]/65' },
          { char: '🐾', x: '7%', y: '72%', s: 1.4, d: 1, r: -25, col: 'text-[#3E342B]/35' },
          { char: '✿', x: '18%', y: '82%', s: 1.3, d: 2.5, r: 35, col: 'text-[#DE8D8C]/70' },
          { char: '✦', x: '84%', y: '85%', s: 1.15, d: 4, r: -15, col: 'text-[#EEC973]/75' },
          { char: '🐾', x: '45%', y: '92%', s: 1.35, d: 1.8, r: 5, col: 'text-[#3E342B]/25' }
        ].map((p, i) => (
          <motion.div
            key={i}
            className={`absolute font-mono text-2xl md:text-3xl ${p.col}`}
            style={{ left: p.x, top: p.y }}
            animate={{
              y: [0, -10, 0],
              rotate: [p.r, p.r + 8, p.r],
              scale: [p.s, p.s * 1.05, p.s]
            }}
            transition={{
              duration: 6 + (i % 3) * 1.5,
              repeat: Infinity,
              delay: p.d,
              ease: "easeInOut"
            }}
          >
            {p.char}
          </motion.div>
        ))}
      </div>

      {/* Interactive Active Stage Switcher */}
      <div className="flex-1 w-full relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <RomanticEnvelope 
                onOpen={(name) => {
                  setPartnerName(name);
                  setStage(1);
                }} 
              />
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <PoemDisplay 
                partnerName={partnerName} 
                onNext={() => setStage(2)} 
                onBack={() => setStage(0)}
              />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <MemoryPolaroids 
                partnerName={partnerName} 
                onNext={() => setStage(3)} 
                onBack={() => setStage(1)}
              />
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <BouquetBuilder 
                partnerName={partnerName} 
                onBack={() => setStage(2)}
                onReset={() => {
                  setStage(0);
                  // Optionally restart at stage 0, or reload to show opening screen if user prefers.
                  // Setting stage to 0 is perfect as it starts from the first romantic envelope page.
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative footer */}
      <footer className="w-full text-center py-4 text-[9px] font-mono uppercase tracking-widest text-warm-muted/40 z-10 relative select-none">
        murni dari hati - aghna
      </footer>

      {/* Elegant Warning & screen recording prompt on entry */}
      <AnimatePresence>
        {showOpening && (
          <motion.div
            key="opening-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#FCFAF2] z-[999] flex flex-col items-center justify-center p-6 text-center select-none"
          >
            {/* Elegant warm paper layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-md w-full bg-white border-2 border-warm-ink rounded-xl p-6 sm:p-8 shadow-sm flex flex-col items-center relative"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="w-16 h-16 bg-warm-rose/10 rounded-full flex items-center justify-center text-warm-rose text-3xl mb-6 border border-warm-rose/20 shadow-xs"
              >
                ❤️
              </motion.div>

              <span className="font-mono text-[9px] tracking-widest text-[#CE736F] font-bold uppercase bg-[#FCFAF2] px-3 py-1.5 rounded border border-warm-ink/15 mb-3">
                Pemberitahuan Penting 🎥
              </span>

              <h2 className="font-mono text-lg sm:text-xl text-warm-ink font-semibold tracking-tight leading-snug">
                {"Screen record dulu ya buyy <3"}
              </h2>

              <div className="w-12 h-[2px] bg-warm-rose/30 my-4 rounded-full"></div>

              <motion.button
                onClick={() => {
                  setShowOpening(false);
                  if (typeof (window as any).playSnoopyMusic === 'function') {
                    (window as any).playSnoopyMusic();
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-warm-rose hover:bg-warm-darkrose text-white font-mono font-bold py-3 px-5 rounded-md shadow-[0_3px_0_#3E342B] active:shadow-none hover:translate-y-[1px] active:translate-y-[3px] border-2 border-[#3E342B] transition-all text-[11px] cursor-pointer"
              >
                <span>UDAH AKU REKAMM</span>
              </motion.button>

              <p className="text-[10px] font-mono text-warm-muted/75 text-center mt-3 max-w-xs leading-normal">
                ⚠️ Pastikan HP tidak dlm mode hening (silent) & volume sudah dinaikkan yaa!
              </p>

              <span className="text-[8px] font-mono text-warm-muted/50 mt-4 uppercase tracking-widest">
                murni dari hati - aghna
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  
  );
}
