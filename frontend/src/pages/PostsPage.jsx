
    import React, { useState, useEffect } from 'react'; // Import useEffect
    import { motion, AnimatePresence } from 'framer-motion';
    import { useNavigate } from 'react-router-dom'; // Import useNavigate
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Badge } from '@/components/ui/badge';
    import { Card } from '@/components/ui/card';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Facebook, Instagram, Twitter, Linkedin, Filter, CalendarDays, Edit, Trash2, CheckCircle, Clock, XCircle, FileText, PlusCircle } from 'lucide-react'; // Import PlusCircle
    import { format } from 'date-fns';
    import { useToast } from "@/components/ui/use-toast";

    // Mock Data (Initial load, will be supplemented/replaced by localStorage)
    const initialPosts = [
      // Keep some initial data for fallback or initial view
      { id: 1, content: 'Exciting news! We launched our new feature today.', thumbnail: null, platforms: ['facebook'], status: 'Published', date: new Date(2025, 4, 1, 10, 30), platformIcons: [Facebook], statusIcon: CheckCircle, statusColor: 'bg-green-100 text-green-800' },
      { id: 3, content: 'Quick tip for boosting engagement on Instagram!', thumbnail: null, platforms: ['instagram'], status: 'Published', date: new Date(2025, 3, 28, 9, 0), platformIcons: [Instagram], statusIcon: CheckCircle, statusColor: 'bg-green-100 text-green-800' },
      { id: 4, content: 'Attempted post failed due to API issues.', thumbnail: null, platforms: ['facebook'], status: 'Failed', date: new Date(2025, 4, 1, 11, 0), platformIcons: [Facebook], statusIcon: XCircle, statusColor: 'bg-red-100 text-red-800' },
    ];

    const platformMap = { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin };
    const platformColors = { facebook: 'text-blue-600', instagram: 'text-pink-500', twitter: 'text-blue-400', linkedin: 'text-blue-700' };
    const statusMap = { Published: CheckCircle, Scheduled: Clock, Failed: XCircle };
    const statusColorMap = { Published: 'bg-green-100 text-green-800', Scheduled: 'bg-blue-100 text-blue-800', Failed: 'bg-red-100 text-red-800' };

    const PostsPage = () => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const [posts, setPosts] = useState([]); // Start with empty array
      const [platformFilter, setPlatformFilter] = useState('all');
      const [statusFilter, setStatusFilter] = useState('all');
      // Add date range filter state if needed

      useEffect(() => {
         // Load posts from localStorage on component mount
         const storedPosts = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
         // Combine with initial if needed, or replace entirely. Here, we replace.
         // Add visual properties needed for display
         const processedPosts = storedPosts.map(post => ({
             ...post,
             date: new Date(post.date), // Ensure date is a Date object
             platformIcons: post.platforms.map(p => platformMap[p]).filter(Boolean),
             statusIcon: statusMap[post.status] || FileText,
             statusColor: statusColorMap[post.status] || 'bg-gray-100 text-gray-800'
         })).sort((a, b) => b.date - a.date); // Sort by date descending initially

         // If localStorage is empty, you might want to load initialPosts as fallback
         setPosts(processedPosts.length > 0 ? processedPosts : initialPosts.map(post => ({...post, date: new Date(post.date)})));

      }, []);


      const filteredPosts = posts.filter(post => {
        const platformMatch = platformFilter === 'all' || post.platforms.includes(platformFilter);
        const statusMatch = statusFilter === 'all' || post.status === statusFilter;
        // Add date range match logic here if implementing
        return platformMatch && statusMatch;
      });

       const handleDelete = (id) => {
           // Update state optimistically
           setPosts(prev => prev.filter(p => p.id !== id));

           // Update localStorage
            try {
               const storedPosts = JSON.parse(localStorage.getItem('scheduledPosts') || '[]');
               const updatedPosts = storedPosts.filter(p => p.id !== id);
               localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts));
                toast({
                  title: "Post Deleted",
                  description: "The post has been removed.",
                  variant: "destructive" // Use destructive variant for deletion confirmation
                });
            } catch (error) {
                 toast({
                    title: "Error Deleting Post",
                    description: "Could not update stored posts. Please refresh.",
                    variant: "destructive",
                 });
                 // Optionally revert state update here if localStorage fails
            }
       };

       // Navigate to scheduler for editing (pass ID or state)
       const handleEdit = (postId) => {
           // For now, just navigates to the scheduler.
           // A real implementation might pass the post ID as a URL param
           // or use state management to pre-fill the scheduler form.
           navigate('/scheduler'); // Add ?edit=postId later if needed
       };


        const containerVariants = {
           hidden: { opacity: 0 },
           visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
         };

         const itemVariants = {
           hidden: { opacity: 0, y: 20 },
           visible: { opacity: 1, y: 0 },
           exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
         };


      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
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
                    {/* <SelectItem value="twitter">Twitter</SelectItem> */}
                    {/* <SelectItem value="linkedin">LinkedIn</SelectItem> */}
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
            {/* Placeholder for Date Range Picker */}
             <Button variant="outline" className="hidden md:inline-flex">
                <CalendarDays className="mr-2 h-4 w-4" /> Date Range
             </Button>
          </div>

          {/* Posts Table */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
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
                    <AnimatePresence initial={false}>
                      {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                        <motion.tr
                          key={post.id}
                          layout // Enable layout animation
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="hover:bg-muted/50 transition-colors"
                         >
                          <TableCell>
                            {post.thumbnail && post.thumbnail.startsWith('data:image') ? (
                               <img-replace src={post.thumbnail} alt="Post thumbnail" className="h-10 w-10 object-cover rounded-sm"/>
                             ) : post.thumbnail && post.thumbnail.startsWith('data:video') ? (
                                <div className="h-10 w-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground">
                                    <FileText size={16}/> {/* Placeholder for video */}
                                </div>
                             ) : (
                               <div className="h-10 w-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground">
                                  <FileText size={16}/>
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
                             <motion.div className="flex justify-end space-x-2" initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: 0.2}}>
                                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => handleEdit(post.id)}>
                                    <Edit className="h-4 w-4" />
                                 </Button>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(post.id)}>
                                    <Trash2 className="h-4 w-4" />
                                 </Button>
                             </motion.div>
                          </TableCell>
                         </motion.tr>
                      )) : (
                         <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              {posts.length === 0 ? "No posts created yet. Click 'Create New Post' to start!" : "No posts found matching your filters."}
                            </TableCell>
                         </TableRow>
                      )}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </Card>
          </motion.div>

        </motion.div>
      );
    };

    export default PostsPage;
  