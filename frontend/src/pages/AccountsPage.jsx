import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Facebook, Instagram, PlusCircle, RefreshCw, ExternalLink as LinkOff
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const availablePlatforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'instagram', name: 'Instagram', icon: Instagram },
];

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // 1. Handle token from callback and fetch pages
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      axios.get('http://localhost:5000/api/auth/pages/stats', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      })
        .then(res => {
          const pages = res.data.map((page, index) => ({
            id: index + 1,
            platform: 'Facebook',
            name: page.name,
            avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
            status: 'Active',
            icon: Facebook,
            color: 'text-blue-600',
          }));
          setAccounts(pages);
        })
        .catch(err => {
          console.error(err);
          toast({ title: "Failed to fetch Facebook pages", variant: "destructive" });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleReconnect = (id) => {
    toast({ title: "Simulating Reconnect...", description: `Reconnecting account ID: ${id}` });
    setTimeout(() => {
      setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, status: 'Active' } : acc));
      toast({ title: "Reconnected", description: "Account successfully re-authenticated." });
    }, 1500);
  };

  const handleDisconnect = (id) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
    toast({ title: "Disconnected", description: "The account has been removed.", variant: "destructive" });
  };

  const handleConnectNew = (platform) => {
    if (platform === 'Facebook') {
      window.location.href = 'http://localhost:5000/api/auth/login';
    } else {
      toast({ title: "Coming Soon", description: `${platform} connection not implemented yet.` });
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
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
                Choose a platform to connect and authorize.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
              {availablePlatforms.map(platform => (
                <AlertDialogAction key={platform.id} asChild className="w-full justify-start">
                  <Button
                    variant="outline"
                    onClick={() => handleConnectNew(platform.name)}
                  >
                    <platform.icon className="mr-2 h-5 w-5 text-blue-600" />
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

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {accounts.map((account) => (
              <motion.div key={account.id} variants={itemVariants} layout exit="exit">
                <Card className="overflow-hidden flex flex-col h-full">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={account.avatar} />
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
                  <CardContent className="flex-grow flex flex-col justify-center">
                    <div className="flex items-center justify-center mb-4">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        {account.status}
                      </Badge>
                    </div>
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
      )}
    </motion.div>
  );
};

export default AccountsPage;
