import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthContext } from './context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryProvider from './context/ReactQueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'tailchro',
  description: 'Open-Source Tailwind Components',
  icons: {
    icon: '/tailchro.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <ReactQueryProvider>
          <AuthContext>{children}</AuthContext>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
