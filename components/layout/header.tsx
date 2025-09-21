'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Sparkles } from 'lucide-react';

// Simple page titles for user-friendly navigation
const pageTitles: Record<string, string> = {
  '/assistants': 'My AI Assistants',
  '/create': 'Create New Assistant',
  '/workflows': 'My Workflows',
  '/knowledge': 'Knowledge Base',
  '/settings': 'Settings',
};

export function Header() {
  const pathname = usePathname();
  const currentTitle = pageTitles[pathname] || 'Agno AI';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Page title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{currentTitle}</h1>
                <p className="text-sm text-gray-500">AI-powered automation</p>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              All Systems Operational
            </Badge>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/create">
                <Plus className="h-4 w-4 mr-2" />
                New Assistant
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}