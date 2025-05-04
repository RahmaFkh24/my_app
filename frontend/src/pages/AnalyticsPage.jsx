
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import OverviewSection from '@/components/analytics/OverviewSection';
    import EngagementSection from '@/components/analytics/EngagementSection';
    import AudienceSection from '@/components/analytics/AudienceSection';
    import ContentSection from '@/components/analytics/ContentSection';
    import { Image, Video, Link as LinkIcon, Type } from 'lucide-react'; // Import icons directly

    // Data definitions
    const overviewData = {
        totalFollowers: 25645, followerChange: "+12%", engagementRate: 5.7, engagementChange: "+2.3%",
        totalPosts: 340, postChange: "+10%", avgReach: 12450, reachChange: "+5%"
    };
    const engagementData = {
        likes: 8450, likesChange: "+15%", comments: 2356, commentsChange: "+8%", shares: 945, sharesChange: "+10%",
        likesPercent: 65, commentsPercent: 25, sharesPercent: 10
    };
    const audienceData = {
        age: [{ range: "18-24", percent: 24 }, { range: "25-34", percent: 38 }, { range: "35-44", percent: 22 }, { range: "45+", percent: 16 }],
        gender: [{ type: "Female", percent: 52 }, { type: "Male", percent: 48 }]
    };
    // Use imported icons
    const contentData = {
        types: [
            { type: "Photos", percent: 52, icon: Image },
            { type: "Videos", percent: 28, icon: Video },
            { type: "Links", percent: 12, icon: LinkIcon },
            { type: "Text", percent: 8, icon: Type }
        ]
    };


    const containerVariants = {
       hidden: { opacity: 0 },
       visible: { opacity: 1, transition: { staggerChildren: 0.15 } }, // Adjusted stagger
    };

    const itemVariants = { // Keep this for top-level elements if needed
       hidden: { opacity: 0, y: 20 },
       visible: { opacity: 1, y: 0 },
    };

    const AnalyticsPage = () => {
        // const [selectedPlatform, setSelectedPlatform] = useState('all'); // Keep for potential future filtering
        const [timeFrame, setTimeFrame] = useState('trends'); // State for Engagement Tabs

      return (
         <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           className="space-y-8" // Increased spacing
         >
           <motion.div variants={itemVariants} className="flex flex-wrap justify-between items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
              {/* Platform selector removed based on refactoring scope */}
          </motion.div>

           {/* Render refactored sections */}
           <OverviewSection data={overviewData} />
           <EngagementSection data={engagementData} timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
           <AudienceSection data={audienceData} />
           <ContentSection data={contentData} />

        </motion.div>
      );
    };

    export default AnalyticsPage;
  