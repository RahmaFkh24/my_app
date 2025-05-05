// frontend/pages/AccountsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Facebook, PlusCircle, RefreshCw, ExternalLink as LinkOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import axios from 'axios';

const availablePlatforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let token = params.get('token');

    if (token) {
      localStorage.setItem('fb_token', token);
    } else {
      token = localStorage.getItem('fb_token');
    }

    if (token) {
      axios.get('http://localhost:4000/api/auth/pages/stats', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      })
        .then(res => {
          const fbAccounts = res.data.map((page) => ({
            id: page.id,
            platform: 'Facebook',
            name: page.name,
            avatar: page.picture,
            status: 'Active',
            icon: Facebook,
            color: 'text-blue-600',
            stats: {
              category: page.category,
              totalPosts: page.totalPosts,
              avgReachPerPost: page.avgReachPerPost,
              totalLikes: page.totalLikes,
              totalComments: page.totalComments,
              totalShares: page.totalShares
            }
          }));
          setAccounts(fbAccounts);
        })
        .catch(err => console.error('Error fetching FB pages:', err));
    }
  }, []);

  const handleReconnect = (id) => {
    toast({ title: "Simulating Reconnect...", description: `Attempting to reconnect account ID: ${id}` });
    setTimeout(() => {
      setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, status: 'Active' } : acc));
      toast({ title: "Account Reconnected", description: "The account has been successfully re-authenticated." });
    }, 1500);
  };

  const handleDisconnect = (id) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
    toast({
      title: "Account Disconnected",
      description: "The account has been removed.",
      variant: "destructive"
    });
  };

  const handleConnectNew = (platformName) => {
    if (platformName === 'Facebook') {
      window.location.href = 'http://localhost:4000/api/auth/login'; // ✅ FIXED ROUTE
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Connected Accounts</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Connect New Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Connect a New Account</AlertDialogTitle>
              <AlertDialogDescription>
                Select the platform you want to connect. You will be redirected to authorize the connection.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
              {availablePlatforms.map(platform => (
                <AlertDialogAction key={platform.id} asChild className="w-full justify-start">
                  <Button variant="outline" onClick={() => handleConnectNew(platform.name)}>
                    <platform.icon className={`mr-2 h-5 w-5 ${platform.name === 'Facebook' ? 'text-blue-600' : ''}`} />
                    Connect {platform.name}
                  </Button>
                </AlertDialogAction>
              ))}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <motion.div
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {accounts.map((account) => (
            <motion.div key={account.id} variants={itemVariants} layout exit="exit">
              <Card className="overflow-hidden flex flex-col h-full">
                <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={account.avatar} alt={account.name} />
                    <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <CardTitle className="text-lg flex items-center">
                      <account.icon className={`h-5 w-5 mr-2 ${account.color}`} />
                      {account.platform}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground truncate">{account.name}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center text-sm text-muted-foreground space-y-1">
                  <p>Category: {account.stats?.category}</p>
                  <p>Total Posts: {account.stats?.totalPosts}</p>
                  <p>Avg Reach/Post: {account.stats?.avgReachPerPost}</p>
                  <p>Likes: {account.stats?.totalLikes}</p>
                  <p>Comments: {account.stats?.totalComments}</p>
                  <p>Shares: {account.stats?.totalShares}</p>
                </CardContent>
                <CardFooter className="bg-muted/50 p-4 flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleReconnect(account.id)}>
                    <RefreshCw className="mr-1 h-4 w-4" /> Refresh
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <LinkOff className="mr-1 h-4 w-4" /> Disconnect
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Disconnecting this account will remove it from the app.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDisconnect(account.id)}>
                          Disconnect
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {accounts.length === 0 && (
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground py-10">
            No accounts connected yet. Click 'Connect New Account' to get started.
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AccountsPage;
