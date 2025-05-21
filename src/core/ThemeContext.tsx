// ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react'

const lightTheme = {
  dark: false,
  colors: {
    background: '#ffffff',
    primary: '#0b3d91',
    buttons: '#EC7FA9',
    text: '#000000',
    textAlt: '#ffffff',
    card: '#735557',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#1A1A1D',
    primary: '#90caf9',
    buttons: '#432E54',
    text: '#ffffff',
    textAlt: '#000000',
    card: '#F2E2B1',
  },
}

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(lightTheme)

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.dark ? lightTheme : darkTheme))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
