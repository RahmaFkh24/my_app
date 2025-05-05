import { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Add Bearer prefix explicitly
        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`  // <-- Add this Bearer prefix
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setCurrentUser({
            email: userData.email,
            name: userData.name,
            token,
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('isNewUser', 'true');

      setCurrentUser({
        email: data.email,
        name: data.name,
        token: data.token,
      });
      setIsAuthenticated(true);

      toast({
        title: "Account Created",
        description: `Welcome, ${data.name}! Let's get you set up.`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // ADD HERE (SIGNUP SUCCESS)
      localStorage.setItem('authToken', data.token);
      console.log('Stored Token (Signup):', data.token);
      setCurrentUser({
        email: data.email,
        name: data.name,
        token: data.token,
      });
      setIsAuthenticated(true);

      const isNew = localStorage.getItem('isNewUser') === 'true';
      if (!isNew) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.name}!`,
        });
      }
      return true;
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isNewUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentUser,
      isLoading,
      login,
      logout,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);