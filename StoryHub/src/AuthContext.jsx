import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on page load
    const checkLoggedIn = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://vishal-arya.rf.gd/check-auth.php', {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent
        });
        
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('https://vishal-arya.rf.gd/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Required to maintain sessions
      });
      
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login. Please try again later.' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch('https://vishal-arya.rf.gd/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include' // Ensures session cookies are set
      });
      
      const data = await response.json();
      if (data.success) {
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'An error occurred during signup. Please try again later.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('https://vishal-arya.rf.gd/logout.php', {
        method: 'POST', // Changed to POST as it's modifying state
        credentials: 'include' // Ensures session is properly destroyed
      });
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'An error occurred during logout' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);