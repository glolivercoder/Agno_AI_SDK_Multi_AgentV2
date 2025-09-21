import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Workflow,
  Plus,
  Play,
  Pause,
  Settings,
  Eye,
  Edit,
  Copy,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  GitBranch,
  Zap
} from 'lucide-react';

// Mock data for workflows
const workflows = [
  {
    id: '1',
    name: 'Data Processing Pipeline',
    description: 'Automated data extraction, cleaning, and analysis workflow',
    status: 'running',
    steps: 8,
    completedSteps: 6,
    duration: '45 min',
    lastRun: '2 hours ago',
    successRate: 94.2,
    triggers: ['File Upload', 'API Call'],
    agents: ['Data Analyst', 'Research Assistant'],
    createdBy: 'John Doe',
    tags: ['Data', 'Automation', 'Analytics']
  },
  {
    id: '2',
    name: 'Content Generation Suite',
    description: 'Multi-step content creation and publishing workflow',
    status: 'idle',
    steps: 12,
    completedSteps: 0,
    duration: '2 hours',
    lastRun: '1 day ago',
    successRate: 88.5,
    triggers: ['Schedule', 'Webhook'],
    agents: ['Content Writer', 'SEO Specialist'],
    createdBy: 'Jane Smith',
    tags: ['Content', 'Marketing', 'Publishing']
  },
  {
    id: '3',
    name: 'Code Review Pipeline',
    description: 'Automated code quality checks and review process',
    status: 'completed',
    steps: 6,
    completedSteps: 6,
    duration: '15 min',
    lastRun: '30 min ago',
    successRate: 96.7,
    triggers: ['Git Push', 'PR Created'],
    agents: ['Code Reviewer', 'QA Tester'],
    createdBy: 'Mike Johnson',
    tags: ['Code', 'Quality', 'DevOps']
  }
];

const workflowTemplates = [
  {
    id: '1',
    name: 'Data ETL Pipeline',
    description: 'Extract, Transform, Load data processing workflow',
    category: 'Data Processing',
    complexity: 'Medium',
    estimatedTime: '30 min'
  },
  {
    id: '2',
    name: 'Content Approval Flow',
    description: 'Content creation with multi-step approval process',
    category: 'Content',
    complexity: 'High',
    estimatedTime: '2 hours'
  },
  {
    id: '3',
    name: 'CI/CD Pipeline',
    description: 'Continuous integration and deployment workflow',
    category: 'DevOps',
    complexity: 'High',
    estimatedTime: '1 hour'
  }
];

export default function WorkflowsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'idle': return 'bg-gray-500';
      case 'completed': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running': return <Badge className="bg-green-100 text-green-800">Running</Badge>;
      case 'idle': return <Badge variant="secondary">Idle</Badge>;
      case 'completed': return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Designer</h1>
          <p className="text-muted-foreground">
            Create and manage automated multi-step workflows
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Workflow Settings
          </Button>
          <Button asChild>
            <Link href="/dashboard/workflows/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workflows">My Workflows ({workflows.length})</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="executions">Executions</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          <div className="grid gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`}></div>
                      <div>
                        <CardTitle className="text-xl">{workflow.name}</CardTitle>
                        <CardDescription>{workflow.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(workflow.status)}
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Progress</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full"
                               style={{ width: `${(workflow.completedSteps / workflow.steps) * 100}%` }}></div>
                        </div>
                        <span className="font-medium">{workflow.completedSteps}/{workflow.steps}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration</span>
                      <p className="font-medium flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {workflow.duration}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success Rate</span>
                      <p className="font-medium mt-1">{workflow.successRate}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Run</span>
                      <p className="font-medium mt-1">{workflow.lastRun}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Triggers:</span>
                      {workflow.triggers.map((trigger, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {workflow.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        {workflow.status === 'running' ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                        {workflow.status === 'running' ? 'Pause' : 'Run'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Workflow Templates</h2>
              <p className="text-muted-foreground">Pre-built workflow templates for common use cases</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflowTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Complexity</span>
                    <Badge variant={
                      template.complexity === 'High' ? 'destructive' :
                      template.complexity === 'Medium' ? 'default' : 'secondary'
                    }>
                      {template.complexity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Est. Time</span>
                    <span className="font-medium">{template.estimatedTime}</span>
                  </div>
                  <Button className="w-full">
                    <Copy className="h-3 w-3 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="executions" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Execution History</h2>
            <p className="text-muted-foreground">Recent workflow executions and their results</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { workflow: 'Data Processing Pipeline', status: 'success', duration: '45 min', started: '2 hours ago' },
                { workflow: 'Code Review Pipeline', status: 'success', duration: '15 min', started: '30 min ago' },
                { workflow: 'Content Generation Suite', status: 'failed', duration: '1 hour', started: '1 day ago' },
                { workflow: 'Data Processing Pipeline', status: 'success', duration: '42 min', started: '1 day ago' },
              ].map((execution, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      execution.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium">{execution.workflow}</p>
                      <p className="text-sm text-muted-foreground">Started {execution.started}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{execution.duration}</p>
                      <Badge variant={execution.status === 'success' ? 'default' : 'destructive'}>
                        {execution.status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}