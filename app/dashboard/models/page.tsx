import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Zap,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  RefreshCw
} from 'lucide-react';

const models = [
  {
    id: '1',
    name: 'GPT-4',
    provider: 'OpenAI',
    status: 'active',
    version: '2024-01-15',
    costPerToken: '$0.00003',
    contextWindow: '128K',
    maxTokens: '4096',
    latency: '1.2s',
    successRate: 96.8,
    usage: 68
  },
  {
    id: '2',
    name: 'Claude-3 Opus',
    provider: 'Anthropic',
    status: 'active',
    version: '2024-01-10',
    costPerToken: '$0.000015',
    contextWindow: '200K',
    maxTokens: '4096',
    latency: '0.9s',
    successRate: 97.2,
    usage: 45
  },
  {
    id: '3',
    name: 'Gemini Pro',
    provider: 'Google',
    status: 'active',
    version: '2024-01-08',
    costPerToken: '$0.0000025',
    contextWindow: '1M',
    maxTokens: '8192',
    latency: '1.5s',
    successRate: 94.5,
    usage: 32
  },
  {
    id: '4',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    status: 'maintenance',
    version: '2023-12-01',
    costPerToken: '$0.000002',
    contextWindow: '16K',
    maxTokens: '4096',
    latency: '0.8s',
    successRate: 95.1,
    usage: 23
  }
];

const providers = [
  { name: 'OpenAI', models: 2, status: 'active', rateLimit: '1000/min', cost: '$245.80' },
  { name: 'Anthropic', models: 1, status: 'active', rateLimit: '500/min', cost: '$189.20' },
  { name: 'Google', models: 1, status: 'active', rateLimit: '300/min', cost: '$145.80' },
  { name: 'OpenRouter', models: 8, status: 'active', rateLimit: '2000/min', cost: '$98.40' }
];

export default function ModelsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'maintenance': return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case 'deprecated': return <Badge variant="destructive">Deprecated</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Model Management</h1>
          <p className="text-muted-foreground">
            Configure and monitor AI models from multiple providers
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Models
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configure API Keys
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList>
          <TabsTrigger value="models">AI Models ({models.length})</TabsTrigger>
          <TabsTrigger value="providers">Providers ({providers.length})</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-6">
            {models.map((model) => (
              <Card key={model.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-xl">{model.name}</CardTitle>
                        <CardDescription>{model.provider} • v{model.version}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(model.status)}
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Context Window</span>
                      <p className="font-medium">{model.contextWindow}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max Tokens</span>
                      <p className="font-medium">{model.maxTokens}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Latency</span>
                      <p className="font-medium">{model.latency}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success Rate</span>
                      <p className="font-medium">{model.successRate}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Usage Distribution</span>
                      <span>{model.usage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${model.usage}%` }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Cost per token: {model.costPerToken}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Test Model
                      </Button>
                      <Button size="sm" variant="outline">
                        {model.status === 'active' ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {providers.map((provider, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <Badge variant={provider.status === 'active' ? 'default' : 'secondary'}>
                      {provider.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {provider.models} models available
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Rate Limit</span>
                      <p className="font-medium">{provider.rateLimit}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly Cost</span>
                      <p className="font-medium">{provider.cost}</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Configure {provider.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Comparison</CardTitle>
                <CardDescription>Success rates and latency by model</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {models.map((model) => (
                  <div key={model.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        model.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium">{model.name}</p>
                        <p className="text-sm text-muted-foreground">{model.provider}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{model.successRate}% success</p>
                      <p className="text-xs text-muted-foreground">{model.latency} latency</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Load Balancing Status</CardTitle>
                <CardDescription>Current distribution across models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {models.filter(m => m.status === 'active').map((model) => (
                  <div key={model.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{model.name}</span>
                      <span>{model.usage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${model.usage}%` }}></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly API Costs</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$679.20</div>
                <p className="text-xs text-muted-foreground">
                  15.2% of total budget
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Efficiency</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.5%</div>
                <p className="text-xs text-muted-foreground">
                  +5.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Cost per Request</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.044</div>
                <p className="text-xs text-muted-foreground">
                  -8.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Token Usage</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.8M</div>
                <p className="text-xs text-muted-foreground">
                  +12.4% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}