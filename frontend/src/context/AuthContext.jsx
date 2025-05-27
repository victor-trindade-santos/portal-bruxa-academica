import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const updateUserDetails = (details) => {
    setUserDetails(details);
  };

  const logout = () => {
    setUser(null);
    setUserDetails(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{
      user,
      userDetails,
      login,
      logout,
      updateUserDetails
    }}>
      {children}
    </AuthContext.Provider>
  );
}