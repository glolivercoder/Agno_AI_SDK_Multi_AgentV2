'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  Brain,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'busy' | 'error';
  cpu: number;
  memory: number;
  responseTime: number;
  requests: number;
  lastActive: string;
}

interface Team {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down';
  agents: number;
  successRate: number;
  avgResponse: number;
}

export function RealTimeStats() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: '1', name: 'Data Analyst', status: 'active', cpu: 45, memory: 67, responseTime: 1.2, requests: 1250, lastActive: '2s ago' },
    { id: '2', name: 'Code Reviewer', status: 'idle', cpu: 12, memory: 34, responseTime: 0.8, requests: 890, lastActive: '15s ago' },
    { id: '3', name: 'Research Agent', status: 'busy', cpu: 78, memory: 89, responseTime: 2.1, requests: 2100, lastActive: '1s ago' },
    { id: '4', name: 'Content Writer', status: 'active', cpu: 56, memory: 71, responseTime: 1.5, requests: 1670, lastActive: '3s ago' },
  ]);

  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'Research Team', status: 'operational', agents: 3, successRate: 94.2, avgResponse: 1.4 },
    { id: '2', name: 'Development Team', status: 'operational', agents: 2, successRate: 91.8, avgResponse: 1.2 },
    { id: '3', name: 'Analysis Team', status: 'degraded', agents: 4, successRate: 87.5, avgResponse: 2.3 },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        cpu: Math.max(0, Math.min(100, agent.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, agent.memory + (Math.random() - 0.5) * 5)),
        requests: agent.requests + Math.floor(Math.random() * 10),
        lastActive: '1s ago',
        status: Math.random() > 0.9 ? 'error' : agent.status
      })));

      setTeams(prev => prev.map(team => ({
        ...team,
        successRate: Math.max(0, Math.min(100, team.successRate + (Math.random() - 0.5) * 2)),
        avgResponse: Math.max(0.1, team.avgResponse + (Math.random() - 0.5) * 0.3),
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'idle': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      case 'operational': return 'text-green-600';
      case 'degraded': return 'text-yellow-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3" />;
      case 'busy': return <Clock className="h-3 w-3" />;
      case 'idle': return <Activity className="h-3 w-3" />;
      case 'error': return <AlertTriangle className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.filter(a => a.status === 'active' || a.status === 'busy').length}
            </div>
            <p className="text-xs text-muted-foreground">
              of {agents.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(agents.reduce((sum, a) => sum + a.responseTime, 0) / agents.length).toFixed(1)}s
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -0.2s from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(teams.reduce((sum, t) => sum + t.successRate, 0) / teams.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2.1% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.reduce((sum, a) => sum + a.requests, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Teams Status */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Real-time status of all agent teams</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(team.status)}`} />
                <div>
                  <h4 className="font-medium">{team.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {team.agents} agents • {team.avgResponse.toFixed(1)}s avg response
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium">{team.successRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <Badge variant={team.status === 'operational' ? 'default' : 'destructive'}>
                  {team.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Individual Agent Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Monitoring</CardTitle>
          <CardDescription>Real-time resource usage and status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(agent.status)}
                  <span className="font-medium">{agent.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {agent.status}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{agent.lastActive}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>CPU</span>
                    <span>{agent.cpu.toFixed(1)}%</span>
                  </div>
                  <Progress value={agent.cpu} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Memory</span>
                    <span>{agent.memory.toFixed(1)}%</span>
                  </div>
                  <Progress value={agent.memory} className="h-2" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{agent.requests.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">requests</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}