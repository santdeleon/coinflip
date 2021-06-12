import React, { createContext, useContext } from 'react';
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { oneOfType, arrayOf, node } from 'prop-types';

import { useLocalStorage } from '../hooks';

import { colors } from '../utils';

const LightTheme = {
  color: colors.$dark,
  background: '#F7F8FA',
};

const DarkTheme = {
  color: colors.$white,
  background: colors.$dark,
};

export const GlobalStyles = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .App--rainbow-border {
    background: linear-gradient(
      to right,
      #f76f6f,
      #fcfc83,
      #fcca67,
      #84ffaf,
      #83e0f7,
      #ca67e5,
      #ff87e1
    );
    padding: 1px;
  }
`;

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const prefersOSDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)');

  const [theme, setTheme] = useLocalStorage(
    'theme',
    prefersOSDarkTheme ? 'dark' : 'light',
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

ThemeProvider.propTypes = { children: oneOfType([arrayOf(node), node]) };
export default ThemeProvider;
