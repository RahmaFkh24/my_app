
    import React from 'react';
    import { motion } from 'framer-motion';
    import MetricCard from '@/components/MetricCard';
    import { ThumbsUp, MessageSquare, Share2, CalendarDays, Activity, PieChart as PieChartIcon } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
    import AnimatedCounter from '@/components/AnimatedCounter';

    const engagementMetrics = {
      likes: 8450, likesChange: "+15%",
      comments: 2356, commentsChange: "+8%",
      shares: 945, sharesChange: "+10%",
    };

    const engagementTrendsData = [
      { name: 'Mon', actions: 250 }, { name: 'Tue', value: 250, actions: 480 }, { name: 'Wed', actions: 620 },
      { name: 'Thu', actions: 750 }, { name: 'Fri', actions: 930 }, { name: 'Sat', actions: 800 }, { name: 'Sun', actions: 720 }
    ];

    const engagementBreakdownData = [
      { name: 'Likes', value: 65 }, { name: 'Comments', value: 25 }, { name: 'Shares', value: 10 }
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const sectionVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    const EngagementTab = () => {
      return (
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard title="Likes" value={<AnimatedCounter to={engagementMetrics.likes} />} icon={ThumbsUp} change={engagementMetrics.likesChange} delay={0} />
            <MetricCard title="Comments" value={<AnimatedCounter to={engagementMetrics.comments} />} icon={MessageSquare} change={engagementMetrics.commentsChange} delay={1} />
            <MetricCard title="Shares" value={<AnimatedCounter to={engagementMetrics.shares} />} icon={Share2} change={engagementMetrics.sharesChange} delay={2} />
          </motion.div>

          <Tabs defaultValue="weekly" className="w-full">
            <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center"><Activity className="mr-2 h-5 w-5 text-primary" />Engagement Trends</CardTitle>
                            <CardDescription>Activity over time</CardDescription>
                        </div>
                        <TabsList className="grid grid-cols-3 gap-1 bg-muted p-1 rounded-lg">
                            <TabsTrigger value="weekly">Weekly</TabsTrigger>
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="distribution" disabled>Distribution</TabsTrigger>
                        </TabsList>
                    </CardHeader>
                    <CardContent>
                        <TabsContent value="weekly">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={engagementTrendsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                        cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                                    />
                                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                                    <Line type="monotone" dataKey="actions" name="Engagement Actions" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </TabsContent>
                        <TabsContent value="monthly">
                             <div className="h-[300px] flex items-center justify-center text-muted-foreground italic">Monthly engagement data coming soon.</div>
                        </TabsContent>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><PieChartIcon className="mr-2 h-5 w-5 text-purple-500" />Engagement Breakdown</CardTitle>
                  <CardDescription>Types of engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={engagementBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {engagementBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Legend wrapperStyle={{fontSize: "12px"}}/>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Tabs>
        </motion.div>
      );
    };

    export default EngagementTab;
  