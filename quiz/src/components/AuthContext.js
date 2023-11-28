// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({
    name: '',
    accessToken: '',
    categories: []
  });

  const updateAuthInfo = (newAuthInfo) => {
    setAuthInfo(newAuthInfo);
  }

  return (
    <AuthContext.Provider value={{ authInfo, updateAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
