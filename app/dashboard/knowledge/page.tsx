import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Database,
  Plus,
  Search,
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Tag,
  Brain,
  MessageSquare
} from 'lucide-react';

const knowledgeBase = [
  {
    id: '1',
    title: 'Machine Learning Best Practices',
    type: 'Document',
    category: 'Technical',
    size: '2.4 MB',
    lastModified: '2 days ago',
    author: 'Dr. Sarah Chen',
    tags: ['ML', 'AI', 'Best Practices'],
    accessCount: 245,
    description: 'Comprehensive guide to ML development and deployment'
  },
  {
    id: '2',
    title: 'API Integration Patterns',
    type: 'Guide',
    category: 'Development',
    size: '1.8 MB',
    lastModified: '1 week ago',
    author: 'Mike Johnson',
    tags: ['API', 'Integration', 'Development'],
    accessCount: 189,
    description: 'Common patterns for API integration and management'
  },
  {
    id: '3',
    title: 'Content Strategy Framework',
    type: 'Template',
    category: 'Marketing',
    size: '956 KB',
    lastModified: '3 days ago',
    author: 'Emma Davis',
    tags: ['Content', 'Strategy', 'Marketing'],
    accessCount: 156,
    description: 'Framework for creating effective content strategies'
  }
];

const categories = ['All', 'Technical', 'Development', 'Marketing', 'Research', 'Design'];

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Centralized repository for documentation, guides, and resources
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Article
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search knowledge base..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {categories.slice(0, 4).map((category) => (
            <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="documents">Documents ({knowledgeBase.length})</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {knowledgeBase.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Category</span>
                      <p className="font-medium">{item.category}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size</span>
                      <p className="font-medium">{item.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Author</span>
                    <span className="font-medium">{item.author}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Modified {item.lastModified}</span>
                    <span>{item.accessCount} views</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(1).map((category) => (
              <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>{category}</span>
                  </CardTitle>
                  <CardDescription>
                    Documents and resources in {category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {Math.floor(Math.random() * 50) + 10}
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2m</div>
                <p className="text-xs text-muted-foreground">-2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2GB</div>
                <p className="text-xs text-muted-foreground">85% capacity</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}