import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Trash2,
  Settings,
  Activity,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Copy
} from 'lucide-react';

// Mock data for agents
const agents = [
  {
    id: '1',
    name: 'Data Analyst',
    type: 'Specialist',
    status: 'active',
    model: 'gpt-4',
    provider: 'OpenRouter',
    memory: '128MB',
    cpu: 45,
    lastActive: '2 min ago',
    tasksCompleted: 1250,
    successRate: '94.2%',
    description: 'Specialized in data analysis and visualization',
    tools: ['Python', 'Pandas', 'Matplotlib', 'SQL'],
    createdAt: '2024-01-15',
    owner: 'John Doe'
  },
  {
    id: '2',
    name: 'Code Reviewer',
    type: 'Assistant',
    status: 'idle',
    model: 'claude-3',
    provider: 'Anthropic',
    memory: '256MB',
    cpu: 12,
    lastActive: '15 min ago',
    tasksCompleted: 890,
    successRate: '96.5%',
    description: 'Reviews code for quality, security, and best practices',
    tools: ['Git', 'ESLint', 'Prettier', 'Jest'],
    createdAt: '2024-01-20',
    owner: 'Jane Smith'
  },
  {
    id: '3',
    name: 'Content Writer',
    type: 'Creative',
    status: 'busy',
    model: 'gemini-pro',
    provider: 'Google',
    memory: '192MB',
    cpu: 78,
    lastActive: '1 min ago',
    tasksCompleted: 2100,
    successRate: '91.8%',
    description: 'Creates engaging content for various platforms',
    tools: ['Grammarly', 'SEO Tools', 'Social Media APIs'],
    createdAt: '2024-02-01',
    owner: 'Mike Johnson'
  },
  {
    id: '4',
    name: 'Research Assistant',
    type: 'Research',
    status: 'active',
    model: 'gpt-4-turbo',
    provider: 'OpenAI',
    memory: '320MB',
    cpu: 56,
    lastActive: '30 sec ago',
    tasksCompleted: 1670,
    successRate: '93.7%',
    description: 'Conducts research and summarizes findings',
    tools: ['Web Search', 'PDF Parser', 'Citation Manager'],
    createdAt: '2024-02-10',
    owner: 'Sarah Wilson'
  }
];

const templates = [
  { id: '1', name: 'Customer Support', description: 'Handles customer inquiries and support tickets', usage: 'High' },
  { id: '2', name: 'Data Processing', description: 'Processes and analyzes large datasets', usage: 'Medium' },
  { id: '3', name: 'Content Creation', description: 'Creates various types of content', usage: 'High' },
  { id: '4', name: 'Code Assistant', description: 'Helps with coding tasks and debugging', usage: 'Very High' }
];

export default function AgentsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'idle': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'busy': return <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>;
      case 'idle': return <Badge variant="secondary">Idle</Badge>;
      case 'error': return <Badge variant="destructive">Error</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Management</h1>
          <p className="text-muted-foreground">
            Create, configure, and monitor your AI agents
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button asChild>
            <Link href="/dashboard/agents/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents by name, type, or model..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>{agents.filter(a => a.status === 'active').length} Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>{agents.filter(a => a.status === 'busy').length} Busy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span>{agents.filter(a => a.status === 'idle').length} Idle</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="agents">My Agents ({agents.length})</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription>{agent.type} Agent</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    {getStatusBadge(agent.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Model</span>
                      <p className="font-medium">{agent.model}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Provider</span>
                      <p className="font-medium">{agent.provider}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>{agent.cpu}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${agent.cpu}%` }}></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Memory</span>
                      <span>{agent.memory}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Last active: {agent.lastActive}</span>
                    <span>{agent.tasksCompleted} tasks</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      {agent.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Agent Templates</h2>
              <p className="text-muted-foreground">Pre-configured agent templates for common use cases</p>
            </div>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant={template.usage === 'Very High' ? 'default' : 'secondary'}>
                      {template.usage} Usage
                    </Badge>
                    <Button size="sm">
                      <Copy className="h-3 w-3 mr-1" />
                      Use
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Activity Logs</h2>
            <p className="text-muted-foreground">Recent agent activities and system events</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { agent: 'Data Analyst', action: 'Completed analysis task', time: '2 min ago', status: 'success' },
                { agent: 'Content Writer', action: 'Started new content generation', time: '5 min ago', status: 'info' },
                { agent: 'Code Reviewer', action: 'Found 3 code issues', time: '12 min ago', status: 'warning' },
                { agent: 'Research Assistant', action: 'Processed 50 research papers', time: '18 min ago', status: 'success' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.agent}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}