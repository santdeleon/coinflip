import React from 'react';
import styled from 'styled-components';
import { func, string, oneOfType, array, object } from 'prop-types';
import { useTheme } from '../hooks';

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

const propTypes = {
  id: string.isRequired,
  className: string,
  title: string.isRequired,
  ariaLabel: string.isRequired,
  onClick: func,
  children: oneOfType([array, object, string]),
};

const ToggleSwitch = ({
  id,
  className,
  title,
  ariaLabel,
  onClick,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <StyledToggleTrack
      id={id}
      role="checkbox"
      className={className}
      title={title}
      aria-label={ariaLabel}
      aria-checked="false"
      tabIndex="0"
      theme={theme}
    >
      <StyledToggleThumb theme={theme} onClick={onClick}>
        {children}
      </StyledToggleThumb>
    </StyledToggleTrack>
  );
};

ToggleSwitch.propTypes = propTypes;
export default ToggleSwitch;
