import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Brain,
  Activity,
  Clock,
  Zap,
  DollarSign,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

const analyticsData = {
  overview: {
    totalRequests: 15420,
    activeUsers: 89,
    avgResponseTime: '1.2s',
    successRate: 94.7,
    costPerRequest: '$0.0024',
    uptime: '99.9%'
  },
  trends: [
    { date: '2024-01-01', requests: 1200, users: 45, responseTime: 1.1 },
    { date: '2024-01-02', requests: 1350, users: 52, responseTime: 1.3 },
    { date: '2024-01-03', requests: 1180, users: 48, responseTime: 1.0 },
    { date: '2024-01-04', requests: 1420, users: 61, responseTime: 1.4 },
    { date: '2024-01-05', requests: 1380, users: 58, responseTime: 1.2 },
    { date: '2024-01-06', requests: 1520, users: 67, responseTime: 1.1 },
    { date: '2024-01-07', requests: 1680, users: 72, responseTime: 1.3 }
  ],
  agentPerformance: [
    { name: 'Data Analyst', requests: 2450, successRate: 96.2, avgTime: '1.1s' },
    { name: 'Code Reviewer', requests: 1890, successRate: 94.8, avgTime: '0.9s' },
    { name: 'Content Writer', requests: 3210, successRate: 92.1, avgTime: '1.8s' },
    { name: 'Research Assistant', requests: 1560, successRate: 97.5, avgTime: '1.4s' }
  ],
  modelUsage: [
    { model: 'GPT-4', requests: 4560, cost: 234.50, tokens: 890000 },
    { model: 'Claude-3', requests: 3870, cost: 189.20, tokens: 756000 },
    { model: 'Gemini Pro', requests: 2980, cost: 145.80, tokens: 623000 },
    { model: 'GPT-3.5', requests: 4120, cost: 98.40, tokens: 412000 }
  ]
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Performance</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your AI system's performance and usage
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -0.3s from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Performance metrics by agent type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.agentPerformance.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Brain className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.requests} requests</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{agent.successRate}% success</p>
                      <p className="text-xs text-muted-foreground">{agent.avgTime} avg</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Overall system performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uptime</span>
                    <span className="font-medium">{analyticsData.overview.uptime}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span className="font-medium">84%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Model Usage Distribution</CardTitle>
                <CardDescription>Requests by AI model</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.modelUsage.map((model, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">{model.model}</p>
                        <p className="text-sm text-muted-foreground">{model.tokens.toLocaleString()} tokens</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{model.requests.toLocaleString()} requests</p>
                      <p className="text-xs text-muted-foreground">${model.cost}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Times</CardTitle>
                <CardDescription>Usage patterns throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '9:00 AM - 11:00 AM', usage: 85, label: 'Morning Peak' },
                    { time: '2:00 PM - 4:00 PM', usage: 92, label: 'Afternoon Peak' },
                    { time: '7:00 PM - 9:00 PM', usage: 78, label: 'Evening' },
                    { time: '12:00 AM - 6:00 AM', usage: 34, label: 'Overnight' }
                  ].map((period, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{period.label}</span>
                        <span>{period.usage}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${period.usage}%` }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{period.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,247.50</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +15.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost per Request</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.costPerRequest}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingDown className="inline h-3 w-3 mr-1" />
                  -5.2% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Token Efficiency</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.5%</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +3.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROI</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324%</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12.8% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown by Service</CardTitle>
              <CardDescription>Monthly spending by AI provider and service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.modelUsage.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="font-medium">{model.model}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{model.requests.toLocaleString()}</div>
                        <div className="text-muted-foreground">requests</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{model.tokens.toLocaleString()}</div>
                        <div className="text-muted-foreground">tokens</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-green-600">${model.cost}</div>
                        <div className="text-muted-foreground">cost</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Trends (Last 7 Days)</CardTitle>
              <CardDescription>Daily request volume and user activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.trends.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium w-24">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{day.requests}</div>
                          <div className="text-xs text-muted-foreground">requests</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{day.users}</div>
                          <div className="text-xs text-muted-foreground">users</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{day.responseTime}s</div>
                          <div className="text-xs text-muted-foreground">avg time</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-32">
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${(day.requests / 1700) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}