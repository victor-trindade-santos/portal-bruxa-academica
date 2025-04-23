import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role, token }

  // Verifica o localStorage e atualiza o estado de usuário ao iniciar
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // Atualiza o estado se existir no localStorage
    }
  }, []);

  // Função de login
  const login = (userData) => {
    setUser(userData);  // Atualiza o estado de usuário
    sessionStorage.setItem('user', JSON.stringify(userData));  // Armazena no localStorage
  };

  // Função de logout
  const logout = () => {
    setUser(null);  // Limpa o estado de usuário
    localStorage.removeItem('user');  // Remove do localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
