import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from './firebase/config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  );
};


