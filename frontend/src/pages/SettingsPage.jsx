
     import React, { useState, useEffect } from 'react';
     import { motion } from 'framer-motion';
     import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
     import { Label } from '@/components/ui/label';
     import { Input } from '@/components/ui/input';
     import { Button } from '@/components/ui/button';
     import { Switch } from '@/components/ui/switch';
     import { Separator } from '@/components/ui/separator';
     import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
     import { Bell, Palette, Power, User, Edit2, Upload } from 'lucide-react';

    // Mock data - replace later
    const userSettings = {
        name: 'Alice Wonderland',
        email: 'alice@example.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        notifications: {
            postReminders: true,
            errorAlerts: true,
            weeklyReports: false,
        },
        theme: 'light', // 'light', 'dark', 'system'
        connectedApps: [
            { id: 1, name: 'Facebook OAuth', dateAdded: '2025-01-15' },
            { id: 2, name: 'Twitter OAuth', dateAdded: '2025-02-10' },
        ]
    };

    const containerVariants = {
       hidden: { opacity: 0 },
       visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
     };

     const itemVariants = {
       hidden: { opacity: 0, y: 20 },
       visible: { opacity: 1, y: 0 },
     };

    const SettingsPage = () => {
        const [name, setName] = useState(userSettings.name);
        const [email, setEmail] = useState(userSettings.email);
        const [notifications, setNotifications] = useState(userSettings.notifications);
        const [theme, setTheme] = useState(userSettings.theme);
        const [avatarPreview, setAvatarPreview] = useState(userSettings.avatar);

        const handleNotificationChange = (key) => {
            setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
        };

         const handleThemeChange = (newTheme) => {
             setTheme(newTheme);
             // Apply theme change logic (e.g., update class on body)
              document.documentElement.classList.remove('light', 'dark');
             if (newTheme === 'system') {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.classList.add(systemPrefersDark ? 'dark' : 'light');
             } else {
                document.documentElement.classList.add(newTheme);
             }
              localStorage.setItem('theme', newTheme); // Persist theme
         };

          useEffect(() => {
            // Apply saved theme on initial load
            const savedTheme = localStorage.getItem('theme') || 'light';
            handleThemeChange(savedTheme);
           }, []);


        const handleAvatarChange = (event) => {
             const file = event.target.files[0];
             if (file) {
                 const reader = new FileReader();
                 reader.onloadend = () => {
                     setAvatarPreview(reader.result);
                 };
                 reader.readAsDataURL(file);
                 // Add actual upload logic here
             }
         };

      return (
         <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           className="space-y-8 max-w-4xl mx-auto" // Center content
         >
           <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight">Settings</motion.h1>

          {/* User Info Section */}
           <motion.div variants={itemVariants}>
             <Card>
                <CardHeader>
                   <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5"/>User Information</CardTitle>
                   <CardDescription>Manage your profile details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="flex items-center space-x-6">
                         <div className="relative group">
                             <Avatar className="h-20 w-20">
                                <AvatarImage src={avatarPreview} alt="User Avatar" />
                                <AvatarFallback>{name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                             </Avatar>
                             <Label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                                <Upload className="h-6 w-6" />
                             </Label>
                             <Input id="avatar-upload" type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
                         </div>
                        <div className="flex-grow space-y-4">
                             <div className="grid gap-2">
                               <Label htmlFor="name">Name</Label>
                               <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                             </div>
                             <div className="grid gap-2">
                               <Label htmlFor="email">Email</Label>
                               <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                             </div>
                         </div>
                    </div>
                     <div className="flex justify-end">
                         <Button>Save Profile</Button>
                     </div>
                </CardContent>
             </Card>
           </motion.div>
           <Separator />

          {/* Notification Preferences */}
           <motion.div variants={itemVariants}>
             <Card>
                <CardHeader>
                   <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5"/>Notification Preferences</CardTitle>
                   <CardDescription>Choose how you receive alerts and updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
                     <Label htmlFor="notif-reminders" className="font-normal flex-grow cursor-pointer">Post Reminders</Label>
                     <Switch id="notif-reminders" checked={notifications.postReminders} onCheckedChange={() => handleNotificationChange('postReminders')} />
                   </div>
                    <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
                     <Label htmlFor="notif-alerts" className="font-normal flex-grow cursor-pointer">Error Alerts</Label>
                     <Switch id="notif-alerts" checked={notifications.errorAlerts} onCheckedChange={() => handleNotificationChange('errorAlerts')} />
                   </div>
                   <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
                     <Label htmlFor="notif-reports" className="font-normal flex-grow cursor-pointer">Weekly Reports</Label>
                     <Switch id="notif-reports" checked={notifications.weeklyReports} onCheckedChange={() => handleNotificationChange('weeklyReports')} />
                   </div>
                </CardContent>
             </Card>
            </motion.div>
            <Separator />


           {/* App Theme */}
           <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5"/>App Theme</CardTitle>
                        <CardDescription>Select your preferred interface theme.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex space-x-2">
                        <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => handleThemeChange('light')}>Light</Button>
                        <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => handleThemeChange('dark')}>Dark</Button>
                         {/* Optional: System Preference */}
                         {/* <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => handleThemeChange('system')}>System</Button> */}
                    </CardContent>
                </Card>
           </motion.div>
           <Separator />

           {/* Connected Apps (OAuth) */}
           <motion.div variants={itemVariants}>
             <Card>
                <CardHeader>
                   <CardTitle className="flex items-center"><Power className="mr-2 h-5 w-5"/>Connected Apps</CardTitle>
                   <CardDescription>Manage applications connected via OAuth.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {userSettings.connectedApps.length > 0 ? (
                        userSettings.connectedApps.map(app => (
                            <div key={app.id} className="flex items-center justify-between p-3 rounded-md border">
                                <div>
                                    <p className="font-medium">{app.name}</p>
                                    <p className="text-sm text-muted-foreground">Added on: {app.dateAdded}</p>
                                </div>
                                <Button variant="destructive" size="sm">Revoke Access</Button>
                            </div>
                        ))
                    ) : (
                         <p className="text-muted-foreground text-center py-4">No applications connected.</p>
                    )}
                </CardContent>
             </Card>
           </motion.div>
        </motion.div>
      );
    };

    export default SettingsPage;
  