import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RealTimeStats } from '@/components/monitoring/real-time-stats';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Server,
  Database,
  Wifi,
  Cpu,
  HardDrive,
  Clock,
  Users,
  Zap,
  RefreshCw
} from 'lucide-react';

const systemMetrics = {
  servers: [
    { name: 'Primary API Server', status: 'healthy', cpu: 67, memory: 84, uptime: '99.9%', load: '2.1' },
    { name: 'Database Server', status: 'healthy', cpu: 45, memory: 72, uptime: '99.8%', load: '1.8' },
    { name: 'Worker Node 1', status: 'warning', cpu: 89, memory: 91, uptime: '99.5%', load: '3.2' },
    { name: 'Worker Node 2', status: 'healthy', cpu: 34, memory: 56, uptime: '99.9%', load: '1.1' }
  ],
  services: [
    { name: 'Agno API', status: 'healthy', responseTime: '120ms', uptime: '99.9%', requests: 15420 },
    { name: 'Authentication', status: 'healthy', responseTime: '95ms', uptime: '99.8%', requests: 3240 },
    { name: 'Database Connection', status: 'warning', responseTime: '450ms', uptime: '98.5%', requests: 8920 },
    { name: 'File Storage', status: 'healthy', responseTime: '180ms', uptime: '99.7%', requests: 1560 }
  ],
  alerts: [
    { level: 'warning', message: 'High memory usage on Worker Node 1', time: '5 min ago', service: 'Worker Node 1' },
    { level: 'info', message: 'Database query optimization completed', time: '12 min ago', service: 'Database' },
    { level: 'warning', message: 'Slow response time detected', time: '18 min ago', service: 'Database Connection' },
    { level: 'success', message: 'All systems operational', time: '1 hour ago', service: 'System' }
  ]
};

export default function MonitoringPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Monitoring</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and health checks for all system components
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Activity className="h-4 w-4 mr-2" />
            Health Check
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Healthy</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              1 warning, 1 info
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">
              Average across all services
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="servers">Servers</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="alerts">Alerts ({systemMetrics.alerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Suspense fallback={<div className="text-center py-8">Loading monitoring data...</div>}>
            <RealTimeStats />
          </Suspense>
        </TabsContent>

        <TabsContent value="servers" className="space-y-6">
          <div className="grid gap-6">
            {systemMetrics.servers.map((server, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)}`}></div>
                      <div>
                        <CardTitle className="text-lg">{server.name}</CardTitle>
                        <CardDescription>Load average: {server.load}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={
                      server.status === 'healthy' ? 'default' :
                      server.status === 'warning' ? 'destructive' : 'secondary'
                    }>
                      {server.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">CPU Usage</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-16 bg-secondary rounded-full h-2">
                          <div className={`bg-primary h-2 rounded-full`} style={{ width: `${server.cpu}%` }}></div>
                        </div>
                        <span className="font-medium">{server.cpu}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Memory</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-16 bg-secondary rounded-full h-2">
                          <div className={`bg-blue-500 h-2 rounded-full`} style={{ width: `${server.memory}%` }}></div>
                        </div>
                        <span className="font-medium">{server.memory}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Uptime</span>
                      <p className="font-medium mt-1">{server.uptime}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Load</span>
                      <p className="font-medium mt-1">{server.load}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-6">
            {systemMetrics.services.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.requests.toLocaleString()} requests</CardDescription>
                      </div>
                    </div>
                    <Badge variant={
                      service.status === 'healthy' ? 'default' :
                      service.status === 'warning' ? 'destructive' : 'secondary'
                    }>
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Response Time</span>
                      <p className="font-medium">{service.responseTime}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Uptime</span>
                      <p className="font-medium">{service.uptime}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Requests</span>
                      <p className="font-medium">{service.requests.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent alerts and notifications from all system components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemMetrics.alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="mt-1">
                    {getAlertIcon(alert.level)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {alert.service} • {alert.time}
                    </p>
                  </div>
                  <Badge variant={
                    alert.level === 'success' ? 'default' :
                    alert.level === 'warning' ? 'destructive' : 'secondary'
                  }>
                    {alert.level}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}