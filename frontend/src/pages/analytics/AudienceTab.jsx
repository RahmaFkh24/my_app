
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, MapPin, Cake, VenetianMask } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

const ageDistributionData = [
  { name: '18-24', value: 24, color: '#0088FE' }, { name: '25-34', value: 38, color: '#00C49F' },
  { name: '35-44', value: 22, color: '#FFBB28' }, { name: '45+', value: 16, color: '#FF8042' },
];

const genderDistributionData = [
  { name: 'Female', value: 52 }, { name: 'Male', value: 48 }
];

const geographicData = [
  { name: 'United States', value: 42, color: '#8884d8' },
  { name: 'United Kingdom', value: 18, color: '#82ca9d' },
  { name: 'Canada', value: 12, color: '#ffc658' },
  { name: 'Australia', value: 8, color: '#FF8042' },
  { name: 'Germany', value: 6, color: '#0088FE' },
  { name: 'Other', value: 14, color: '#00C49F' },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const AudienceTab = () => {
  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center"><Cake className="mr-2 h-5 w-5 text-pink-500" />Audience Demographics</CardTitle>
              <CardDescription>Age and gender distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Age Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ageDistributionData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={50} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value) => `${value}%`}
                    />
                    <Bar dataKey="value" name="Percentage" radius={[0, 4, 4, 0]} barSize={20}>
                      {ageDistributionData.map((entry, index) => (
                        <Cell key={`cell-age-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Gender Distribution</h3>
                {genderDistributionData.map((gender, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{gender.name}</span>
                      <span>{gender.value}%</span>
                    </div>
                    <Progress value={gender.value} indicatorClassName={gender.name === 'Female' ? 'bg-pink-400' : 'bg-blue-400'} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center"><MapPin className="mr-2 h-5 w-5 text-green-500" />Geographic Distribution</CardTitle>
              <CardDescription>Where your audience is located</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {geographicData.map((geo) => (
                  <div key={geo.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: geo.color }}></span>
                        {geo.name}
                      </span>
                      <span>{geo.value}%</span>
                    </div>
                    <Progress value={geo.value} style={{ '--progress-indicator-color': geo.color }} indicatorClassName="transition-all" />
                  </div>
                ))}
              </div>
              <div className="h-40 bg-muted rounded flex flex-col items-center justify-center text-muted-foreground italic border border-dashed">
                <MapPin className="h-8 w-8 mb-2" />
                <span>Detailed Map View Placeholder</span>
                <span className="font-semibold text-xs mt-1">Tunisia 🇹🇳 Highlighted</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AudienceTab;
