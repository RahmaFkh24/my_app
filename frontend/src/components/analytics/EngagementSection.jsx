
        import React from 'react';
        import { motion } from 'framer-motion';
        import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
        import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
        import AnimatedCounter from '@/components/AnimatedCounter';
        import { Progress } from "@/components/ui/progress";
        import { ThumbsUp, MessageSquare, Share2, PieChart } from 'lucide-react';

        // Placeholder for chart component - Replace later
        const ChartPlaceholder = ({ title, height = "h-64" }) => (
            <div className={`${height} bg-secondary rounded flex items-center justify-center text-muted-foreground italic border border-dashed`}>
                {title} Placeholder
            </div>
        );

        // Simple visual bar chart simulation
        const SimpleBarChart = ({ data, title }) => (
            <div className="h-48 flex items-end justify-around gap-2 p-4 border rounded bg-secondary/50">
                <h4 className="absolute top-2 left-2 text-xs font-medium text-muted-foreground">{title}</h4>
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div
                            className="w-3/4 bg-gradient-to-t from-primary/50 to-primary/90 rounded-t hover:opacity-80 transition-opacity"
                            style={{ height: `${item.value}%` }}
                            title={`${item.label}: ${item.value}%`}
                        />
                        <span className="text-xs mt-1 text-muted-foreground">{item.label}</span>
                    </div>
                ))}
            </div>
        );

        // Simple visual line chart simulation
        const SimpleLineChart = ({ data, title }) => (
            <div className="h-48 p-4 border rounded bg-secondary/50 relative">
                 <h4 className="absolute top-2 left-2 text-xs font-medium text-muted-foreground">{title}</h4>
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                    {/* Render dummy lines or points */}
                    <polyline points="5,45 25,20 45,35 65,10 85,25 95,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                    {/* Render dummy points */}
                    <circle cx="25" cy="20" r="1" fill="hsl(var(--primary))" />
                    <circle cx="65" cy="10" r="1" fill="hsl(var(--primary))" />
                    <circle cx="95" cy="20" r="1" fill="hsl(var(--primary))" />
                     {/* Axis lines */}
                    <line x1="0" y1="50" x2="100" y2="50" stroke="hsl(var(--border))" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2="0" y2="50" stroke="hsl(var(--border))" strokeWidth="0.5" />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-muted-foreground">
                    <span>Start</span>
                    <span>Mid</span>
                    <span>End</span>
                 </div>
            </div>
        );


        const itemVariants = {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        };

        const EngagementSection = ({ data, timeFrame, setTimeFrame }) => {
             const { likes, likesChange, comments, commentsChange, shares, sharesChange, likesPercent, commentsPercent, sharesPercent } = data;

              // Mock data for charts
              const weeklyEngagementData = [
                { label: 'Mon', value: 60 }, { label: 'Tue', value: 65 }, { label: 'Wed', value: 75 },
                { label: 'Thu', value: 80 }, { label: 'Fri', value: 78 }, { label: 'Sat', value: 90 }, { label: 'Sun', value: 70 },
              ];
               const weeklyFollowerData = [
                { label: 'Mon', value: 30 }, { label: 'Tue', value: 35 }, { label: 'Wed', value: 40 },
                { label: 'Thu', value: 45 }, { label: 'Fri', value: 50 }, { label: 'Sat', value: 55 }, { label: 'Sun', value: 80 }, // Peak Sunday
               ];

            return (
                <motion.section variants={itemVariants}>
                    <h2 className="text-xl font-semibold mb-4">Engagement Insights</h2>
                    <Tabs value={timeFrame} onValueChange={setTimeFrame}>
                        <div className="flex justify-end mb-4">
                            <TabsList>
                                <TabsTrigger value="trends">Trends</TabsTrigger>
                                <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                                <TabsTrigger value="monthly">Last 30 Days</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="trends" className="mt-4 space-y-6">
                            <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Weekly Engagement Trend</CardTitle>
                                        <CardDescription>Activity patterns across the week.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                         <SimpleLineChart data={weeklyEngagementData} title="Engagement"/>
                                         <ul className="mt-4 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                                            <li>Gradual increase throughout the week.</li>
                                            <li>Highest activity on <span className="font-semibold text-primary">Saturday</span>.</li>
                                            <li>Strong engagement also on <span className="font-semibold text-primary">Thursday, Friday, Wednesday</span>.</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Weekly Follower Growth</CardTitle>
                                        <CardDescription>New followers gained each week.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                         <SimpleBarChart data={weeklyFollowerData} title="New Followers"/>
                                         <ul className="mt-4 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                                            <li>Consistent growth during the week.</li>
                                            <li>Peak growth on <span className="font-semibold text-primary">Sunday</span>.</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>
                        <TabsContent value="breakdown" className="mt-4 space-y-6">
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center"><PieChart className="mr-2 h-5 w-5" />Engagement Breakdown</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1 text-sm font-medium">
                                                <span>Likes</span>
                                                <span>{likesPercent}%</span>
                                            </div>
                                            <Progress value={likesPercent} className="h-2" indicatorClassName="bg-blue-500" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1 text-sm font-medium">
                                                <span>Comments</span>
                                                <span>{commentsPercent}%</span>
                                            </div>
                                            <Progress value={commentsPercent} className="h-2" indicatorClassName="bg-green-500" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1 text-sm font-medium">
                                                <span>Shares</span>
                                                <span>{sharesPercent}%</span>
                                            </div>
                                            <Progress value={sharesPercent} className="h-2" indicatorClassName="bg-purple-500" />
                                        </div>
                                        <ChartPlaceholder title="Engagement Donut Chart Placeholder" height="h-48" />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>
                        <TabsContent value="monthly" className="mt-4 space-y-6">
                            <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Likes (30d)</CardTitle>
                                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold"><AnimatedCounter to={likes} /></div>
                                        <p className="text-xs text-green-500">{likesChange}</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Comments (30d)</CardTitle>
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold"><AnimatedCounter to={comments} /></div>
                                        <p className="text-xs text-green-500">{commentsChange}</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Shares (30d)</CardTitle>
                                        <Share2 className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold"><AnimatedCounter to={shares} /></div>
                                        <p className="text-xs text-green-500">{sharesChange}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </motion.section>
            );
        };

        // Add indicatorClassName prop support to Progress component if needed, or apply style directly
         // Modify Progress component import to accept indicatorClassName or apply styles directly if necessary
         // Example: Updating Progress component import/usage if indicatorClassName is supported:
         // import { Progress } from "@/components/ui/progress";
         // <Progress value={likesPercent} className="h-2" indicatorClassName="bg-blue-500" />


        export default EngagementSection;
   