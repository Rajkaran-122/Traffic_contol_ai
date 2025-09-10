import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { MobileNav } from '@/components/layout/mobile-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrafficAI - Train Traffic Control System',
  description: 'AI-powered train traffic control and management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex flex-col flex-1 md:ml-64">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 mb-16 md:mb-0">
              {children}
            </main>
          </div>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}