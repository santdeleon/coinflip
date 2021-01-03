import React from 'react';
import { string, array, object, oneOfType } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils';
import { useTheme } from '../hooks';

const StyledTooltip = styled.span`
  z-index: 1;
  outline: 0;
  position: absolute;
  width: 13rem;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) =>
    theme === 'light' ? colors.$gray60 : colors.$gray10};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$white : colors.$gray60};
  border: 2px solid
    ${({ theme }) => (theme === 'light' ? colors.$gray20 : colors.$black)};
  border-radius: 10px;
`;

// TODO: Style the arrows for this tooltip
const StyledTooltipTop = styled(StyledTooltip)`
  bottom: 100%;
  left: 50%;
  margin-bottom: 30px;
  margin-left: -11rem;
`;

const StyledTooltipRight = styled(StyledTooltip)`
  top: -35px;
  left: 100%;
  margin-left: 1.4rem;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -13px;
    bottom: 100%;
    border: 13px solid transparent;
    border-right-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray20 : colors.$black};
  }
  &:after {
    content: ' ';
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: ${({ theme }) =>
      theme === 'light'
        ? `transparent ${colors.$white} transparent transparent`
        : `transparent ${colors.$gray60} transparent transparent`};
  }
`;

const StyledTooltipBottom = styled(StyledTooltip)`
  top: 100%;
  z-index: 2;
  margin-top: 2.3rem;
  margin-left: -180px;
  &:before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -13px;
    border: 13px solid transparent;
    border-bottom-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray20 : colors.$black};
  }
  &:after {
    content: ' ';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: ${({ theme }) =>
      theme === 'light'
        ? `transparent transparent ${colors.$white} transparent`
        : `transparent transparent ${colors.$gray60} transparent`};
  }
`;

const StyledTooltipLeft = styled(StyledTooltip)`
  top: -35px;
  right: 9rem;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -13px;
    bottom: 100%;
    border: 13px solid transparent;
    border-left-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray20 : colors.$black};
  }
  &:after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: ${({ theme }) =>
      theme === 'light'
        ? `transparent transparent transparent ${colors.$white}`
        : `transparent transparent transparent ${colors.$gray60}`};
  }
`;

export const StyledTooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  transition: display 0.3s cubic-bezier(0.4, 0.03, 0, 1);
`;

const tooltipPropTypes = {
  id: string,
  placement: string.isRequired,
  className: string,
  children: oneOfType([array, object, string]),
};

const Tooltip = ({ id, placement, className, children, ...props }) => {
  const { theme } = useTheme();

  switch (placement) {
    case 'top':
      return (
        <StyledTooltipTop
          theme={theme}
          tabindex="-1"
          aria-label="Tooltip Top"
          {...props}
        >
          {children}
        </StyledTooltipTop>
      );
    case 'right':
      return (
        <StyledTooltipRight
          theme={theme}
          tabindex="-1"
          aria-label="Tooltip Right"
          {...props}
        >
          {children}
        </StyledTooltipRight>
      );
    case 'bottom':
      return (
        <StyledTooltipBottom
          theme={theme}
          tabindex="-1"
          aria-label="Tooltip Bottom"
          {...props}
        >
          {children}
        </StyledTooltipBottom>
      );
    case 'left':
      return (
        <StyledTooltipLeft
          theme={theme}
          tabindex="-1"
          aria-label="Tooltip Left"
          {...props}
        >
          {children}
        </StyledTooltipLeft>
      );
    default:
      return (
        <StyledTooltipBottom
          theme={theme}
          tabindex="-1"
          aria-label="Tooltip Bottom"
          {...props}
        >
          {children}
        </StyledTooltipBottom>
      );
  }
};

Tooltip.propTypes = tooltipPropTypes;
export default Tooltip;
