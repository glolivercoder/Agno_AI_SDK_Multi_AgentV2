'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PenTool, ArrowRight, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';

const steps = [
  { id: 1, title: 'Choose Purpose', description: 'What do you want to create?' },
  { id: 2, title: 'Name Your Assistant', description: 'Give your assistant a personality' },
  { id: 3, title: 'Set Preferences', description: 'Customize the writing style' },
  { id: 4, title: 'Ready to Go!', description: 'Your assistant is ready' }
];

export default function ContentWriterWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    purpose: '',
    name: '',
    tone: 'professional',
    style: 'engaging',
    audience: '',
    goals: ''
  });
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Create the assistant and redirect
      router.push('/assistants');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <PenTool className="h-16 w-16 text-blue-500 mx-auto" />
              <div>
                <h2 className="text-2xl font-bold">What do you want to create?</h2>
                <p className="text-muted-foreground">Choose the type of content your assistant will help with</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'blog-posts', label: 'Blog Posts', desc: 'Articles, tutorials, and long-form content' },
                { value: 'social-media', label: 'Social Media', desc: 'Posts, captions, and social content' },
                { value: 'emails', label: 'Emails', desc: 'Marketing emails, newsletters, and communications' },
                { value: 'marketing', label: 'Marketing Copy', desc: 'Ads, landing pages, and promotional content' },
                { value: 'all', label: 'Everything', desc: 'Help with all types of written content' }
              ].map((option) => (
                <Card
                  key={option.value}
                  className={`cursor-pointer transition-all ${
                    formData.purpose === option.value
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => updateFormData('purpose', option.value)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{option.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Name Your Assistant</h2>
                <p className="text-muted-foreground">Give your AI assistant a memorable name and personality</p>
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div>
                <Label htmlFor="name">Assistant Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Marketing Master, Content Creator Pro"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Customize Your Assistant</h2>
              <p className="text-muted-foreground">Set preferences for tone, style, and audience</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Tone</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['professional', 'casual', 'friendly', 'formal'].map((tone) => (
                      <Button
                        key={tone}
                        variant={formData.tone === tone ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateFormData('tone', tone)}
                        className="capitalize"
                      >
                        {tone}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Writing Style</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['engaging', 'concise', 'detailed', 'creative'].map((style) => (
                      <Button
                        key={style}
                        variant={formData.style === style ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateFormData('style', style)}
                        className="capitalize"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="audience">Target Audience (Optional)</Label>
                <Input
                  id="audience"
                  placeholder="e.g., Small business owners, Tech professionals, General consumers"
                  value={formData.audience}
                  onChange={(e) => updateFormData('audience', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="goals">Goals & Preferences (Optional)</Label>
                <Textarea
                  id="goals"
                  placeholder="Any specific goals or preferences for your content..."
                  value={formData.goals}
                  onChange={(e) => updateFormData('goals', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div>
                <h2 className="text-2xl font-bold">Your Assistant is Ready!</h2>
                <p className="text-muted-foreground">Review your settings and start creating content</p>
              </div>
            </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PenTool className="h-5 w-5" />
                  <span>{formData.name || 'Content Creator Assistant'}</span>
                </CardTitle>
                <CardDescription>Content Creator • {formData.purpose ? formData.purpose.replace('-', ' ') : 'All content types'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Tone:</span>
                  <Badge variant="secondary" className="capitalize">{formData.tone}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Style:</span>
                  <Badge variant="secondary" className="capitalize">{formData.style}</Badge>
                </div>
                {formData.audience && (
                  <div className="flex justify-between text-sm">
                    <span>Audience:</span>
                    <span className="text-muted-foreground">{formData.audience}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id < currentStep ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                {step.id < steps.length && (
                  <div className={`w-12 h-1 mx-2 ${
                    step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-center mt-4">
            <h3 className="font-semibold">{steps[currentStep - 1].title}</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="max-w-2xl mx-auto mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={
              (currentStep === 1 && !formData.purpose) ||
              (currentStep === 2 && !formData.name.trim())
            }
          >
            {currentStep === steps.length ? 'Create Assistant' : 'Next'}
            {currentStep < steps.length && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}