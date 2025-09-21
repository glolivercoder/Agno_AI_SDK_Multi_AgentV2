'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Home,
  Users,
  Workflow,
  Settings,
  BarChart3,
  FileText,
  Database,
  Zap,
  Shield,
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'My Assistants', href: '/assistants', icon: Brain },
  { name: 'Create New', href: '/create', icon: Home },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Knowledge', href: '/knowledge', icon: Database },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      'sidebar-modern flex flex-col h-full transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Agno GUI</h2>
              <p className="text-xs text-white/70">Multi-Agent Platform</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto p-2 bg-gradient-primary rounded-xl">
            <Brain className="h-6 w-6 text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 text-white hover:bg-white/10"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                'nav-item-modern',
                isActive && 'active'
              )}>
                <Icon className="h-5 w-5" />
                {!collapsed && (
                  <span className="ml-3 text-white/90 font-medium">{item.name}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        {!collapsed && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="status-dot status-active"></div>
              <span className="text-xs text-white/70 font-medium">Online</span>
            </div>
            <p className="text-xs text-white/50">v1.0.4</p>
          </div>
        )}
        {collapsed && (
          <div className="text-center">
            <div className="status-dot status-active mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}