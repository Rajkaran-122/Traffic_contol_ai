'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Map,
  BarChart3,
  Settings,
  Zap,
  FileText,
  Home,
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Systems', href: '/systems', icon: Zap },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Audit', href: '/audit', icon: FileText },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <nav className="flex justify-around py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center py-2 px-3 rounded-lg transition-colors',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}