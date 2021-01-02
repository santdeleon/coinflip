import React, { useState } from 'react';
import { string, array, object, oneOfType } from 'prop-types';
import styled from 'styled-components';

import { colors } from '../utils';
import { useTheme } from '../hooks';

// OverlayTrigger
const StyledOverlayTrigger = styled.div`
  position: relative;
  display: flex;
`;

const overlayTriggerPropTypes = {
  overlay: oneOfType([array, object, string]).isRequired,
  delay: object,
  children: oneOfType([array, object, string]),
};

const defaultOverlayTriggerProps = {
  delay: { show: 250, hide: 400 },
};

export const OverlayTrigger = ({ overlay, delay, children }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <StyledOverlayTrigger
        delay={delay}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        {children}
      </StyledOverlayTrigger>
      {/* {showOverlay && overlay} */}
      <StyledTooltipContainer>{overlay}</StyledTooltipContainer>
    </>
  );
};

OverlayTrigger.propTypes = overlayTriggerPropTypes;
OverlayTrigger.defaultProps = defaultOverlayTriggerProps;
// End OverlayTrigger

// Tooltip
const StyledTooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledTooltip = styled.span`
  z-index: 1;
  position: absolute;
  width: 13rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) =>
    theme === 'light' ? colors.$gray60 : colors.$gray10};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$white : colors.$gray60};
  border-style: solid;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$gray20 : colors.$black};
  padding: 0.9rem 1rem;
`;

const StyledTooltipTop = styled(StyledTooltip)`
  bottom: 100%;
  left: 50%;
  margin-bottom: 30px;
  margin-left: -11rem;
`;

const StyledTooltipRight = styled(StyledTooltip)`
  top: -35px;
  left: 105%;
  margin-left: 10px;
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
`;

const StyledTooltipBottom = styled(StyledTooltip)`
  top: 100%;
  z-index: 2;
  margin-top: 2.2rem;
  margin-left: -11rem;
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    margin-left: -13px;
    bottom: 100%;
    border: 13px solid transparent;
    border-bottom-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray20 : colors.$black};
  }
  &:after {
    content: ' ';
    position: absolute;
    top: -20px;
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
  right: 9.5rem;
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

const tooltipPropTypes = {
  id: string,
  placement: string,
  className: string,
  children: oneOfType([array, object, string]),
};

export const Tooltip = ({ id, placement, className, children, ...props }) => {
  const { theme } = useTheme();

  switch (placement) {
    case 'top':
      return (
        <StyledTooltipTop
          {...props}
          theme={theme}
          tabIndex="-1"
          aria-label="Tooltip Top"
        >
          {children}
        </StyledTooltipTop>
      );
    case 'right':
      return (
        <StyledTooltipRight
          {...props}
          theme={theme}
          tabIndex="-1"
          aria-label="Tooltip Right"
        >
          {children}
        </StyledTooltipRight>
      );
    case 'bottom':
      return (
        <StyledTooltipBottom
          {...props}
          theme={theme}
          tabIndex="-1"
          aria-label="Tooltip Bottom"
        >
          {children}
        </StyledTooltipBottom>
      );
    case 'left':
      return (
        <StyledTooltipLeft
          {...props}
          theme={theme}
          tabIndex="-1"
          aria-label="Tooltip Left"
        >
          {children}
        </StyledTooltipLeft>
      );
    default:
      return (
        <StyledTooltipBottom
          {...props}
          theme={theme}
          tabIndex="-1"
          aria-label="Tooltip Bottom"
        >
          {children}
        </StyledTooltipBottom>
      );
  }
};

Tooltip.propTypes = tooltipPropTypes;
// End Tooltip
