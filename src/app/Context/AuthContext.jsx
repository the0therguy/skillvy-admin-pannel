"use client"
import {createContext, useContext, useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import baseURL from "@/app/Components/BaseURL";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true)
  const [authTokens, setAuthTokens] = useState(null);


  // Check for access token on app load and decode it to get user details
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setAuthTokens(accessToken);
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
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await fetch(`${baseURL}logout/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`,},
      body: JSON.stringify({refresh_token: refreshToken}),
    })
    const data = await response.json()
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/login";
  };

  const refreshAccessToken = async () => {
    debugger
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (!accessToken || !refreshToken) return
    let response = await fetch(`${baseURL}token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({'refresh': refreshToken})
    })

    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(decodeToken(data.access))
      // localStorage.setItem('authTokens', JSON.stringify(data))
      localStorage.setItem('access_token', data.access);
    } else {
      await logout()
    }

    if (loading) {
      setLoading(false)
    }
  };

  useEffect(() => {

    if (loading) {
      refreshAccessToken()
    }

    let fourMinutes = 1000 * 60 * 4

    let interval = setInterval(() => {
      if (authTokens) {
        refreshAccessToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)

  }, [authTokens, loading])


  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
