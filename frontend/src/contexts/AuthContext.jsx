
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext(null);

const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : {};
};

const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Mock function to generate a simple JWT-like string
const generateMockToken = (email) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ email, iat: Date.now() }));
  const signature = btoa('mock-signature'); // In real app, this uses a secret key
  return `${header}.${payload}.${signature}`;
};


export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check for token presence instead of just boolean
    return !!localStorage.getItem('authToken');
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    // Store token and user info if authenticated
    if (isAuthenticated && currentUser && currentUser.token) {
      localStorage.setItem('authToken', currentUser.token);
      localStorage.setItem('currentUser', JSON.stringify({ email: currentUser.email, name: currentUser.name })); // Store only necessary info
    } else {
      // Clear auth data if not authenticated
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
  }, [isAuthenticated, currentUser]);

  const signup = (name, email, password) => {
    const users = getUsers();
    if (users[email]) {
      toast({
        title: "Signup Failed",
        description: "User already exists.",
        variant: "destructive",
      });
      return false;
    }
    // Store name along with password (still insecure for demo)
    users[email] = { password, name };
    saveUsers(users);

    const token = generateMockToken(email);
    const newUser = { email, name, token };

    localStorage.setItem('isNewUser', 'true'); // Mark as new user for onboarding
    setIsAuthenticated(true);
    setCurrentUser(newUser); // Set current user with token

    toast({
      title: "Account Created",
      description: `Welcome, ${name}! Let's get you set up.`,
    });
    return true;
  };


  const login = (email, password) => {
    const users = getUsers();
    if (users[email] && users[email].password === password) {
      const token = generateMockToken(email);
      const user = { email, name: users[email].name, token }; // Include name from stored data

      setIsAuthenticated(true);
      setCurrentUser(user);

      const isNew = localStorage.getItem('isNewUser') === 'true'; // Check if onboarding was pending
      if (!isNew) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
      }
      // If isNew is true, the redirect to onboarding will happen in LoginPage/App logic
      return true;
    }
    toast({
      title: "Login Failed",
      description: "Invalid email or password.",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isNewUser'); // Clear onboarding status on logout
    // Effect hook will handle clearing token and user data from localStorage
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
