import React, { createContext, useState } from 'react';

export const EyeglassesContext = createContext();
const EyeglassesProvider = ({ children }) => {
  const [eyeglasses, setEyeglasses] = useState({});
  const setCurrentEyeglasses = (eyeglasses) => {
    setEyeglasses(eyeglasses);
  };
  return (
    <EyeglassesContext.Provider value={{ eyeglasses,  setCurrentEyeglasses }}>
      {children}
    </EyeglassesContext.Provider>
  );
};

export default EyeglassesProvider;
