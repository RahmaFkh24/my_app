
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Users, MapPin, Globe } from 'lucide-react'; // Added Globe icon

// Placeholder for chart component
const ChartPlaceholder = ({ title, height = "h-48" }) => (
    <div className={`${height} bg-secondary rounded flex items-center justify-center text-muted-foreground italic border border-dashed`}>
        {title} Placeholder
    </div>
);

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// Simple visual bar chart simulation for age
const SimpleBarChart = ({ data, title }) => (
    <div className="h-32 flex items-end justify-around gap-1 p-2 border rounded bg-secondary/50 relative">
        <h4 className="absolute top-1 left-1 text-xs font-medium text-muted-foreground">{title}</h4>
        {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1" title={`${item.range}: ${item.percent}%`}>
                <div
                    className="w-3/4 bg-gradient-to-t from-secondary to-primary/80 rounded-t hover:opacity-80 transition-opacity"
                    style={{ height: `${item.percent}%` }}
                />
                <span className="text-[10px] mt-1 text-muted-foreground">{item.range}</span>
            </div>
        ))}
    </div>
);


const AudienceSection = ({ data }) => {
    const { age, gender } = data;

    return (
        <motion.section variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4 flex items-center"><Users className="mr-2 h-5 w-5" /> Audience Demographics</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Age Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Age Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SimpleBarChart data={age} title="Age Range Percentage" />
                        <div className="mt-2 text-xs text-muted-foreground">
                            Predominantly 25-34 years old ({age.find(a => a.range === '25-34')?.percent || 0}%).
                        </div>
                    </CardContent>
                </Card>

                {/* Gender Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Gender Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {gender.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>{item.type}</span>
                                    <span>{item.percent}%</span>
                                </div>
                                <Progress
                                    value={item.percent}
                                    className="h-2"
                                    indicatorClassName={item.type === 'Female' ? 'bg-pink-500' : 'bg-blue-500'}
                                />
                            </div>
                        ))}
                        <ChartPlaceholder title="Gender Pie Chart Placeholder" height="h-24" />
                    </CardContent>
                </Card>

                {/* Geographic Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Globe className="mr-2 h-5 w-5 text-green-600" /> Geographic Distribution</CardTitle>
                        <CardDescription>Audience location insights.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* World Map Placeholder Focused on Tunisia */}
                        <div className="h-48 bg-blue-100 rounded flex flex-col items-center justify-center text-blue-800 italic border border-dashed border-blue-300 relative">
                            <MapPin className="h-8 w-8 mb-2" />
                            <span>World Map Placeholder</span>
                            <span className="font-semibold text-sm mt-1">Focus: Tunisia 🇹🇳</span>
                            <p className="text-xs mt-2 text-center px-4">Audience spread across key global regions. Tunisia is highlighted.</p>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </motion.section>
    );
};

export default AudienceSection;
