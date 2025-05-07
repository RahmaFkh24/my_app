import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Facebook, Instagram, Twitter, Linkedin, Filter, CalendarDays, Edit, Trash2, CheckCircle, Clock, XCircle, FileText, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

const initialPosts = [
  { id: 1, content: 'Exciting news! We launched our new feature today.', thumbnail: null, platforms: ['facebook'], status: 'Published', date: new Date(2025, 4, 1, 10, 30) },
  { id: 3, content: 'Quick tip for boosting engagement on Instagram!', thumbnail: null, platforms: ['instagram'], status: 'Published', date: new Date(2025, 3, 28, 9, 0) },
  { id: 4, content: 'Attempted post failed due to API issues.', thumbnail: null, platforms: ['facebook'], status: 'Failed', date: new Date(2025, 4, 1, 11, 0) },
];

const platformMap = { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin };
const platformColors = { facebook: 'text-blue-600', instagram: 'text-pink-500', twitter: 'text-blue-400', linkedin: 'text-blue-700' };
const statusMap = { Published: CheckCircle, Scheduled: Clock, Failed: XCircle };
const statusColorMap = { Published: 'bg-green-100 text-green-800', Scheduled: 'bg-blue-100 text-blue-800', Failed: 'bg-red-100 text-red-800' };

const PostsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
    const processedPosts = storedPosts.map(post => ({
      ...post,
      date: new Date(post.date),
      platformIcons: post.platforms.map(p => platformMap[p]).filter(Boolean),
      statusIcon: statusMap[post.status] || FileText,
      statusColor: statusColorMap[post.status] || 'bg-gray-100 text-gray-800'
    })).sort((a, b) => b.date - a.date);

    setPosts(processedPosts.length > 0 ? processedPosts : initialPosts.map(post => ({
      ...post,
      date: new Date(post.date),
      platformIcons: post.platforms.map(p => platformMap[p]).filter(Boolean),
      statusIcon: statusMap[post.status] || FileText,
      statusColor: statusColorMap[post.status] || 'bg-gray-100 text-gray-800'
    })));
  }, []);

  const filteredPosts = posts.filter(post => {
    const platformMatch = platformFilter === 'all' || post.platforms.includes(platformFilter);
    const statusMatch = statusFilter === 'all' || post.status === statusFilter;
    return platformMatch && statusMatch;
  });

  const handleDelete = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    try {
      const storedPosts = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
      const updatedPosts = storedPosts.filter(p => p.id !== id);
      localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts));
      toast({
        title: "Post Deleted",
        description: "The post has been removed.",
        variant: "destructive"
      });
    } catch {
      toast({
        title: "Error Deleting Post",
        description: "Could not update stored posts. Please refresh.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (postId) => {
    navigate('/scheduler');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">All Posts</h1>
        <Button onClick={() => navigate('/scheduler')}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center p-4 bg-card rounded-lg shadow-sm">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="hidden md:inline-flex">
          <CalendarDays className="mr-2 h-4 w-4" /> Date Range
        </Button>
      </div>

      {/* Posts Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Media</TableHead>
              <TableHead className="min-w-[200px]">Content</TableHead>
              <TableHead>Platforms</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? filteredPosts.map((post) => (
              <tr key={post.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  {post.thumbnail?.startsWith('data:image') ? (
                    <img src={post.thumbnail} alt="Post thumbnail" className="h-10 w-10 object-cover rounded-sm" />
                  ) : post.thumbnail?.startsWith('data:video') ? (
                    <div className="h-10 w-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground">
                      <FileText size={16} />
                    </div>
                  ) : (
                    <div className="h-10 w-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground">
                      <FileText size={16} />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium max-w-xs truncate">{post.content}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {post.platforms.map(platformId => {
                      const Icon = platformMap[platformId];
                      return Icon ? <Icon key={platformId} className={`h-5 w-5 ${platformColors[platformId] || 'text-muted-foreground'}`} /> : null;
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`border-0 ${post.statusColor}`}>
                    {post.statusIcon && <post.statusIcon className="h-3 w-3 mr-1" />}
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(post.date, 'PPp')}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => handleEdit(post.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </tr>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {posts.length === 0 ? "No posts created yet. Click 'Create New Post' to start!" : "No posts found matching your filters."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default PostsPage;