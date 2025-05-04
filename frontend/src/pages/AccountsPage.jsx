
    import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
    import { Badge } from '@/components/ui/badge';
    import { Facebook, Instagram, Twitter, Linkedin, PlusCircle, RefreshCw, ExternalLink as LinkOff } from 'lucide-react';
    import { useToast } from "@/components/ui/use-toast";
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

    // Updated Mock Data - Only FB and IG
    const initialAccounts = [
      { id: 1, platform: 'Facebook', name: 'My Business Page', avatar: 'https://i.pravatar.cc/150?img=1', status: 'Active', icon: Facebook, color: 'text-blue-600' },
      { id: 2, platform: 'Instagram', name: '@mybrandhandle', avatar: 'https://i.pravatar.cc/150?img=2', status: 'Active', icon: Instagram, color: 'text-pink-500' },
    ];

    const availablePlatforms = [ // Platforms available to connect
        { id: 'facebook', name: 'Facebook', icon: Facebook },
        { id: 'instagram', name: 'Instagram', icon: Instagram },
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
      const [accounts, setAccounts] = useState(initialAccounts);
      const { toast } = useToast();

      const handleReconnect = (id) => {
          // Simulate reconnect process
          toast({ title: "Simulating Reconnect...", description: `Attempting to reconnect account ID: ${id}` });
          // In a real app, this would trigger OAuth flow
           setTimeout(() => {
              setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, status: 'Active' } : acc));
              toast({ title: "Account Reconnected", description: "The account has been successfully re-authenticated." });
           }, 1500);
      };

      const handleDisconnect = (id) => {
          // Simulate disconnect with animation
          setAccounts(prev => prev.filter(acc => acc.id !== id));
          toast({
              title: "Account Disconnected",
              description: "The account has been removed.",
              variant: "destructive"
          });
      };

      const handleConnectNew = (platformName) => {
           // Simulate connecting a new account
            toast({ title: "Simulating Connection...", description: `Connecting new ${platformName} account...` });
           // In a real app, trigger OAuth flow
            setTimeout(() => {
               const newId = Math.max(...accounts.map(a => a.id), 0) + 1;
               const platformInfo = availablePlatforms.find(p => p.name === platformName);
               if (platformInfo) {
                   const newAccount = {
                      id: newId,
                      platform: platformName,
                      name: `${platformName} Profile ${newId}`,
                      avatar: `https://i.pravatar.cc/150?img=${newId + 5}`, // Just for variety
                      status: 'Active',
                      icon: platformInfo.icon,
                      color: platformName === 'Facebook' ? 'text-blue-600' : 'text-pink-500',
                   };
                   setAccounts(prev => [...prev, newAccount]);
                    toast({ title: "Account Connected", description: `New ${platformName} account added.` });
               }
            }, 2000);
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
             {/* Dropdown or Modal to select which platform to add */}
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
                                       <platform.icon className={`mr-2 h-5 w-5 ${platform.name === 'Facebook' ? 'text-blue-600' : 'text-pink-500'}`} />
                                       Connect {platform.name}
                                   </Button>
                               </AlertDialogAction>
                          ))}
                      </div>
                      <AlertDialogFooter>
                           <AlertDialogCancel>Cancel</AlertDialogCancel>
                           {/* Action is handled by button clicks */}
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
                  <motion.div
                    key={account.id}
                    variants={itemVariants}
                    layout // Animate layout changes
                    exit="exit" // Use exit variant for removal
                  >
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
                      <CardContent className="flex-grow flex flex-col justify-center">
                         <div className="flex items-center justify-center mb-4">
                             <Badge variant={account.status === 'Active' ? 'secondary' : 'destructive'} className={` ${account.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                               {account.status}
                             </Badge>
                         </div>
                      </CardContent>
                      <CardFooter className="bg-muted/50 p-4 flex justify-end space-x-2">
                        {account.status === 'Needs Reauth' ? (
                          <Button variant="outline" size="sm" onClick={() => handleReconnect(account.id)}>
                            <RefreshCw className="mr-1 h-4 w-4" /> Reconnect
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" onClick={() => handleReconnect(account.id)}>
                             <RefreshCw className="mr-1 h-4 w-4" /> Refresh
                          </Button>
                        )}

                         <AlertDialog>
                           <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" >
                                <LinkOff className="mr-1 h-4 w-4" /> Disconnect
                              </Button>
                           </AlertDialogTrigger>
                           <AlertDialogContent>
                             <AlertDialogHeader>
                               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                               <AlertDialogDescription>
                                 Disconnecting this account will remove it from the app. You may need to re-authorize it later.
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
  