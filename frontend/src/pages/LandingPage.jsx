
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import { Facebook, Instagram, Twitter, Linkedin, Zap } from 'lucide-react';

    const LandingPage = () => {
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
      };

      const iconVariants = {
        initial: { scale: 0, rotate: -180 },
        animate: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.5 } }
      };

      return (
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={iconVariants} initial="initial" animate="animate" className="absolute top-10 left-10 text-primary opacity-20">
             <Facebook size={60} />
          </motion.div>
           <motion.div variants={iconVariants} initial="initial" animate="animate" className="absolute bottom-10 right-10 text-blue-400 opacity-20">
             <Twitter size={60} />
          </motion.div>
          <motion.div variants={iconVariants} initial="initial" animate="animate" className="absolute top-1/3 right-20 text-pink-500 opacity-20">
             <Instagram size={50} />
          </motion.div>
           <motion.div variants={iconVariants} initial="initial" animate="animate" className="absolute bottom-1/4 left-20 text-blue-700 opacity-20">
             <Linkedin size={50} />
          </motion.div>

          <motion.div variants={itemVariants} className="relative z-10">
             <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                className="mb-6"
             >
                <Zap className="h-20 w-20 text-primary inline-block p-3 bg-primary/10 rounded-full shadow-lg" />
             </motion.div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Manage Social Media Effortlessly
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Schedule posts, track analytics, and engage your audience across all platforms from one simple dashboard. Focus on creating, we'll handle the rest.
            </p>
            <motion.div variants={itemVariants}>
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                  Get Started Now
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-8">
               <p className="text-sm text-muted-foreground">Connect with:</p>
               <div className="flex justify-center space-x-4 mt-2">
                  <Facebook className="h-6 w-6 text-gray-400 hover:text-primary transition-colors"/>
                  <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-500 transition-colors"/>
                  <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 transition-colors"/>
                  <Linkedin className="h-6 w-6 text-gray-400 hover:text-blue-700 transition-colors"/>
               </div>
            </motion.div>
          </motion.div>
        </motion.div>
      );
    };

    export default LandingPage;
  