import React from 'react';
import { string, func, array, bool, object, oneOfType } from 'prop-types';
import styled from 'styled-components';

import * as colors from '../utils/colors';

import { useTheme } from '../hooks';

const propTypes = {
  id: string.isRequired,
  type: string.isRequired,
  className: string,
  padding: string,
  margin: string,
  disabled: bool,
  onClick: func,
  children: oneOfType([array, object, string]),
};

const defaultProps = {
  type: 'button',
  padding: '4px 16px',
  margin: '0 10px 0 0',
  disabled: false,
};

const Button = ({
  id,
  type,
  className,
  padding,
  margin,
  disabled,
  onClick,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <button
      id={id}
      type={type}
      theme={theme}
      className={className}
      padding={padding}
      margin={margin}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => (padding ? padding : defaultProps.padding)};
  margin: ${({ margin }) => (margin ? margin : defaultProps.margin)};
  font-weight: 700;
  border-style: solid;
  border-radius: 10px;
  border-width: 2px 2px 4px;
  transform: perspective(200px) translateY(0);
  transition: all 0.25s;
  &:hover {
    outline: 0;
    transition: all 0.08s;
  }
  &:active {
    outline: 0;
    border-width: 2px 2px 2px;
    transform: perspective(200px) translateY(0.14rem);
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    opacity: 50%;
  }
`;

export const ButtonPrimary = styled(StyledButton)`
  color: ${({ theme }) =>
    theme === 'light' ? colors.$gray50 : colors.$gray20};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$white : colors.$gray50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$gray20 : colors.$black};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$gray20}`
      : `0px 2px 0px ${colors.$black}`};
  &:hover&:not(:disabled) {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$gray60 : colors.$white};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray10 : colors.$gray60};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray20 : colors.$black};
  }
  &:active {
    box-shadow: ${({ theme }) =>
      theme === 'light'
        ? `0px 0px 0px ${colors.$gray20}`
        : `0px 0px 0px ${colors.$black}`};
  }
`;

export const ButtonPink = styled(StyledButton)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$pink40 : colors.$pink40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$pink60 : colors.$pink70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$pink60}`
      : `0px 2px 0px ${colors.$pink70}`};
  &:hover&:not(:disabled) {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$pink50 : colors.$pink50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$pink60 : colors.$pink70};
  }
  &:active {
    box-shadow: 0px 0px 0px ${colors.$pink10};
  }
`;

export const ButtonOrange = styled(StyledButton)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$orange40 : colors.$orange40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$orange60 : colors.$orange70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$orange60}`
      : `0px 2px 0px ${colors.$orange70}`};
  &:hover&:not(:disabled) {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$orange50 : colors.$orange50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$orange60 : colors.$orange70};
  }
  &:active {
    box-shadow: 0px 0px 0px ${colors.$orange10};
  }
`;

export const ButtonYellow = styled(StyledButton)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$white)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$yellow40 : colors.$yellow40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$yellow60 : colors.$yellow70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$yellow60}`
      : `0px 2px 0px ${colors.$yellow70}`};
  &:hover&:not(:disabled) {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$white};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$yellow50 : colors.$yellow50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$yellow60 : colors.$yellow70};
  }
  &:active {
    box-shadow: 0px 0px 0px ${colors.$yellow10};
  }
`;

export const ButtonGreen = styled(StyledButton)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$green40 : colors.$green50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$green60 : colors.$green70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$green60}`
      : `0px 2px 0px ${colors.$green70}`};
  &:hover&:not(:disabled) {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$green50 : colors.$green60};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$green60 : colors.$green70};
  }
  &:active {
    box-shadow: 0px 0px 0px ${colors.$gray10};
  }
`;

export const ButtonBlue = styled(StyledButton)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$blue40 : colors.$blue40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$blue60 : colors.$blue70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$blue60}`
      : `0px 2px 0px ${colors.$blue70}`};
  &:hover&:not(:disabled) {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$blue50 : colors.$blue50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$blue60 : colors.$blue70};
  }
  &:active {
    box-shadow: 0px 0px 0px ${colors.$blue10};
  }
`;

export const ButtonPurple = styled(StyledButton)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$purple40 : colors.$purple40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$purple60 : colors.$purple70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$purple60}`
      : `0px 2px 0px ${colors.$purple70}`};
  &:hover&:not(:disabled) {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$purple50 : colors.$purple50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$purple60 : colors.$purple70};
  }
  &:active {
    box-shadow: 0px 0px 0px ${colors.$purple10};
  }
`;
