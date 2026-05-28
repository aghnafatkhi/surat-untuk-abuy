/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RefreshCw, Upload, ArrowRight, ArrowLeft } from 'lucide-react';

interface MemoryPolaroidsProps {
  partnerName: string;
  onNext: () => void;
  onBack?: () => void;
}

interface PolaroidCard {
  id: number;
  defaultImage: string;
  userImage?: string | null;
  caption: string;
  captionBack: string;
  tilt: number;
}

export default function MemoryPolaroids({ partnerName, onNext, onBack }: MemoryPolaroidsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [cards, setCards] = useState<PolaroidCard[]>([
    {
      id: 1,
      defaultImage: 'https://i.postimg.cc/wMvh4ctx/IMG-20251120-WA0078.jpg',
      caption: 'At the end of the day, her smile is still my favorite thing.',
      captionBack: 'KAMU MANIS BANGET BUYYY, lov u always ya cantik <333',
      tilt: -4,
    },
    {
      id: 2,
      defaultImage: 'https://i.postimg.cc/d318Nm7d/IMG-20260217-WA0149.jpg', 
      caption: 'I could watch moments like this forever.',
      captionBack: 'Mam yang banyak ya sayanggg. Jangan mam sembarangan lg yyYyy.',
      tilt: 3,
    },
    {
      id: 3,
      defaultImage: 'https://i.postimg.cc/qRQsGZ74/IMG-20260421-WA0150.jpg',
      caption: 'Some memories deserve to stay forever.',
      captionBack: 'INI LUCU BANGET TAUUU. Waktu itu aku ngeliatin foto ini sampe 100 kali. LOV U BUYY',
      tilt: -2,
    },
    {
      id: 4,
      defaultImage: 'https://i.postimg.cc/FzRjCgf0/IMG-20260523-WA0020(1).jpg', 
      caption: 'Somehow she makes everything look adorable.',
      captionBack: 'LUCU BANGET BUY YAAMPUNNN. Gemesssss buanget. AHHASHHSSD',
      tilt: 5,
    }
  ]);

  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const [dragged, setDragged] = useState(false);

  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [dragOverCardId, setDragOverCardId] = useState<number | null>(null);

  const handleFileChange = (cardId: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setCards(prev => 
          prev.map(c => c.id === cardId ? { ...c, userImage: e.target!.result as string } : c)
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent, cardId: number) => {
    e.preventDefault();
    setDragOverCardId(cardId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverCardId(null);
  };

  const handleDrop = (e: React.DragEvent, cardId: number) => {
    e.preventDefault();
    setDragOverCardId(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(cardId, e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = (cardId: number) => {
    fileInputRefs.current[cardId]?.click();
  };

  const handleCardClick = (id: number) => {
    if (dragged) return;
    setFlippedCardId(prev => prev === id ? null : id);
  };

  return (
    <div id="polaroids-stage" className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-4xl mx-auto overflow-hidden relative">
      
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
          Halaman 2 dari 3
        </div>
      </div>

      {/* Title Header with clean muted font */}
      <div className="text-center mb-6 max-w-xl">
        <span className="font-mono text-xs tracking-widest text-warm-muted uppercase bg-warm-card px-3 py-1.5 rounded border border-warm-ink/15">
          Lembaran perasaan cinta
        </span>
        <h2 className="font-mono text-2xl md:text-3xl mt-4 font-normal text-warm-ink tracking-tight">
          Kisah Kasih di Sekolah
        </h2>
        <p className="text-warm-muted text-xs md:text-sm mt-2 font-mono leading-relaxed">
          Kamu bisa menggeser kartu di bawah ini untuk melihat tata letak yang berbeda, klik untuk membaca catatan manis di belakangnya, atau klik area kosong untuk mengunggah foto kita.
        </p>
      </div>

      {/* Small comic sticker caption */}
      <div className="absolute right-8 top-12 bg-[#FCFAF2] border-2 border-warm-ink text-[10px] font-mono px-2.5 py-1 rounded rotate-6 hidden md:block select-none pointer-events-none z-30 shadow-sm">
        💖 &ldquo;Setiap detik bersamamu adalah bahagia.&rdquo;
      </div>

      {/* Solid background canvas desktop surface */}
      <div 
        ref={containerRef}
        className="relative w-full min-h-[460px] md:min-h-[500px] bg-warm-card border-2 border-warm-ink rounded p-4 md:p-6 flex flex-wrap justify-center items-center gap-6 cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <AnimatePresence>
          {cards.map((card, idx) => {
            const isFlipped = flippedCardId === card.id;
            const hasUserImage = !!card.userImage;
            const isBlankUploader = card.defaultImage === '';
            const photoSrc = card.userImage || card.defaultImage || 'https://picsum.photos/seed/love/400/400';

            return (
              <motion.div
                key={card.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.15}
                onDragStart={() => setDragged(true)}
                onDragEnd={() => {
                  setTimeout(() => setDragged(false), 50);
                }}
                initial={{ opacity: 0, scale: 0.95, y: 60, rotate: card.tilt * 2 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: card.tilt }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 85, 
                  damping: 15,
                  delay: idx * 0.15 
                }}
                whileHover={{ scale: 1.02, zIndex: 40 }}
                className="relative w-64 md:w-72 h-[340px] cursor-pointer"
                style={{ perspective: 1000 }}
              >
                {/* 3D Flip Card */}
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  
                  {/* FRONT (Polaroid Look) */}
                  <div 
                    id={`polaroid-front-${card.id}`}
                    className="w-full h-full bg-white border-2 border-warm-ink rounded p-3 pb-5 flex flex-col justify-between select-none absolute"
                    style={{ backfaceVisibility: 'hidden' }}
                    onClick={() => handleCardClick(card.id)}
                  >
                    {/* Retro clear adhesive tape overlay block */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-warm-rose/20 border-x border-warm-ink/10 opacity-75 z-10 pointer-events-none"></div>

                    {/* Image Box */}
                    <div 
                      className={`relative w-full aspect-square rounded overflow-hidden bg-warm-bg border border-warm-ink/20 flex flex-col items-center justify-center group ${
                        isBlankUploader && !hasUserImage ? 'border-dashed border-2 border-warm-rose/50' : ''
                      } ${dragOverCardId === card.id ? 'bg-warm-bg border-warm-rose' : ''}`}
                      onDragOver={(e) => isBlankUploader ? handleDragOver(e, card.id) : null}
                      onDragLeave={isBlankUploader ? handleDragLeave : undefined}
                      onDrop={(e) => isBlankUploader ? handleDrop(e, card.id) : null}
                    >
                      {isBlankUploader && !hasUserImage ? (
                        <div 
                          className="flex flex-col items-center justify-center p-3 text-center cursor-pointer h-full w-full"
                          onClick={(e) => {
                            e.stopPropagation(); 
                            triggerFileInput(card.id);
                          }}
                        >
                          <div className="bg-white border border-warm-ink/20 rounded-full p-2 mb-1.5 text-warm-rose">
                            <Upload className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-mono text-warm-ink block leading-tight">
                            Unggah Foto
                          </span>
                          <span className="text-[9px] text-warm-muted mt-0.5">
                            tarik berkas gambar ke sini
                          </span>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <img 
                            src={photoSrc} 
                            alt={card.caption} 
                            className="object-cover w-full h-full select-none"
                            referrerPolicy="no-referrer"
                          />
                          {isBlankUploader && (
                            <button
                              id={`re-upload-btn-${card.id}`}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  triggerFileInput(card.id);
                              }}
                              className="absolute bottom-1.5 right-1.5 bg-white rounded border border-warm-ink p-1 text-warm-ink hover:text-warm-rose transition-colors cursor-pointer"
                              title="Ganti Foto"
                            >
                              <RefreshCw className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}

                      <input
                        type="file"
                        ref={el => { fileInputRefs.current[card.id] = el }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileChange(card.id, e.target.files[0]);
                          }
                        }}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>

                    {/* Classic Handwritten Polaroid Caption text */}
                    <div className="mt-3 px-1 text-center font-mono text-warm-ink text-xs leading-relaxed">
                      {card.caption}
                    </div>

                    <div className="text-[9px] text-warm-muted text-right font-mono italic flex items-center justify-end gap-1 mt-1 pointer-events-none">
                      <span>klik untuk membalik</span>
                    </div>
                  </div>

                  {/* BACK (Catatan Hangat) */}
                  <div 
                    id={`polaroid-back-${card.id}`}
                    className="w-full h-full bg-[#FCFAF2] border-2 border-warm-ink rounded p-4 flex flex-col justify-between text-left select-none absolute"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 border-b border-warm-ink/10 pb-1.5 mb-3">
                        <Heart className="w-3 h-3 text-warm-rose fill-warm-rose" />
                        <span className="font-mono text-[10px] tracking-wide text-warm-muted">Catatan Hangat</span>
                      </div>

                      <p className="font-mono text-warm-ink text-xs leading-relaxed whitespace-pre-line">
                        {card.captionBack}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-1.5 border-t border-warm-ink/10 text-[9px] text-warm-muted font-mono">
                      <span>Klik untuk membalik kembali</span>
                      <Heart className="w-2.5 h-2.5 text-warm-rose" />
                    </div>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Button styles with warm pastel and borders instead of glowing gradients */}
      <motion.button
        id="go-to-flowers-button"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={onNext}
        className="mt-6 w-full max-w-sm flex items-center justify-center gap-2 bg-warm-rose hover:bg-warm-darkrose text-white font-mono tracking-wide rounded py-3 shadow-[0_3px_0_#3E342B] active:shadow-none hover:translate-y-[1px] active:translate-y-[3px] border-2 border-warm-ink transition-all text-sm cursor-pointer animate-pulse-heart"
      >
        <span>LANJUT KE KEJUTAN AKHIR</span>
        <ArrowRight className="w-4 h-4 text-white" />
      </motion.button>
    </div>
  );
}
