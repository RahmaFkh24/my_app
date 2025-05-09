import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp, Users, Eye, Heart, MessageSquare } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import useFacebookApi from '@/hooks/useFacebookApi';

const OverviewTab = () => {
  const { data: insights, loading, error } = useFacebookApi('insights');

  // Format data for the chart
  const formatChartData = (insights) => {
    if (!insights) return [];

    // This is a simplified example - you'd need to adapt based on actual API response
    return [
      { name: 'Mon', impressions: insights.page_impressions?.daily || 1200 },
      { name: 'Tue', impressions: insights.page_impressions?.daily || 1800 },
      { name: 'Wed', impressions: insights.page_impressions?.daily || 1500 },
      { name: 'Thu', impressions: insights.page_impressions?.daily || 2100 },
      { name: 'Fri', impressions: insights.page_impressions?.daily || 1900 },
      { name: 'Sat', impressions: insights.page_impressions?.daily || 1600 },
      { name: 'Sun', impressions: insights.page_impressions?.daily || 1400 },
    ];
  };

  const chartData = formatChartData(insights);

  const stats = [
    {
      title: 'Total Impressions',
      value: insights?.page_impressions?.total || 'N/A',
      icon: <Eye className="h-6 w-6 text-blue-500" />,
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Engaged Users',
      value: insights?.page_engaged_users?.total || 'N/A',
      icon: <Users className="h-6 w-6 text-green-500" />,
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Page Likes',
      value: insights?.page_fans?.total || 'N/A',
      icon: <Heart className="h-6 w-6 text-red-500" />,
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Post Reactions',
      value: insights?.page_actions_post_reactions_total?.total || 'N/A',
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      change: '+15%',
      trend: 'up'
    }
  ];

  if (loading) return <div className="flex justify-center p-8">Loading insights...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Impressions Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="impressions" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OverviewTab;