import { createContext, ReactNode, useContext, useState } from "react";

type ChangeModeData = {
  isDark: boolean;
  toggleDarkMode: () => void;
}

type ChangeModeProviderProps = {
  children: ReactNode;
}

export const ChangeMode = createContext({} as ChangeModeData);

export function ChangeModeProvider ({children} : ChangeModeProviderProps ){
  const [isDark, setIsDark] = useState (true);

  function toggleDarkMode () {
    setIsDark(!isDark);
  }

  return(
    <ChangeMode.Provider value={{
      isDark,
      toggleDarkMode,
    }}>
      {children}
    </ChangeMode.Provider>
  )
}


export const useMode = () => {
  return(
    useContext(ChangeMode)
  )
}