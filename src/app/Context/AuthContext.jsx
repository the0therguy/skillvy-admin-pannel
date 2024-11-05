"use client"
import {createContext, useContext, useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import BaseURL from "@/app/Components/BaseURL";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for access token on app load and decode it to get user details
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsAuthenticated(true);
      setUser(decodeToken(accessToken)); // Decode token to get user data
    }
  }, []);

  const decodeToken = (token) => {
    try {
      return jwtDecode(token); // Get user info from token payload
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    setIsAuthenticated(true);
    const data = decodeToken(accessToken)
    if (data) {
      setUser(data);
      return true
    }
    return false
  };

  const logout = async () => {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch(`${BaseURL}logout/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({access_token: accessToken}),
    })
    const data = await response.json()
    console.log(data)
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
