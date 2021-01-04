import React from 'react';
import { string, array, object, oneOfType, func } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils';
import { useTheme } from '../hooks';

export const TooltipDivider = styled.div`
  border-width: 1px;
  border-style: solid;
`;

const StyledTooltip = styled.span`
  visibility: hidden;
  position: absolute;
  z-index: 1;
  outline: 0;
  width: 15rem;
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
  &:hover {
    visibility: visible;
  }
  ${TooltipDivider} {
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray10 : colors.$gray70};
  }
`;

const StyledTooltipTop = styled(StyledTooltip)`
  bottom: 145%;
  left: 50%;
  margin-left: -7.5rem;
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -13px;
    border: 13px solid transparent;
    border-top-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray20 : colors.$black};
  }
  &:after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: ${({ theme }) =>
      theme === 'light'
        ? `${colors.$white} transparent transparent transparent`
        : `${colors.$gray60} transparent transparent transparent`};
  }
`;

const StyledTooltipRight = styled(StyledTooltip)`
  top: -5px;
  left: 115%;
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
  top: 145%;
  left: 50%;
  margin-left: -7.5rem;
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
  top: -5px;
  right: 115%;
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

export const Tooltip = ({ id, placement, className, children, ...props }) => {
  const { theme } = useTheme();

  switch (placement) {
    case 'top':
      return (
        <StyledTooltipTop
          id={id}
          className={className}
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
          id={id}
          className={className}
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
          id={id}
          className={className}
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
          id={id}
          className={className}
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
          id={id}
          className={className}
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

Tooltip.propTypes = {
  id: string,
  placement: string.isRequired,
  className: string,
  children: oneOfType([array, object, string, func]),
};

const StyledOverlayTrigger = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    ${StyledTooltip} {
      visibility: visible;
    }
  }
`;

export const OverlayTrigger = ({ overlay, children, ...props }) => (
  <StyledOverlayTrigger {...props}>
    {overlay}
    {children}
  </StyledOverlayTrigger>
);

OverlayTrigger.propTypes = {
  overlay: oneOfType([array, object, string]).isRequired,
  children: oneOfType([array, object, string]),
};
