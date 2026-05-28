'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Heart } from 'lucide-react';

interface RomanticEnvelopeProps {
  onOpen: (name: string) => void;
}

export default function RomanticEnvelope({ onOpen }: RomanticEnvelopeProps) {
  const [partnerName] = useState('Ghina Ayundia');
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen(partnerName);
    }, 1100);
  };

  return (
    <div id="envelope-stage" className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 max-w-lg mx-auto">
      {/* Muted warm tag with a sweet Woodstock touch */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 relative"
      >
        <span className="font-mono text-xs tracking-widest text-[#CE736F] font-bold bg-[#FCFAF2] px-3.5 py-1.5 rounded-md border-2 border-warm-ink/20">
          SURAT SPESIAL UNTUK GHINA AYUNDIA
        </span>
        <h1 className="font-mono text-2xl md:text-3xl mt-5 font-normal text-warm-ink tracking-tight">
          Sepucuk surat dari insan yang menaruh rasa cinta di hatinya.
        </h1>
        <p className="text-warm-muted text-xs md:text-sm mt-2 max-w-sm mx-auto font-mono leading-relaxed">
          Snoopy telah kembali dari perjalanannya membawa sepucuk surat kecil yang ditulis khusus untukmu hari ini.
        </p>
      </motion.div>

      {/* Main Envelope visual with simple borders, no generic AI styling */}
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {/* Playful bubble chatter from Woodstock next to the envelope */}
        <div className="absolute -top-12 -right-4 bg-[#FCFAF2] border-2 border-warm-ink px-2.5 py-1 rounded text-[10px] font-mono p-0 pointer-events-none z-20 rotate-6 shadow-sm flex items-center gap-1">
          <span>🐣 chirp-chirp!</span>
        </div>

        <motion.div
          animate={isOpening ? { scale: 0.96, opacity: 0.7, y: -20 } : { y: [0, -4, 0] }}
          transition={isOpening ? { duration: 0.6 } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative bg-[#FCFAF2] p-5 pb-7 rounded-lg border-2 border-warm-ink/85 flex flex-col items-center z-10 w-full mb-6 select-none"
        >
          {/* Simple paper tape topper */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#CE736F]/25 border-x-2 border-dashed border-warm-ink/40"></div>
          
          <div className="w-full aspect-[4/3] rounded bg-white border-2 border-[#3E342B]/30 flex items-center justify-center relative mb-5 overflow-hidden">
            <img 
              src="/images/snoopy_letter.png" 
              alt="Snoopy dengan surat cinta" 
              className="object-contain w-[72%] h-[72%] animate-float-simple"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="w-full flex flex-col items-center gap-4 text-center">
            {/* Custom static vintage name plate instead of input */}
            <div className="w-full bg-[#FAF6EE] border-2 border-dashed border-[#D98A86]/60 rounded py-2.5 px-4 mb-1">
              <span className="text-[10px] font-mono tracking-widest text-[#D98A86] block uppercase font-bold">Penerima Istimewa</span>
              <span className="font-mono text-base md:text-lg font-bold text-warm-ink">
                Ghina Ayundia 💖
              </span>
            </div>

            <motion.button
              id="open-letter-button-direct"
              onClick={handleOpen}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isOpening}
              className="w-full flex items-center justify-center gap-2 bg-warm-rose hover:bg-warm-darkrose text-white font-mono tracking-wide rounded py-3 shadow-[0_3px_0_#3E342B] active:shadow-none hover:translate-y-[1px] active:translate-y-[3px] border-2 border-warm-ink transition-all text-sm cursor-pointer"
            >
              {isOpening ? (
                <>
                  <Heart className="w-4 h-4 animate-pulse text-white fill-current" />
                  <span>MEMBUKA SURAT...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-white" />
                  <span>BUKA SURAT SEKARANG</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
