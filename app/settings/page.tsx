import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, User, Bell, Shield, Palette, Key } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account, preferences, and API connections
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <User className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Key className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your OpenRouter and Gemini API connections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">OpenRouter</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gemini AI</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Bell className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure alerts and notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Notification Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Shield className="h-8 w-8 text-red-500 mb-2" />
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage security settings and access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Security Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Palette className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of your interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Theme Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Settings className="h-8 w-8 text-gray-500 mb-2" />
              <CardTitle>Advanced</CardTitle>
              <CardDescription>
                Advanced configuration and system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Free Plan</p>
                <p className="text-sm text-muted-foreground">Up to 3 assistants, basic features</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}