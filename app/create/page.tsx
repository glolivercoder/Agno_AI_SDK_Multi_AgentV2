'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PenTool, BarChart3, MessageSquare, Palette, Code, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const templates = [
  {
    id: 'content-writer',
    name: 'Content Creator',
    description: 'Write blog posts, social media content, emails, and marketing materials',
    icon: PenTool,
    color: 'bg-blue-500',
    popular: true,
    useCase: 'Perfect for bloggers, marketers, and content teams'
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Analyze spreadsheets, create reports, find insights, and visualize data',
    icon: BarChart3,
    color: 'bg-green-500',
    popular: true,
    useCase: 'Ideal for analysts, managers, and business intelligence'
  },
  {
    id: 'customer-support',
    name: 'Customer Helper',
    description: 'Answer questions, handle support tickets, and assist customers',
    icon: MessageSquare,
    color: 'bg-purple-500',
    popular: false,
    useCase: 'Great for customer service and support teams'
  },
  {
    id: 'creative-assistant',
    name: 'Creative Assistant',
    description: 'Generate ideas, create images, and help with creative projects',
    icon: Palette,
    color: 'bg-orange-500',
    popular: false,
    useCase: 'Perfect for designers, artists, and creative professionals'
  },
  {
    id: 'code-assistant',
    name: 'Code Helper',
    description: 'Help with coding, debugging, and software development tasks',
    icon: Code,
    color: 'bg-red-500',
    popular: false,
    useCase: 'Essential for developers and programming teams'
  }
];

export default function CreatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Create New AI Assistant</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a template to get started quickly, or build something completely custom
          </p>
        </div>

        {/* Template Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <Card
                key={template.id}
                className={`relative cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-blue-500 shadow-xl'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                {template.popular && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-gradient-to-r from-orange-400 to-orange-600">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="text-sm">{template.useCase}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>

                  {selectedTemplate === template.id && (
                    <div className="space-y-3 pt-2 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Setup time:</span>
                        <span className="font-medium text-green-600">~2 minutes</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span className="font-medium text-blue-600">Very Easy</span>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        asChild
                      >
                        <Link href={`/create/${template.id}`}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create {template.name}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Option */}
        <div className="text-center pt-8">
          <Card className="max-w-md mx-auto border-dashed border-2 hover:border-solid hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="pt-8 pb-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl flex items-center justify-center mx-auto">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Build Custom Assistant</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create something completely unique for your specific needs
                  </p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/create/custom">
                    Start from Scratch
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}