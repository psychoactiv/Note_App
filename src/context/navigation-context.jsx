import React, { useContext, createContext, useState } from "react";

const navContext = createContext(null);

const NavigationContextProvider = ({ children }) => {
  const [initialDisplay, changeSideDisplay] = useState({
    displayByHover: false,
    displayByHamburger: false,
  });
  const [optColor, setOptColor] = useState();
  const [listStyle, updatedListStyle] = useState(false);

  return (
    <navContext.Provider
      value={{
        initialDisplay,
        changeSideDisplay,
        optColor,
        setOptColor,
        listStyle,
        updatedListStyle,
      }}
    >
      {children}
    </navContext.Provider>
  );
};

const useNavigation = () => useContext(navContext);

export { NavigationContextProvider, useNavigation };
