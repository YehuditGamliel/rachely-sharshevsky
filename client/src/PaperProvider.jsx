
// import React, { createContext, useState, useContext } from 'react';

// export const PaperContext = createContext();

// const PaperProvider = ({ children }) => {
//   const [paper, setPaper] = useState({});

//   const setCurrentPaper = (newPaper) => {
//     setPaper(newPaper);
//   };

//   return (
//     <PaperContext.Provider value={{ paper, setCurrentPaper }}>
//       {children}
//     </PaperContext.Provider>
//   );
// };

// export default PaperProvider;

import React, { createContext, useState } from 'react';

export const PaperContext = createContext();

const PaperProvider = ({ children }) => {
  const [paper, setPaper] = useState({});
  const [userData, setUserEyesdata] = useState({});

  const setCurrentPaper = (newPaper) => {
        setPaper(newPaper);
      };

  const setUpdateEyeData = (newData) => {
    setUserEyesdata(newData);
  };

  return (
    <PaperContext.Provider value={{ paper, setCurrentPaper, userData, setUpdateEyeData }}>
      {children}
    </PaperContext.Provider>
  );
};

export default PaperProvider;