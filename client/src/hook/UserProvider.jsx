import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  
  const setCurrentUser = newUser => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;