import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Plus,
  Search,
  MessageSquare,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  UserPlus,
  Activity,
  Zap,
  Brain,
  Workflow
} from 'lucide-react';

// Mock data for teams
const teams = [
  {
    id: '1',
    name: 'Research Team',
    description: 'Collaborative research and analysis team',
    status: 'operational',
    members: 4,
    agents: ['Research Assistant', 'Data Analyst', 'Content Writer'],
    leader: 'Dr. Sarah Chen',
    projects: 8,
    successRate: 94.2,
    avgResponseTime: '1.4s',
    lastActivity: '5 min ago',
    objectives: ['Data Analysis', 'Research Synthesis', 'Report Generation'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Development Team',
    description: 'Full-stack development and coding team',
    status: 'operational',
    members: 3,
    agents: ['Code Reviewer', 'DevOps Agent', 'QA Tester'],
    leader: 'Mike Johnson',
    projects: 12,
    successRate: 91.8,
    avgResponseTime: '1.2s',
    lastActivity: '2 min ago',
    objectives: ['Code Review', 'Bug Fixes', 'Feature Development'],
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Content Creation Team',
    description: 'Creative content generation and marketing',
    status: 'degraded',
    members: 5,
    agents: ['Content Writer', 'Social Media Manager', 'SEO Specialist'],
    leader: 'Emma Davis',
    projects: 6,
    successRate: 87.5,
    avgResponseTime: '2.3s',
    lastActivity: '15 min ago',
    objectives: ['Blog Posts', 'Social Media', 'Marketing Copy'],
    createdAt: '2024-02-01'
  }
];

const collaborations = [
  {
    id: '1',
    title: 'Cross-team Research Project',
    teams: ['Research Team', 'Development Team'],
    status: 'active',
    progress: 75,
    deadline: '2024-03-15',
    participants: 7,
    lastUpdate: '1 hour ago'
  },
  {
    id: '2',
    title: 'AI Integration Initiative',
    teams: ['Development Team', 'Content Creation Team'],
    status: 'planning',
    progress: 25,
    deadline: '2024-04-01',
    participants: 8,
    lastUpdate: '3 hours ago'
  }
];

export default function TeamsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational': return <Badge className="bg-green-100 text-green-800">Operational</Badge>;
      case 'degraded': return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
      case 'down': return <Badge variant="destructive">Down</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Create and manage collaborative multi-agent teams
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Team Settings
          </Button>
          <Button asChild>
            <Link href="/dashboard/teams/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Team
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
              placeholder="Search teams by name, leader, or objectives..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>{teams.filter(t => t.status === 'operational').length} Operational</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>{teams.filter(t => t.status === 'degraded').length} Degraded</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>{teams.filter(t => t.status === 'down').length} Down</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="teams" className="space-y-6">
        <TabsList>
          <TabsTrigger value="teams">My Teams ({teams.length})</TabsTrigger>
          <TabsTrigger value="collaborations">Collaborations ({collaborations.length})</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(team.status)}`}></div>
                      <div>
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <CardDescription>{team.description}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(team.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Members</span>
                      <p className="font-medium flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {team.members}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Projects</span>
                      <p className="font-medium">{team.projects}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span>{team.successRate}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${team.successRate}%` }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Leader: {team.leader}</span>
                    <span>Last active: {team.lastActivity}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {team.objectives.slice(0, 2).map((objective, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {objective}
                      </Badge>
                    ))}
                    {team.objectives.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{team.objectives.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Activity className="h-3 w-3 mr-1" />
                      Monitor
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Team Collaborations</h2>
              <p className="text-muted-foreground">Cross-team projects and initiatives</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Collaboration
            </Button>
          </div>

          <div className="grid gap-6">
            {collaborations.map((collab) => (
              <Card key={collab.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{collab.title}</CardTitle>
                      <CardDescription>
                        Involving {collab.teams.join(', ')}
                      </CardDescription>
                    </div>
                    <Badge variant={collab.status === 'active' ? 'default' : 'secondary'}>
                      {collab.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Progress</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${collab.progress}%` }}></div>
                        </div>
                        <span className="font-medium">{collab.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Participants</span>
                      <p className="font-medium flex items-center mt-1">
                        <Users className="h-4 w-4 mr-1" />
                        {collab.participants}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Deadline</span>
                      <p className="font-medium mt-1">{collab.deadline}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Last updated: {collab.lastUpdate}
                    </span>
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Team Performance Analytics</h2>
            <p className="text-muted-foreground">Detailed performance metrics for all teams</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(team.status)}`}></div>
                      <span className="text-sm font-medium">{team.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{team.successRate}%</span>
                      <div className="w-16 bg-secondary rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${team.successRate}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{team.name}</span>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{team.avgResponseTime}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}