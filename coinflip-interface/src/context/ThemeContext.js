import React, { createContext } from 'react';
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { oneOfType, array, object } from 'prop-types';

import { useLocalStorage } from '../hooks/useLocalStorage.js';

const propTypes = {
  children: oneOfType([array, object]),
};

const LightTheme = {
  color: '#000',
  background: '#fff',
};

const DarkTheme = {
  color: '#fff',
  background: '#222',
};

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
  }
`;

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const prefersOSDarkTheme =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  const [theme, setTheme] = useLocalStorage(
    'theme',
    prefersOSDarkTheme ? 'light' : 'dark',
  );

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledComponentsThemeProvider
        theme={theme === 'light' ? LightTheme : DarkTheme}
      >
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = propTypes;
export { ThemeProvider, ThemeContext, GlobalStyles, LightTheme, DarkTheme };
