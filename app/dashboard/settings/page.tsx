import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Key,
  Mail,
  Phone,
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

const settingsCategories = [
  {
    id: 'profile',
    name: 'Profile Settings',
    description: 'Manage your personal information and preferences',
    icon: User,
    fields: [
      { label: 'Full Name', value: 'John Doe', type: 'text' },
      { label: 'Email', value: 'john.doe@agnogui.com', type: 'email' },
      { label: 'Role', value: 'Administrator', type: 'select' },
      { label: 'Timezone', value: 'America/Sao_Paulo', type: 'select' }
    ]
  },
  {
    id: 'security',
    name: 'Security Settings',
    description: 'Configure authentication and access controls',
    icon: Shield,
    fields: [
      { label: 'Two-Factor Auth', value: 'Enabled', type: 'toggle' },
      { label: 'Session Timeout', value: '24 hours', type: 'select' },
      { label: 'Password Policy', value: 'Strong', type: 'select' },
      { label: 'API Key Rotation', value: '30 days', type: 'select' }
    ]
  },
  {
    id: 'notifications',
    name: 'Notifications',
    description: 'Configure alerts and notification preferences',
    icon: Bell,
    fields: [
      { label: 'Email Notifications', value: 'Enabled', type: 'toggle' },
      { label: 'System Alerts', value: 'Enabled', type: 'toggle' },
      { label: 'Agent Status Updates', value: 'Enabled', type: 'toggle' },
      { label: 'Security Warnings', value: 'Enabled', type: 'toggle' }
    ]
  },
  {
    id: 'system',
    name: 'System Configuration',
    description: 'Global system settings and configurations',
    icon: Settings,
    fields: [
      { label: 'Default Language', value: 'English', type: 'select' },
      { label: 'Date Format', value: 'DD/MM/YYYY', type: 'select' },
      { label: 'Max Upload Size', value: '100MB', type: 'text' },
      { label: 'Cache Duration', value: '24 hours', type: 'select' }
    ]
  }
];

const apiKeys = [
  { name: 'OpenAI API Key', provider: 'OpenAI', lastUsed: '2 min ago', status: 'active' },
  { name: 'Anthropic API Key', provider: 'Anthropic', lastUsed: '5 min ago', status: 'active' },
  { name: 'Google AI API Key', provider: 'Google', lastUsed: '12 min ago', status: 'active' },
  { name: 'OpenRouter API Key', provider: 'OpenRouter', lastUsed: '1 hour ago', status: 'expired' }
];

export default function SettingsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'expired': return <Badge variant="destructive">Expired</Badge>;
      case 'inactive': return <Badge variant="secondary">Inactive</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure system preferences, security settings, and user preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Settings
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Settings
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        {settingsCategories.map((category) => {
          const Icon = category.icon;
          return (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-2xl">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {category.fields.map((field, index) => (
                      <div key={index} className="space-y-2">
                        <Label htmlFor={field.label.toLowerCase().replace(/\s+/g, '-')}>
                          {field.label}
                        </Label>
                        {field.type === 'toggle' ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={field.label.toLowerCase().replace(/\s+/g, '-')}
                              defaultChecked={field.value === 'Enabled'}
                              className="rounded border border-input"
                            />
                            <span className="text-sm text-muted-foreground">
                              {field.value === 'Enabled' ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        ) : (
                          <Input
                            id={field.label.toLowerCase().replace(/\s+/g, '-')}
                            defaultValue={field.value}
                            type={field.type}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset to Defaults
                    </Button>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">API Key Management</CardTitle>
                  <CardDescription>
                    Manage API keys for external services and integrations
                  </CardDescription>
                </div>
                <Button>
                  <Key className="h-4 w-4 mr-2" />
                  Add New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {apiKeys.map((apiKey, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      apiKey.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">{apiKey.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {apiKey.provider} • Last used: {apiKey.lastUsed}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(apiKey.status)}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Key className="h-3 w-3 mr-1" />
                        Rotate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Current system status and version information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Agno GUI Version</span>
                <span className="text-sm text-muted-foreground">v1.0.4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Next.js Version</span>
                <span className="text-sm text-muted-foreground">15.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Node.js Version</span>
                <span className="text-sm text-muted-foreground">v22.17.0</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Database</span>
                <span className="text-sm text-muted-foreground">SQLite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Environment</span>
                <span className="text-sm text-muted-foreground">Development</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Last Update</span>
                <span className="text-sm text-muted-foreground">Now</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}