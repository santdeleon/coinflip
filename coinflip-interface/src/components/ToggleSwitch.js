import React from 'react';
import styled from 'styled-components';

import Moon from '../assets/img/moon.svg';

import { useTheme } from '../hooks';

const ToggleSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledToggleTrack
      role="checkbox"
      title={`Activate ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      aria-label={`Activate ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      aria-checked="false"
      tabIndex="0"
      theme={theme}
    >
      <StyledToggleThumb theme={theme} onClick={toggleTheme}>
        <img src={Moon} alt="Moon" aria-label="Moon" className="w-100" />
      </StyledToggleThumb>
    </StyledToggleTrack>
  );
};
export default ToggleSwitch;

const StyledToggleThumb = styled.div`
  position: absolute;
  top: -4px;
  left: -3px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme === 'light' ? '#343A40' : '#6e40c9'};
  transform: ${({ theme }) =>
    theme === 'light' ? 'translateX(-2px)' : 'translateX(18px)'};
  transition: transform 0.3s cubic-bezier(0.4, 0.03, 0, 1);
`;

const StyledToggleTrack = styled.span`
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
  border-radius: 34px;
  outline: 0;
  border: 3px solid
    ${({ theme }) => (theme === 'light' ? '#d1d5da' : '#3c1e70')};
  background-color: ${({ theme }) =>
    theme === 'light' ? 'transparent' : '#271052'};
`;
