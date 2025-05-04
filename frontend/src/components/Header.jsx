
    import React from 'react';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    import { Bell, Settings, User, LogOut, LayoutDashboard } from 'lucide-react';
    import { Button } from './ui/button';
    import { motion } from 'framer-motion';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuGroup,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    import { useAuth } from '@/contexts/AuthContext';
    import { useNavigate, Link } from 'react-router-dom';

    const Header = () => {
        const { currentUser, logout } = useAuth(); // Get currentUser from context
        const navigate = useNavigate();

        const handleLogout = () => {
          logout();
           localStorage.removeItem('isNewUser');
          navigate('/login');
        };

        // Use currentUser from context, provide fallback
        const userName = currentUser?.name || "User";
        const userEmail = currentUser?.email || "user@example.com";
        const userInitial = userName.charAt(0).toUpperCase();


      return (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 70, damping: 15 }}
          className="bg-card border-b p-4 flex justify-between items-center sticky top-0 z-40"
        >
           <motion.div
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
           >
              <h1 className="text-lg font-semibold text-foreground hidden sm:block">
                 Welcome back, <span className="text-primary">{userName}!</span> {/* Use userName */}
              </h1>
           </motion.div>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>
            </motion.div>

             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <motion.div
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       transition={{ delay: 0.3, type: 'spring' }}
                       className="cursor-pointer"
                     >
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${userEmail}`} alt={`${userName}'s Avatar`} /> {/* Use dynamic avatar based on email */}
                        <AvatarFallback>{userInitial}</AvatarFallback> {/* Use userInitial */}
                      </Avatar>
                    </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p> {/* Use userName */}
                        <p className="text-xs leading-none text-muted-foreground">
                        {userEmail} {/* Use userEmail */}
                        </p>
                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <Link to="/dashboard">
                        <DropdownMenuItem className="cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link to="/settings">
                         <DropdownMenuItem className="cursor-pointer">
                             <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                         </DropdownMenuItem>
                    </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.header>
      );
    };

    export default Header;
  