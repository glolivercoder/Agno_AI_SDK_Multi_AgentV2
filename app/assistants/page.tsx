import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Play, Pause, Settings, Eye } from 'lucide-react';

// Mock data for user's assistants
const userAssistants = [
  {
    id: '1',
    name: 'Marketing Writer',
    type: 'Content Creator',
    status: 'active',
    lastUsed: '2 hours ago',
    tasksCompleted: 45,
    description: 'Creates blog posts, social media content, and marketing materials'
  },
  {
    id: '2',
    name: 'Data Insights',
    type: 'Data Analyst',
    status: 'idle',
    lastUsed: '1 day ago',
    tasksCompleted: 23,
    description: 'Analyzes spreadsheets and creates data visualizations'
  }
];

export default function AssistantsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My AI Assistants</h1>
            <p className="text-muted-foreground mt-2">
              Manage and monitor your AI assistants
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              New Assistant
            </Link>
          </Button>
        </div>

        {/* Assistants Grid */}
        {userAssistants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userAssistants.map((assistant) => (
              <Card key={assistant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        assistant.status === 'active' ? 'bg-green-500' :
                        assistant.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`} />
                      <CardTitle className="text-lg">{assistant.name}</CardTitle>
                    </div>
                    <Badge variant={assistant.status === 'active' ? 'default' : 'secondary'}>
                      {assistant.status}
                    </Badge>
                  </div>
                  <CardDescription>{assistant.type}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {assistant.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last used:</span>
                    <span>{assistant.lastUsed}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tasks completed:</span>
                    <span className="font-medium">{assistant.tasksCompleted}</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      {assistant.status === 'active' ? (
                        <Pause className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Plus className="h-12 w-12 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">No assistants yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Create your first AI assistant to start automating your tasks
              </p>
            </div>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/create">
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Assistant
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}