
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedCounter from '@/components/AnimatedCounter';
import { Users, TrendingUp, FileText, Target } from 'lucide-react';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const OverviewSection = ({ data }) => {
    if (!data) return null;
    const { totalFollowers, followerChange, engagementRate, engagementChange, totalPosts, postChange, avgReach, reachChange } = data;

    return (
        <motion.section variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4">Overview (Legacy)</h2>
            <p className="text-sm text-muted-foreground mb-4">This is a legacy component and will be removed. Please use OverviewTab.</p>
            <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold"><AnimatedCounter to={totalFollowers || 0} /></div>
                        {followerChange && <p className="text-xs text-green-500">{followerChange} overall</p>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold"><AnimatedCounter to={engagementRate || 0} />%</div>
                        {engagementChange && <p className="text-xs text-green-500">{engagementChange} last 7 days</p>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold"><AnimatedCounter to={totalPosts || 0} /></div>
                        {postChange && <p className="text-xs text-green-500">{postChange} growth</p>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Reach / Post</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold"><AnimatedCounter to={avgReach || 0} /></div>
                        {reachChange && <p className="text-xs text-green-500">{reachChange} per post</p>}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.section>
    );
};

export default OverviewSection;
