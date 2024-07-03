import React, { createContext, useState } from 'react';

export const PaperInvitationProvider = createContext();

const PaperrInvitationProvider = ({ children }) => {
  //const initialUser = JSON.parse(localStorage.getItem("currentUser"))||{userName:"",email:""}
  const [paper, setPaper] = useState({});
  const setCurrentPaper = (paper) => {
    setPaper(paper);
  };
  return (
    <PaperInvitationProvider.Provider value={{ paper: paper,  setCurrentPaper }}>
      {children}
    </PaperInvitationProvider.Provider>
  );
};

export default PaperInvitationProvider;
