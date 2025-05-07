
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Progress } from '@/components/ui/progress';
    import { FileText, Image, Video, Link2, Type } from 'lucide-react';
    import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

    const postsOverTimeData = [
      { name: 'Mon', posts: 4 }, { name: 'Tue', posts: 3 }, { name: 'Wed', posts: 5 },
      { name: 'Thu', posts: 2 }, { name: 'Fri', posts: 6 }, { name: 'Sat', posts: 4 }, { name: 'Sun', posts: 1 }
    ];

    const contentTypesData = [
      { name: 'Photos', value: 52, icon: Image, color: '#0088FE' },
      { name: 'Videos', value: 28, icon: Video, color: '#00C49F' },
      { name: 'Links', value: 12, icon: Link2, color: '#FFBB28' },
      { name: 'Text', value: 8, icon: Type, color: '#FF8042' },
    ];
    
    const sectionVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    const ContentTab = () => {
      return (
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center"><FileText className="mr-2 h-5 w-5 text-indigo-500" />Content Performance</CardTitle>
                          <CardDescription>Posts over time</CardDescription>
                        </div>
                        <Tabs defaultValue="weekly" className="w-[180px]">
                            <TabsList className="grid w-full grid-cols-2 text-xs h-8">
                                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="weekly">
                        <TabsContent value="weekly">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={postsOverTimeData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.3 }}
                                />
                                <Bar dataKey="posts" name="Posts Published" radius={[4, 4, 0, 0]} barSize={30}>
                                    {postsOverTimeData.map((entry, index) => (
                                      <Cell key={`cell-pot-${index}`} fill={contentTypesData[index % contentTypesData.length].color} />
                                    ))}
                                </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </TabsContent>
                         <TabsContent value="monthly">
                             <div className="h-[300px] flex items-center justify-center text-muted-foreground italic">Monthly posts data coming soon.</div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center"><Type className="mr-2 h-5 w-5 text-orange-500" />Content Types</CardTitle>
                  <CardDescription>Performance by content format</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contentTypesData.map((type) => (
                    <div key={type.name}>
                      <div className="flex justify-between text-sm mb-1 items-center">
                        <span className="flex items-center">
                            <type.icon className="h-4 w-4 mr-2" style={{ color: type.color }} />
                            {type.name}
                        </span>
                        <span>{type.value}%</span>
                      </div>
                      <Progress value={type.value} style={{'--progress-indicator-color': type.color}} indicatorClassName="transition-all" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default ContentTab;
  