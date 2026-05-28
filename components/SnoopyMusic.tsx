'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * CARA MENGUBAH / MENAMBAHKAN AUDIO EKSTERNAL (MUSIK DARI ANDA):
 * 
 * Untuk memutar musik atau lagu pilihan Anda sendiri secara otomatis:
 * 1. Letakkan berkas audio Anda (misal berformat MP3) ke dalam folder 'public' di proyek ini.
 * 2. Beri nama berkas tersebut dengan tepat: 'music.mp3' sehingga jalurnya menjadi '/music.mp3'.
 * 3. Sistem di bawah ini akan mendeteksi keberadaan berkas '/music.mp3' tersebut. Jika ditemukan,
 *    ia akan langsung memutar lagu romantis dari Anda secara otomatis saat layar disentuh pertama kali.
 * 4. Jika berkas '/music.mp3' tidak ditemukan atau gagal dijalankan, sistem akan otomatis beralih
 *    (fallback) memainkan instrumen piano arpeggio romantis dan lembut yang disintesis secara langsung.
 * 
 * Anda juga dapat mengubah nada piano arpeggio di bawah ini jika ingin membuat progresi nada sendiri:
 */
const progressions = [
  [261.63, 329.63, 392.00, 493.88], // Akor 1: Cmaj7 (Sangat hangat dan tenang)
  [349.23, 440.00, 523.25, 659.25], // Akor 2: Fmaj7 (Romantis dan menyentuh)
  [440.00, 523.25, 659.25, 783.99], // Akor 3: Am7 (Bernuansa syahdu)
  [293.66, 392.00, 493.88, 587.33]  // Akor 4: G6/E (Penuh harapan dan penyelesaian)
];

export default function SnoopyMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSynthesizedArpeggio = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    let progressionIndex = 0;
    let noteIndex = 0;

    const playNextNote = () => {
      if (ctx.state === 'suspended') return;
      
      const chord = progressions[progressionIndex];
      const freq = chord[noteIndex];

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.2);

      // Woodstock chirp (sesekali bersiul manis di latar belakang)
      if (Math.random() < 0.12) {
        setTimeout(() => {
          const chirpOsc = ctx.createOscillator();
          const chirpGain = ctx.createGain();
          chirpOsc.type = 'sine';
          chirpOsc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
          chirpOsc.frequency.exponentialRampToValueAtTime(1400 + Math.random() * 300, ctx.currentTime + 0.08);

          chirpGain.gain.setValueAtTime(0, ctx.currentTime);
          chirpGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.02);
          chirpGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

          chirpOsc.connect(chirpGain);
          chirpGain.connect(ctx.destination);
          chirpOsc.start();
          chirpOsc.stop(ctx.currentTime + 0.15);
        }, 150);
      }

      noteIndex = (noteIndex + 1) % chord.length;
      if (noteIndex === 0) {
        progressionIndex = (progressionIndex + 1) % progressions.length;
      }
    };

    intervalIdRef.current = setInterval(playNextNote, 440);
  };

  useEffect(() => {
    let active = true;
    const currentAudio = audioRef.current;
 
    const startAudio = () => {
      if (!active) return;
      
      if (!useFallback) {
        const audio = currentAudio;
        if (audio) {
          audio.muted = false;
          audio.play()
            .then(() => {
              setIsPlaying(true);
              active = false;
              window.removeEventListener('click', startAudio);
              window.removeEventListener('touchstart', startAudio);
            })
            .catch((err) => {
              console.warn("Retrying MP3 player on next tap:", err);
            });
        }
      } else {
        try {
          if (!audioContextRef.current) {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
              audioContextRef.current = new AudioCtx();
            }
          }
          
          setIsPlaying(true);
          setTimeout(() => {
            playSynthesizedArpeggio();
          }, 50);

          active = false;
          window.removeEventListener('click', startAudio);
          window.removeEventListener('touchstart', startAudio);
        } catch (e) {
          console.error("Gagal menjalankan melodi:", e);
        }
      }
    };

    (window as any).playSnoopyMusic = () => {
      startAudio();
    };

    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);

    return () => {
      active = false;
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
      delete (window as any).playSnoopyMusic;
      
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [useFallback]);

  const handleAudioError = () => {
    console.warn("music.mp3 failed to load. Falling back to synth audio.");
    setUseFallback(true);
  };

  return (
    <audio
      ref={audioRef}
      src="https://files.catbox.moe/docbx5.mp3"
      loop
      playsInline
      preload="auto"
      onError={handleAudioError}
      style={{ display: 'none' }}
    />
  );
}
