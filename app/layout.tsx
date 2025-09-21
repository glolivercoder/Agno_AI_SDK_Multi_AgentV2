import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Agno GUI Interface',
    template: '%s | Agno GUI',
  },
  description: 'Advanced GUI interface for Agno multi-agent framework with LLM integrations via OpenRouter and Gemini AI',
  keywords: [
    'Agno',
    'Multi-Agent',
    'AI',
    'LLM',
    'OpenRouter',
    'Gemini',
    'Next.js',
    'TypeScript',
    'Machine Learning',
  ],
  authors: [{ name: 'Agno GUI Team' }],
  creator: 'Agno GUI Team',
  publisher: 'Agno GUI Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3006'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3006',
    title: 'Agno GUI Interface',
    description: 'Advanced GUI interface for Agno multi-agent framework with LLM integrations',
    siteName: 'Agno GUI Interface',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agno GUI Interface',
    description: 'Advanced GUI interface for Agno multi-agent framework with LLM integrations',
    creator: '@agnogui',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased overflow-hidden">
        <Providers>
          <div className="flex h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto">
                <div className="container-agno py-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}