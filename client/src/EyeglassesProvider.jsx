import React, { createContext, useState } from 'react';

export const EyeglassesContext = createContext();

const EyeglassesProvider = ({ children }) => {
  //const initialUser = JSON.parse(localStorage.getItem("currentUser"))||{userName:"",email:""}
  const [eyeglasses, setEyeglasses] = useState({"numOfGlasses":0});
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
