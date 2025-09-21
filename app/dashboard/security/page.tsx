import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Lock,
  Key,
  User,
  Activity,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  FileText
} from 'lucide-react';

const securityMetrics = {
  threats: [
    { id: '1', type: 'Brute Force', severity: 'high', source: '192.168.1.100', attempts: 45, blocked: true, time: '5 min ago' },
    { id: '2', type: 'SQL Injection', severity: 'critical', source: '10.0.0.50', attempts: 12, blocked: true, time: '12 min ago' },
    { id: '3', type: 'XSS Attempt', severity: 'medium', source: '203.0.113.5', attempts: 3, blocked: true, time: '1 hour ago' }
  ],
  accessLogs: [
    { user: 'admin@agnogui.com', action: 'Login', ip: '192.168.1.10', location: 'São Paulo, BR', time: '2 min ago', status: 'success' },
    { user: 'user@agnogui.com', action: 'API Access', ip: '10.0.0.15', location: 'Rio de Janeiro, BR', time: '5 min ago', status: 'success' },
    { user: 'unknown', action: 'Login Attempt', ip: '203.0.113.195', location: 'Unknown', time: '8 min ago', status: 'failed' }
  ],
  policies: [
    { name: 'Password Policy', status: 'active', lastUpdated: '2 days ago', compliance: 98 },
    { name: 'API Rate Limiting', status: 'active', lastUpdated: '1 week ago', compliance: 95 },
    { name: 'IP Whitelisting', status: 'active', lastUpdated: '3 days ago', compliance: 92 },
    { name: 'Two-Factor Auth', status: 'inactive', lastUpdated: '1 month ago', compliance: 0 }
  ]
};

export default function SecurityPage() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      case 'blocked': return <Badge className="bg-blue-100 text-blue-800">Blocked</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
          <p className="text-muted-foreground">
            Monitor security threats, manage access controls, and maintain compliance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Security Scan
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threat Level</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Low</div>
            <p className="text-xs text-muted-foreground">
              System is secure
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Currently logged in
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              Security policies
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="threats" className="space-y-6">
        <TabsList>
          <TabsTrigger value="threats">Threats ({securityMetrics.threats.length})</TabsTrigger>
          <TabsTrigger value="access">Access Logs</TabsTrigger>
          <TabsTrigger value="policies">Security Policies</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Threats</CardTitle>
              <CardDescription>Blocked attacks and security incidents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityMetrics.threats.map((threat) => (
                <div key={threat.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`}></div>
                    <div>
                      <p className="font-medium">{threat.type}</p>
                      <p className="text-sm text-muted-foreground">
                        From {threat.source} • {threat.attempts} attempts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={
                      threat.severity === 'critical' ? 'destructive' :
                      threat.severity === 'high' ? 'destructive' : 'secondary'
                    }>
                      {threat.severity}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{threat.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Control Logs</CardTitle>
              <CardDescription>Authentication and authorization events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityMetrics.accessLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {log.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">{log.user}</p>
                        <p className="text-sm text-muted-foreground">{log.action}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{log.location}</p>
                      <p className="text-xs text-muted-foreground">{log.ip}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(log.status)}
                      <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <div className="grid gap-6">
            {securityMetrics.policies.map((policy, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{policy.name}</CardTitle>
                      <CardDescription>Last updated {policy.lastUpdated}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                        {policy.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Level</span>
                      <span>{policy.compliance}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className={`bg-primary h-2 rounded-full`} style={{ width: `${policy.compliance}%` }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Security Reports</CardTitle>
                <CardDescription>Automated security assessment reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Weekly Security Report</p>
                      <p className="text-sm text-muted-foreground">Generated 2 days ago</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Vulnerability Assessment</p>
                      <p className="text-sm text-muted-foreground">Generated 1 week ago</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
                <CardDescription>Key security performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>False Positive Rate</span>
                    <span className="font-medium">2.1%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '2.1%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Response Time</span>
                    <span className="font-medium">3.2s</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Threat Detection Rate</span>
                    <span className="font-medium">98.7%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '98.7%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}