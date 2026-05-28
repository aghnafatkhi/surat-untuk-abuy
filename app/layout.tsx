import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Special_Elite } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const typewriter = Special_Elite({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Surat Kecil dari Snoopy',
  description: 'Sebuah surat hangat dan buket bunga untukmu.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={`${jakarta.variable} ${typewriter.variable}`}>
      <body suppressHydrationWarning className="font-sans bg-[#FAF6EE] text-[#3D352E] min-h-screen selection:bg-[#F3C5C3] selection:text-[#5C2B29]">
        {children}
      </body>
    </html>
  );
}
