import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RealTimeStats } from '@/components/monitoring/real-time-stats';
import {
  Brain,
  Users,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  Settings,
  Plus
} from 'lucide-react';
import Link from 'next/link';

// Mock data for demonstration
const stats = {
  totalAgents: 12,
  activeAgents: 8,
  totalTeams: 3,
  activeTeams: 2,
  totalRequests: 1250,
  successRate: 94.2,
  avgResponseTime: '1.2s',
  uptime: '99.9%'
};

const recentAgents = [
  { id: 1, name: 'Data Analyst', status: 'active', lastActive: '2 min ago', type: 'Specialist' },
  { id: 2, name: 'Code Reviewer', status: 'idle', lastActive: '15 min ago', type: 'Assistant' },
  { id: 3, name: 'Research Agent', status: 'active', lastActive: '1 min ago', type: 'Research' },
  { id: 4, name: 'Content Writer', status: 'busy', lastActive: '30 sec ago', type: 'Creative' },
];

const systemAlerts = [
  { id: 1, type: 'success', message: 'All systems operational', time: '5 min ago' },
  { id: 2, type: 'warning', message: 'High memory usage on Agent-3', time: '12 min ago' },
  { id: 3, type: 'info', message: 'New agent template available', time: '1 hour ago' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Agno GUI Dashboard</h1>
              <p className="text-sm text-muted-foreground">Multi-Agent Management Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              All Systems Operational
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAgents}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.activeAgents} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalRequests} requests
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
                <p className="text-xs text-muted-foreground">
                  Average
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.uptime}</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="agents" className="space-y-4">
            <TabsList>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="agents" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Agent Management</h2>
                <Button asChild>
                  <Link href="/dashboard/agents/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Agent
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentAgents.map((agent) => (
                  <Card key={agent.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <Badge
                          variant={agent.status === 'active' ? 'default' : agent.status === 'busy' ? 'destructive' : 'secondary'}
                        >
                          {agent.status}
                        </Badge>
                      </div>
                      <CardDescription>{agent.type} Agent</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Last active: {agent.lastActive}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="teams" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Team Management</h2>
                <Button asChild>
                  <Link href="/dashboard/teams/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Team
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Research Team</CardTitle>
                    <CardDescription>3 agents collaborating on research tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Members:</span>
                        <span>3 agents</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate:</span>
                        <span className="text-green-600">96.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Development Team</CardTitle>
                    <CardDescription>2 agents working on code generation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Members:</span>
                        <span>2 agents</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate:</span>
                        <span className="text-green-600">91.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <Suspense fallback={<div className="text-center py-8">Loading monitoring data...</div>}>
                <RealTimeStats />
              </Suspense>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Analytics & Performance</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Request Success Rate</span>
                        <span className="font-medium">94.2%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>API Response Time</span>
                        <span className="font-medium">1.2s</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Agent Efficiency</span>
                        <span className="font-medium">87.6%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Total API Calls</span>
                        <span className="font-medium">1,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active Sessions</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Data Processed</span>
                        <span className="font-medium">2.4 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Uptime</span>
                        <span className="font-medium text-green-600">99.9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}