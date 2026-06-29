'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { verifyPassword, setAuthSession, checkAuthSession, clearAuthSession } from '@/lib/auth';
import type { AuthState } from '@/types';

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(checkAuthSession());
  }, []);

  const login = useCallback((password: string): boolean => {
    if (verifyPassword(password)) {
      setAuthSession();
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isSensei: isAuthenticated, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
