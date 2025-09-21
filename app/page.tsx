import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Zap, Shield, Users, Workflow, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
        <div className="relative container mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                🚀 Powered by Agno Framework
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Advanced{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Multi-Agent
              </span>{' '}
              GUI Interface
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Create, manage, and monitor intelligent agents with seamless integration to
              OpenRouter and Gemini AI. Built with Next.js 15, Vercel AI SDK, and modern
              web technologies.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="gap-2">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/docs">
                  View Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage AI agents
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Powerful features designed for developers and AI enthusiasts to create
              sophisticated multi-agent systems.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Brain className="h-10 w-10 text-primary" />
                  <CardTitle>Agent Builder</CardTitle>
                  <CardDescription>
                    Visual drag-and-drop interface to create and configure AI agents
                    with custom tools and memory systems.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary" />
                  <CardTitle>Multi-Agent Teams</CardTitle>
                  <CardDescription>
                    Create collaborative teams of agents with role assignment,
                    communication protocols, and conflict resolution.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Workflow className="h-10 w-10 text-primary" />
                  <CardTitle>Workflow Designer</CardTitle>
                  <CardDescription>
                    Design complex workflows with visual tools, orchestration,
                    and real-time monitoring capabilities.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary" />
                  <CardTitle>LLM Integration</CardTitle>
                  <CardDescription>
                    Seamless integration with OpenRouter and Gemini AI with
                    automatic fallback and cost optimization.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary" />
                  <CardTitle>MCP Context</CardTitle>
                  <CardDescription>
                    Advanced context management with hallucination prevention,
                    fact-checking, and knowledge grounding.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-primary" />
                  <CardTitle>Real-time Analytics</CardTitle>
                  <CardDescription>
                    Monitor performance, track usage, and get insights with
                    comprehensive analytics and logging.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build the future of AI?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join thousands of developers who are already using Agno GUI to create
              sophisticated multi-agent systems.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="gap-2">
                <Link href="/auth/register">
                  Start Building Today
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">
                  View Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-semibold">Agno GUI Interface</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Agno GUI Team. Built with Next.js 15 and Vercel AI SDK.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}