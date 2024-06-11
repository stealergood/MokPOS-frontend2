import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserID = async () => {
      try {
        const savedUserID = await AsyncStorage.getItem('user_id');
        if (savedUserID) {
          setUserID(savedUserID);
        }
      } catch (error) {
        console.error('Failed to load user_id', error);
      }
    };

    const loadToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (error) {
        console.error('Failed to load token', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserID();
    loadToken();
  }, []);

  const signIn = async (newToken, userID) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user_id', userID);
      setToken(newToken);
      setUserID(userID);
    } catch (error) {
      console.error('Failed to save token', error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      console.error('Failed to remove token', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, isLoading, userID }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
