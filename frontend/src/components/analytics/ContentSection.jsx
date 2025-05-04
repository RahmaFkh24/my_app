
       import React from 'react';
        import { motion } from 'framer-motion';
        import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
        import { Progress } from "@/components/ui/progress";

       // Placeholder for chart component - Replace later
        const ChartPlaceholder = ({ title, height = "h-64" }) => (
            <div className={`${height} bg-secondary rounded flex items-center justify-center text-muted-foreground italic border border-dashed`}>
                {title} Placeholder
             </div>
        );

        // Simple visual line chart simulation
        const SimpleLineChart = ({ data, title }) => (
            <div className="h-48 p-4 border rounded bg-secondary/50 relative">
                 <h4 className="absolute top-2 left-2 text-xs font-medium text-muted-foreground">{title}</h4>
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                    <polyline points="5,40 25,30 45,35 65,20 85,25 95,15" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
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

        const ContentSection = ({ data }) => {
             const { types } = data;
             // Assign colors for progress bars
             const typeColors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];

            return (
                <motion.section variants={itemVariants}>
                    <h2 className="text-xl font-semibold mb-4">Content Performance</h2>
                    <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Posts Over Time</CardTitle>
                                <CardDescription>View trends weekly and monthly.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SimpleLineChart data={[]} title="Posts / Time"/>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Type Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {types.map((type, index) => (
                                    <div key={type.type} className="flex items-center">
                                        <type.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="text-sm flex-grow">{type.type}</span>
                                        <span className="text-sm font-medium mr-2">{type.percent}%</span>
                                        {/* Apply color directly to indicator style or use a custom prop if Progress supports it */}
                                         <Progress value={type.percent} className="h-2 w-1/2" aria-label={`${type.type}: ${type.percent}%`} style={{ '--progress-indicator-color': `var(--color-${index % typeColors.length})` }}/>
                                         {/* Example using inline style for indicator color - Adjust Progress component if needed */}
                                         {/* Or if Progress component is simple enough: */}
                                         {/* <div className="relative h-2 w-1/2 overflow-hidden rounded-full bg-secondary">
                                              <div
                                                 className={`h-full ${typeColors[index % typeColors.length]} transition-all`}
                                                 style={{ width: `${type.percent}%` }}
                                              />
                                         </div> */}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.section>
            );
        };

        export default ContentSection;
   