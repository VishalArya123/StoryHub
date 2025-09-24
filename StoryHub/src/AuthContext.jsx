// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in on page load
//     const checkLoggedIn = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost/StoryHub/StoryHub/Backend/check-auth.php', {
//           method: 'GET',
//           credentials: 'include', // Ensures cookies are sent
//         });
        
//         const data = await response.json();
//         if (data.success) {
//           setUser(data.user);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error('Error checking authentication:', error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkLoggedIn();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await fetch('http://localhost/StoryHub/StoryHub/Backend/login.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include' // Required to maintain sessions
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setUser(data.user);
//         return { success: true };
//       } else {
//         return { success: false, error: data.error };
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, error: 'An error occurred during login. Please try again later.' };
//     }
//   };

//   const signup = async (name, email, password) => {
//     try {
//       const response = await fetch('http://localhost/StoryHub/StoryHub/Backend/signup.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password }),
//         credentials: 'include' // Ensures session cookies are set
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         return { success: true };
//       } else {
//         return { success: false, error: data.error };
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       return { success: false, error: 'An error occurred during signup. Please try again later.' };
//     }
//   };

//   const logout = async () => {
//     try {
//       await fetch('http://localhost/StoryHub/StoryHub/Backend/logout.php', {
//         method: 'POST', // Changed to POST as it's modifying state
//         credentials: 'include' // Ensures session is properly destroyed
//       });
//       setUser(null);
//       return { success: true };
//     } catch (error) {
//       console.error('Logout error:', error);
//       return { success: false, error: 'An error occurred during logout' };
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

const API_BASE_URL = 'http://localhost/StoryHub/StoryHub/Backend';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function for making authenticated requests
  const makeRequest = async (endpoint, method = 'GET', body = null) => {
    const options = {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
      
      // Check if the response is valid JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        console.error('Non-JSON response received:', await response.text());
        throw new Error('Server returned non-JSON response');
      }
    } catch (error) {
      console.error(`Error in ${endpoint}:`, error);
      throw error;
    }
  };

  useEffect(() => {
    // Check if user is logged in on page load
    const checkLoggedIn = async () => {
      try {
        setLoading(true);
        const data = await makeRequest('check-auth.php');
        
        if (data && data.success) {
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
      const data = await makeRequest('login.php', 'POST', { email, password });
      
      if (data && data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'An error occurred connecting to the server. Please try again later.' 
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const data = await makeRequest('signup.php', 'POST', { name, email, password });
      
      if (data && data.success) {
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: 'An error occurred connecting to the server. Please try again later.' 
      };
    }
  };

  const logout = async () => {
    try {
      const data = await makeRequest('logout.php', 'POST');
      
      if (data && data.success) {
        setUser(null);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Logout failed' };
      }
    } catch (error) {
      console.error('Logout error:', error);
      return { 
        success: false, 
        error: 'An error occurred during logout. Please try again later.' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);