import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, FileText, Upload, Search, Plus } from 'lucide-react';

export default function KnowledgePage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Knowledge Base</h1>
            <p className="text-muted-foreground mt-2">
              Upload documents and data for your AI assistants to learn from
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
              <p className="text-sm text-muted-foreground">Add PDFs, documents, and data files</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Add Text</h3>
              <p className="text-sm text-muted-foreground">Paste text content directly</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Database className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Connect Data</h3>
              <p className="text-sm text-muted-foreground">Link external databases</p>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Knowledge</h2>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="text-center py-16 space-y-6">
            <Database className="h-24 w-24 text-gray-300 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-600">No knowledge base yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload documents, add text content, or connect data sources to give your AI assistants knowledge
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Document
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}