import React from 'react';
import { string, func, bool, object, oneOfType } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utils';
import { useTheme } from '../hooks';

const ButtonBase = styled.button`
  display: inline-block;
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: ${({ padding }) => (padding ? padding : '0.375rem 0.75rem')};
  letter-spacing: 0.8px;
  white-space: nowrap;
  font-size: 1rem;
  border-radius: 0.25rem;
  border-style: solid;
  border-radius: 5px;
  border-width: 2px 2px 4px;
  transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  transform: perspective(200px) translateY(0);
  &:hover {
    transition: all 0.04s ease-in;
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    opacity: 50%;
    pointer-events: none;
  }
  &:active {
    border-width: 2px 2px 2px;
    transform: perspective(200px) translateY(0.14rem);
  }
`;

export const ButtonLight = styled(ButtonBase)`
  color: ${colors.$gray70};
  background-color: ${colors.$white};
  border-color: ${colors.$gray20};
  box-shadow: 0px 2px 0px ${colors.$gray20};
  &:hover {
    color: ${colors.$gray60};
    background-color: ${colors.$gray10};
    border-color: ${colors.$gray20};
  }
  &:active {
    box-shadow: 0px 2px 0px ${colors.$gray20};
  }
`;

export const ButtonDark = styled(ButtonBase)`
  color: ${colors.$gray10};
  background-color: ${colors.$gray50};
  border-color: ${colors.$black};
  box-shadow: 0px 2px 0px ${colors.$black};
  &:hover {
    color: ${colors.$white};
    background-color: ${colors.$gray60};
    border-color: ${colors.$black};
  }
  &:active {
    box-shadow: 0px 2px 0px ${colors.$black};
  }
`;

export const ButtonPink = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$pink40 : colors.$pink40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$pink60 : colors.$pink70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$pink60}`
      : `0px 2px 0px ${colors.$pink70}`};
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$pink50 : colors.$pink50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$pink60 : colors.$pink70};
  }
  &:active {
    box-shadow: 0px 2px 0px ${colors.$pink60};
  }
`;

export const ButtonOrange = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$orange40 : colors.$orange40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$orange60 : colors.$orange70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$orange60}`
      : `0px 2px 0px ${colors.$orange70}`};
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$orange50 : colors.$orange50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$orange60 : colors.$orange70};
  }
  &:active {
    box-shadow: 0px 2px 0px ${colors.$orange60};
  }
`;

export const ButtonYellow = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$white)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$yellow40 : colors.$yellow40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$yellow60 : colors.$yellow70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$yellow60}`
      : `0px 2px 0px ${colors.$yellow70}`};
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$white};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$yellow50 : colors.$yellow50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$yellow60 : colors.$yellow70};
  }
  &:active {
    box-shadow: 0px 2px 0px ${colors.$yellow60};
  }
`;

export const ButtonGreen = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$green40 : colors.$green50};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$green60 : colors.$green70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$green60}`
      : `0px 2px 0px ${colors.$green70}`};
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$green50 : colors.$green60};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$green60 : colors.$green70};
  }
  &:active {
    box-shadow: 0px 2px 0px ${colors.$gray60};
  }
`;

export const ButtonBlue = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$blue40 : colors.$blue40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$blue60 : colors.$blue70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$blue60}`
      : `0px 2px 0px ${colors.$blue70}`};
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$blue50 : colors.$blue50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$blue60 : colors.$blue70};
  }
  &:active {
    box-shadow: 0px 2px 0px ${colors.$blue60};
  }
`;

export const ButtonPurple = styled(ButtonBase)`
  color: ${({ theme }) => (theme === 'light' ? colors.$white : colors.$gray10)};
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.$purple40 : colors.$purple40};
  border-color: ${({ theme }) =>
    theme === 'light' ? colors.$purple60 : colors.$purple70};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0px 2px 0px ${colors.$purple60}`
      : `0px 2px 0px ${colors.$purple70}`};
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$white : colors.$gray10};
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$purple50 : colors.$purple50};
    border-color: ${({ theme }) =>
      theme === 'light' ? colors.$purple60 : colors.$purple70};
  }
  &:active {
    box-shadow: 0px 2px 0px ${colors.$purple60};
  }
`;

const propTypes = {
  variant: oneOfType([string, object, bool]).isRequired,
  id: string.isRequired,
  type: string.isRequired,
  className: string,
  padding: string,
  margin: string,
  disabled: bool,
  onClick: func,
  children: oneOfType([object, string, func]),
};

const defaultProps = {
  variant: 'primary',
  type: 'button',
  disabled: false,
};

const Button = ({ ...props }) => {
  const { theme } = useTheme();

  switch (props.variant) {
    case 'light':
      return <ButtonLight theme={theme} {...props} />;
    case 'dark':
      return <ButtonDark theme={theme} {...props} />;
    case 'pink':
      return <ButtonPink theme={theme} {...props} />;
    case 'orange':
      return <ButtonOrange theme={theme} {...props} />;
    case 'yellow':
      return <ButtonYellow theme={theme} {...props} />;
    case 'green':
      return <ButtonGreen theme={theme} {...props} />;
    case 'blue':
      return <ButtonBlue theme={theme} {...props} />;
    case 'purple':
      return <ButtonPurple theme={theme} {...props} />;
    default:
      return <ButtonLight theme={theme} {...props} />;
  }
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
