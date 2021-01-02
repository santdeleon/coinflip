import React from 'react';
import styled from 'styled-components';
import { func, string, oneOfType, array, object } from 'prop-types';
import { useTheme } from '../hooks';

const StyledToggleThumb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -4px;
  left: -3px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0.03, 0, 1);
`;

const StyledToggleTrack = styled.span`
  position: relative;
  display: inline-block;
  width: 38px;
  height: 20px;
  border-radius: 34px;
  outline: 0;
`;

const StyledToggleSwitch = styled.div`
  ${StyledToggleThumb} {
    background-color: ${({ theme }) =>
      theme === 'light' ? '#343A40' : '#6e40c9'};
    transform: ${({ theme }) =>
      theme === 'light' ? 'translateX(-2px)' : 'translateX(18px)'};
  }
  ${StyledToggleTrack} {
    border: 3px solid
      ${({ theme }) => (theme === 'light' ? '#d1d5da' : '#3c1e70')};
    background-color: ${({ theme }) =>
      theme === 'light' ? 'transparent' : '#271052'};
  }
`;

const propTypes = {
  id: string.isRequired,
  className: string,
  title: string.isRequired,
  onClick: func,
  children: oneOfType([array, object, string]),
};

const ToggleSwitch = ({
  id,
  title,
  className,
  onClick,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <StyledToggleSwitch id={id} theme={theme} {...props}>
      <StyledToggleTrack>
        <StyledToggleThumb
          role="checkbox"
          title={title}
          aria-label={title}
          aria-checked={theme === 'light' ? 'false' : 'true'}
          className={className}
          onClick={onClick}
        >
          {children}
        </StyledToggleThumb>
      </StyledToggleTrack>
    </StyledToggleSwitch>
  );
};

ToggleSwitch.propTypes = propTypes;
export default ToggleSwitch;
