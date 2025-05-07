
    import React from 'react';
    import { motion } from 'framer-motion';
    import MetricCard from '@/components/MetricCard';
    import { Users, Activity, FileText, TrendingUp, BarChartHorizontalBig } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
    import AnimatedCounter from '@/components/AnimatedCounter';

    const overviewData = {
      totalFollowers: 25645, followerChange: "+12%",
      engagementRate: 5.7, engagementChange: "+2.3%",
      totalPosts: 340, postChange: "+10%",
      avgReach: 12450, reachChange: "+5%"
    };

    const platformPerformanceData = [
      { name: 'Mon', value: 90 }, { name: 'Tue', value: 150 }, { name: 'Wed', value: 200 },
      { name: 'Thu', value: 320 }, { name: 'Fri', value: 250 }, { name: 'Sat', value: 180 }, { name: 'Sun', value: 140 }
    ];

    const followerGrowthData = [
      { name: 'Mon', value: 12500 }, { name: 'Tue', value: 12550 }, { name: 'Wed', value: 12600 },
      { name: 'Thu', value: 12680 }, { name: 'Fri', value: 12750 }, { name: 'Sat', value: 12800 }, { name: 'Sun', value: 12840 }
    ];
    const platformColors = ["#8884d8", "#82ca9d", "#ffc658", "#FF8042", "#0088FE", "#00C49F", "#FFBB28"];


    const sectionVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    const OverviewTab = () => {
      return (
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="Total Followers" value={<AnimatedCounter to={overviewData.totalFollowers} />} icon={Users} change={overviewData.followerChange} delay={0} />
            <MetricCard title="Engagement Rate" value={<><AnimatedCounter to={overviewData.engagementRate} />%</>} icon={Activity} change={overviewData.engagementChange} delay={1} />
            <MetricCard title="Total Posts" value={<AnimatedCounter to={overviewData.totalPosts} />} icon={FileText} change={overviewData.postChange} delay={2} />
            <MetricCard title="Average Reach" value={<AnimatedCounter to={overviewData.avgReach} />} icon={TrendingUp} change={overviewData.reachChange} delay={3} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center"><BarChartHorizontalBig className="mr-2 h-5 w-5 text-primary" />Platform Performance</CardTitle>
                  <CardDescription>Engagement by platform (Weekly)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={platformPerformanceData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                        cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.3 }}
                      />
                      <Legend wrapperStyle={{fontSize: "12px"}}/>
                      <Bar dataKey="value" name="Engagement Actions" radius={[4, 4, 0, 0]} barSize={30}>
                        {platformPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={platformColors[index % platformColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-green-500" />Follower Growth</CardTitle>
                  <CardDescription>New followers over time (Weekly)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={followerGrowthData} margin={{ top: 5, right: 0, left: -10, bottom: 5 }}>
                       <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                       <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        domain={['dataMin - 500', 'dataMax + 100']}
                        tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                        cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.3 }}
                        formatter={(value) => value.toLocaleString()}
                      />
                       <Legend wrapperStyle={{fontSize: "12px"}}/>
                       <Bar dataKey="value" name="Followers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30}>
                         {followerGrowthData.map((entry, index) => (
                          <Cell key={`cell-fg-${index}`} fill={platformColors[index % platformColors.length]} />
                        ))}
                       </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default OverviewTab;
  